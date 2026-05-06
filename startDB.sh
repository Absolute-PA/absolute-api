#!/bin/bash
cd "$(dirname "$0")"

MONGO_HOST="localhost"
MONGO_PORT=27017
MAX_RETRIES=3
RETRY_DELAY=5 # seconds
DEBUG=true

timestamp() {
    date '+%Y-%m-%d %H:%M:%S'
}

function log_msg() {
    echo "[$(timestamp)] $1"
}

function is_mongo_running() {
    # Prefer system nc with a timeout; use full path to avoid PATH differences under PM2
    if command -v nc >/dev/null 2>&1; then
        NC_BIN=$(command -v nc)
    [ "$DEBUG" = "true" ] && log_msg "🔎 Checking $MONGO_HOST:$MONGO_PORT with $NC_BIN"
    "$NC_BIN" -z -w 2 "$MONGO_HOST" "$MONGO_PORT" >/dev/null 2>&1
        local rc=$?
        [ "$DEBUG" = "true" ] && log_msg "🔍 nc exit code: $rc"
        return $rc
    fi

    # Fallback: use bash /dev/tcp (not available in all shells)
    [ "$DEBUG" = "true" ] && log_msg "🔎 nc not found, falling back to /dev/tcp"
    (echo > /dev/tcp/"$MONGO_HOST"/"$MONGO_PORT") >/dev/null 2>&1
    local rc=$?
    [ "$DEBUG" = "true" ] && log_msg "🔍 /dev/tcp exit code: $rc"
    return $rc
}

function wait_for_mongo() {
    log_msg "⏳ Waiting for MongoDB to be ready..."
    for i in {1..10}; do
        if is_mongo_running; then
            log_msg "✅ MongoDB is now running"
            return 0
        fi
        sleep 1
    done
    log_msg "❌ MongoDB did not respond in time"
    return 1
}

function start_mongo() {
    log_msg "🚀 Starting MongoDB via Docker Compose..."
    docker compose up -d --force-recreate --build
    wait_for_mongo
}

function monitor_mongo() {
    log_msg "🩺 Monitoring MongoDB health..."

    for i in $(seq 1 $MAX_RETRIES); do
        if is_mongo_running; then
            log_msg "✅ MongoDB is healthy"
            return
        else
            log_msg "⚠️ MongoDB is unresponsive (attempt $i/$MAX_RETRIES)"
            sleep "$RETRY_DELAY"
        fi
    done

    log_msg "♻️ Restarting MongoDB..."
    pm2 restart restart-db
    if wait_for_mongo; then
        bash "$(dirname "$0")/cleanProcesses.sh"
        log_msg "🔄 Restarting API to restore Mongoose connection..."
        pm2 restart startApi
    else
        log_msg "❌ MongoDB still not responding after restart — skipping API restart"
    fi
}

# --- Script starts here ---
if is_mongo_running; then
    log_msg "✅ MongoDB is already running"
else
    start_mongo
fi

# Load .env if present
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Monitor MongoDB health in a loop
while true; do
    monitor_mongo
    sleep 60  # check every 60s
done