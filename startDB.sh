#!/bin/bash
cd "$(dirname "$0")"

HOST="localhost"
PORT=27017
MAX_RETRIES=3
RETRY_DELAY=5 # seconds

function is_mongo_running() {
    nc -z "$HOST" "$PORT"
    return $?
}

function wait_for_mongo() {
    echo "⏳ Waiting for MongoDB to be ready..."
    for i in {1..10}; do
        if is_mongo_running; then
            echo "✅ MongoDB is now running"
            return 0
        fi
        sleep 1
    done
    echo "❌ MongoDB did not respond in time"
    return 1
}

function start_mongo() {
    echo "🚀 Starting MongoDB via Docker Compose..."
    docker compose up -d --force-recreate --build
    wait_for_mongo
}

function monitor_mongo() {
    echo "🩺 Monitoring MongoDB health..."

    for i in $(seq 1 $MAX_RETRIES); do
        if is_mongo_running; then
            echo "✅ MongoDB is healthy"
            return
        else
            echo "⚠️ MongoDB is unresponsive (attempt $i/$MAX_RETRIES)"
            sleep "$RETRY_DELAY"
        fi
    done

    echo "♻️ Restarting MongoDB..."
    docker compose restart
    wait_for_mongo
}

# --- Script starts here ---
if is_mongo_running; then
    echo "✅ MongoDB is already running"
else
    start_mongo
fi

# Monitor MongoDB health in a loop
while true; do
    monitor_mongo
    sleep 60  # check every 60s
done