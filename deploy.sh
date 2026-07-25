#!/usr/bin/env bash

set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LIVE_DIR="/var/www/dultic"
BACKUP_ROOT="/var/backups/dultic"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="$BACKUP_ROOT/$TIMESTAMP"

echo "Checking development files..."

test -f "$SOURCE_DIR/index.html" || {
  echo "Error: index.html was not found."
  exit 1
}

echo "Creating production backup..."

sudo mkdir -p "$BACKUP_DIR"
sudo cp -a "$LIVE_DIR/." "$BACKUP_DIR/"

echo "Deploying Dultic placeholder..."

sudo rsync -av --delete \
  --exclude=".git/" \
  --exclude="deploy.sh" \
  "$SOURCE_DIR/" "$LIVE_DIR/"

echo "Testing Nginx configuration..."

sudo nginx -t

echo "Reloading Nginx..."

sudo systemctl reload nginx

echo
echo "Deployment completed."
echo "Backup: $BACKUP_DIR"
echo "Live directory: $LIVE_DIR"
