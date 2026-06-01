#!/bin/bash

# Checkout to the UAT branch and reset to the latest from origin
git checkout uat
git fetch origin
git reset --hard origin/uat

# Install dependencies
yarn

# Start the database
./startDB.sh

# Always start from build defaults so npm_package_version and new fields are always current.
if [ ! -f ".env.prod" ]; then
    echo "Error: .env.prod does not exist."
    exit 1
fi

cp .env.prod .env
echo "Copied .env.prod to .env."

# Apply device-specific overrides from .env.device (if present).
# .env.device is created manually once per device for values that differ from
# build defaults (e.g. JWT_SECRET, PI_NAME, PORT, NODEWEB_DB_URL, passwords).
# It is never committed to git and never modified by this script.
DEVICE_ENV=".env.device"
if [ -f "$DEVICE_ENV" ]; then
    echo "Applying device overrides from $DEVICE_ENV..."
    while IFS= read -r line || [ -n "$line" ]; do
        # Skip blank lines and comments
        [[ -z "$line" || "$line" == \#* ]] && continue
        var_name=$(echo "$line" | cut -d '=' -f 1)
        var_value=$(echo "$line" | cut -d '=' -f 2-)
        if grep -q "^$var_name=" .env; then
            sed -i "s|^$var_name=.*|$var_name=$var_value|" .env
            echo "  Overrode $var_name"
        else
            echo "$var_name=$var_value" >> .env
            echo "  Added $var_name"
        fi
    done < "$DEVICE_ENV"
    echo "Device overrides applied."
else
    echo "No $DEVICE_ENV found — using build defaults only."
fi

# Start the server with HTTPS enabled
HTTPS=true node ./dist/main.js
