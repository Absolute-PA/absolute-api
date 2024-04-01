git checkout main
git fetch origin
git reset --hard origin/main

./startDB.sh
cp .env.prod .env
HTTPS=true  node -r newrelic ./build/index.js