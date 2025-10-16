#!/bin/bash
set -e

# === CONFIG ===
USERNAME=${1:-$(whoami)}             # You can pass username as first argument
SUDOERS_FILE="/etc/sudoers.d/pm2-reboot"
ENTRY="$USERNAME ALL=(ALL) NOPASSWD: /sbin/reboot, /usr/sbin/reboot"

# === CHECK ROOT ===
if [ "$EUID" -ne 0 ]; then
  echo "❌ Please run this script with sudo or as root."
  exit 1
fi

# === CREATE OR UPDATE SUDOERS FILE ===
if [ ! -f "$SUDOERS_FILE" ]; then
  echo "Creating $SUDOERS_FILE..."
  echo "$ENTRY" > "$SUDOERS_FILE"
else
  if grep -Fxq "$ENTRY" "$SUDOERS_FILE"; then
    echo "✅ Entry already exists in $SUDOERS_FILE"
  else
    echo "Appending entry to $SUDOERS_FILE..."
    echo "$ENTRY" >> "$SUDOERS_FILE"
  fi
fi

# === SECURE FILE PERMISSIONS ===
chmod 440 "$SUDOERS_FILE"

# === VALIDATE SUDOERS SYNTAX ===
visudo -cf "$SUDOERS_FILE" > /dev/null
if [ $? -eq 0 ]; then
  echo "✅ Sudoers syntax OK. Passwordless reboot is configured for $USERNAME."
else
  echo "❌ Syntax error detected. Reverting changes."
  rm "$SUDOERS_FILE"
  exit 1
fi