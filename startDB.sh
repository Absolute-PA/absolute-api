#!/bin/bash
cd "$(dirname "$0")"

HOST="localhost"
PORT=27017
MAX_RETRIES=3
RETRY_DELAY=5 # seconds

timestamp() {
    date '+%Y-%m-%d %H:%M:%S'
}

function log_msg() {
    echo "[$(timestamp)] $1"
}

function is_mongo_running() {
    nc -z "$HOST" "$PORT"
    return $?
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
    wait_for_mongo
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