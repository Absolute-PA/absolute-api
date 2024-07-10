#!/bin/bash

# Checkout to the main branch and reset to the latest from origin
git checkout main
git fetch origin
git reset --hard origin/main

# Install dependencies
yarn

# Start the database
./startDB.sh

# Check if .env file exists
if test -f .env; then 
    # Extract npm_package_version line from .env.prod
    npm_package_version=$(grep 'npm_package_version' .env.prod)
    
    # Replace the npm_package_version line in .env
    if grep -q 'npm_package_version' .env; then
        sed -i "s/npm_package_version=.*/$npm_package_version/" .env
    else
        echo "$npm_package_version" >> .env
    fi
else
    # If .env does not exist, copy .env.prod to .env
    cp .env.prod .env
fi

# Start the server with HTTPS enabled
HTTPS=true node -r newrelic ./build/index.js
