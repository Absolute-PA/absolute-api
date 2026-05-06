#!/bin/bash

# Stops all external audio and browser processes spawned by the API.
# Safe to call before an API restart to prevent orphaned processes
# from holding the audio device or consuming memory.

timestamp() {
    date '+%Y-%m-%d %H:%M:%S'
}

log_msg() {
    echo "[$(timestamp)] $1"
}

log_msg "🧹 Cleaning up API-spawned processes..."

pkill -9 mplayer   2>/dev/null && log_msg "  ✅ mplayer stopped"   || log_msg "  ℹ️  mplayer not running"
pkill -9 mpg123    2>/dev/null && log_msg "  ✅ mpg123 stopped"    || log_msg "  ℹ️  mpg123 not running"
pkill -9 chromium  2>/dev/null && log_msg "  ✅ chromium stopped"  || log_msg "  ℹ️  chromium not running"
pkill -9 chrome    2>/dev/null && log_msg "  ✅ chrome stopped"    || log_msg "  ℹ️  chrome not running"

log_msg "✅ Process cleanup complete"
