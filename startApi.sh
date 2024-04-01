git checkout main
git fetch origin
git reset --hard origin/main

cp .env.prod .env
HTTPS=true  node -r newrelic ./build/index.js