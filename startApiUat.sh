#!/bin/bash

# Checkout to the main branch and reset to the latest from origin
git checkout uat
git fetch origin
git reset --hard origin/uat

# Install dependencies
yarn

# Start the database
./startDB.sh

# Check if .env file exists
if test -f .env; then 
    # Extract npm_package_version line from .env.prod
    npm_package_version=$(grep 'npm_package_version' .env.prod)
    
    # Create a temporary file with updated content
    awk -v new_line="$npm_package_version" '
    BEGIN { found = 0 }
    {
        if ($0 ~ /^npm_package_version=/) {
            print new_line
            found = 1
        } else {
            print
        }
    }
    END {
        if (!found) {
            print new_line
        }
    }' .env > .env.tmp
    
    # Move the temporary file to .env
    mv .env.tmp .env
else
    # If .env does not exist, copy .env.prod to .env
    cp .env.prod .env
fi

# Start the server with HTTPS enabled
HTTPS=true node -r newrelic ./dist/main.js
