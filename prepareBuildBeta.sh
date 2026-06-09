#!/usr/bin/env bash
set -Eeuo pipefail

BUILD_FOLDER_PATH=../absolute-api
SOURCE_FOLDER_PATH=../nodeweb-master-api

cd $BUILD_FOLDER_PATH
git reset --hard
git checkout main
git pull origin main

cd $SOURCE_FOLDER_PATH
git checkout main
git pull origin main

APP_VERSION=$(node -p -e "require('./package.json').version")
echo "Building beta for version $APP_VERSION"

yarn build

CURRENT_COMMIT_HASH=$(git rev-parse HEAD)
echo "$CURRENT_COMMIT_HASH" > dist/BUILD_ID
echo "Build complete."

# Determine next beta number by inspecting existing tags on the build repo.
cd $BUILD_FOLDER_PATH
git fetch --tags
LAST_BETA_TAG=$(git tag | grep "^v${APP_VERSION}-beta\." | sort -V | tail -1)
if [ -n "$LAST_BETA_TAG" ]; then
    LAST_N=$(echo "$LAST_BETA_TAG" | sed 's/.*beta\.//')
    BETA_N=$((LAST_N + 1))
else
    BETA_N=1
fi
BETA_TAG="v${APP_VERSION}-beta.${BETA_N}"
echo "Beta tag: $BETA_TAG"

cd $SOURCE_FOLDER_PATH
cp -r ./dist $BUILD_FOLDER_PATH/
cp ./package.json $BUILD_FOLDER_PATH/
cp ./ecosystem.config.js $BUILD_FOLDER_PATH/
cp ./docker-runner.js $BUILD_FOLDER_PATH/
cp ./yarn.lock $BUILD_FOLDER_PATH/
cp -r ./certificates $BUILD_FOLDER_PATH/
cp -r ./assets $BUILD_FOLDER_PATH/
cp ./.env.prod $BUILD_FOLDER_PATH/
cp -r ./scripts/ $BUILD_FOLDER_PATH/

cd $BUILD_FOLDER_PATH
echo "\nnpm_package_version=$APP_VERSION" >> .env.prod
git add .
git commit -m "Beta: $BETA_TAG"
git push

git tag "$BETA_TAG"
git push origin "$BETA_TAG"

echo "Beta release complete: $BETA_TAG"
echo "Run update-manifest.sh to point the beta channel at this tag when ready."
