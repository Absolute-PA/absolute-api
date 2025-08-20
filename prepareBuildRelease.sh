set -Eeuo pipefail

BUILD_FOLDER_PATH=../absolute-api-release
SOURCE_FOLDER_PATH=../nodeweb-master-api
BUILD_ID_FILE="dist/BUILD_ID"

# clean build repo
if [ ! -d "$BUILD_FOLDER_PATH" ]; then
    git clone git@github.com:Absolute-PA/absolute-api-release.git $BUILD_FOLDER_PATH
fi
cd $BUILD_FOLDER_PATH
git reset --hard
git checkout main
git pull origin main

# build API
cd $SOURCE_FOLDER_PATH
git checkout main
git pull origin main

CURRENT_COMMIT_HASH=$(git rev-parse HEAD)
if [ -e "$BUILD_ID_FILE" ]; then
    # Read the stored commit hash from the BUILD_ID file
    STORED_COMMIT_HASH=$(cat "$BUILD_ID_FILE")

    # Compare the current commit hash with the stored commit hash
    if [ "$CURRENT_COMMIT_HASH" == "$STORED_COMMIT_HASH" ]; then
        echo "Current commit hash matches the stored commit hash. Exiting..."
    else
        echo "Current commit hash does not match the stored commit hash. Running 'yarn build'..."
        yarn build
    fi
else
    echo "BUILD_ID file not found. Running 'yarn build'..."
    yarn build
fi

echo "$CURRENT_COMMIT_HASH" > "$BUILD_ID_FILE"
echo "Build process completed."

# Update the version in package.json
npm version  --allow-same-version patch -m "Update version to %s"
APP_VERSION=$(node -p -e "require('./package.json').version")
echo App version is $APP_VERSION
git push

# Copy build artifacts to the build folder
cp -r ./dist $BUILD_FOLDER_PATH/
cp ./package.json $BUILD_FOLDER_PATH/
cp ./ecosystem.config.js $BUILD_FOLDER_PATH/
cp ./docker-runner.js $BUILD_FOLDER_PATH/
cp ./yarn.lock $BUILD_FOLDER_PATH/
cp -r ./certificates $BUILD_FOLDER_PATH/
cp -r ./assets $BUILD_FOLDER_PATH/
cp ./.env.prod $BUILD_FOLDER_PATH/
cp -r ./scripts/ $BUILD_FOLDER_PATH/
cp ./newrelic.js $BUILD_FOLDER_PATH/

# Update the .env.prod file
cd $BUILD_FOLDER_PATH
echo "\nnpm_package_version=$APP_VERSION" >> .env.prod
git add .
git commit -m "Version: $APP_VERSION"
git push
