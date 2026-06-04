#!/bin/bash

# Checkout to the main branch and reset to the latest from origin
git checkout main
git fetch origin
git reset --hard origin/main

# Install dependencies
yarn

# Start the database
pm2 start ./startDB.sh

pm2 start ecosystem.config.js

# Start the UI if not already registered with PM2
UI_SCRIPT="/home/absolute/Documents/absolute-ui/startUI.sh"
if [ -f "$UI_SCRIPT" ]; then
    if ! pm2 list | grep -q "startUI"; then
        pm2 start "$UI_SCRIPT" --name startUI --interpreter bash
        echo "Started startUI process."
    else
        echo "startUI already registered in PM2, skipping."
    fi
else
    echo "Warning: UI script not found at $UI_SCRIPT — skipping UI startup."
fi

pm2 save

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

# Read device identity and channel from .env.device for hub reporting.
CHANNEL="stable"
PI_NAME=""
if [ -f "$DEVICE_ENV" ]; then
    _channel=$(grep "^CHANNEL=" "$DEVICE_ENV" | head -1 | cut -d'=' -f2-)
    _pi_name=$(grep "^PI_NAME=" "$DEVICE_ENV" | head -1 | cut -d'=' -f2-)
    [ -n "$_channel" ] && CHANNEL="$_channel"
    [ -n "$_pi_name" ] && PI_NAME="$_pi_name"
fi

# Resolve target version: hub manifest → local fallback file → "main".
HUB_URL="https://absolutepa-hub.vercel.app"
TARGET_VERSION=""

manifest_response=$(curl -sf --max-time 5 "$HUB_URL/api/manifest?channel=$CHANNEL" 2>/dev/null)
if [ -n "$manifest_response" ]; then
    TARGET_VERSION=$(echo "$manifest_response" | grep -o '"api":"[^"]*"' | cut -d'"' -f4)
    [ -n "$TARGET_VERSION" ] && echo "Resolved api version from hub: $TARGET_VERSION"
fi

if [ -z "$TARGET_VERSION" ]; then
    TARGET_VERSION_FILE=".target-version-api"
    if [ -f "$TARGET_VERSION_FILE" ]; then
        TARGET_VERSION=$(tr -d '[:space:]' < "$TARGET_VERSION_FILE")
        echo "Resolved api version from local file: $TARGET_VERSION"
    fi
fi

[ -z "$TARGET_VERSION" ] && TARGET_VERSION="main"

# Report startup to hub (non-fatal — hub may be unreachable on initial deploy).
if [ -n "$PI_NAME" ]; then
    curl -sf --max-time 5 -X POST \
        -H "Content-Type: application/json" \
        -d "{\"device_id\":\"$PI_NAME\",\"channel\":\"$CHANNEL\",\"component\":\"api\",\"version\":\"$TARGET_VERSION\"}" \
        "$HUB_URL/api/checkin" \
    && echo "Hub checkin OK: $PI_NAME api@$TARGET_VERSION ($CHANNEL)" \
    || echo "Hub checkin failed (hub unreachable — startup continues)"
else
    echo "Hub checkin skipped — PI_NAME not set in $DEVICE_ENV"
fi

# Start the server with HTTPS enabled
HTTPS=true node ./dist/main.js
