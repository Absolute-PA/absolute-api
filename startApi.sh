git checkout main
git fetch origin
git reset --hard origin/main
yarn
./startDB.sh
if ! test -f .env ; then 
    cp .env.prod .env
fi
HTTPS=true  node -r newrelic ./build/index.js