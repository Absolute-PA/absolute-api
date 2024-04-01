git checkout main
git fetch origin
git reset --hard origin/main
yarn
./startDB.sh
cp .env.prod .env
HTTPS=true  node -r newrelic ./build/index.js