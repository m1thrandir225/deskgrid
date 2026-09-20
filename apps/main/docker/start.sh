#!/bin/sh
set -e

# Wait for database to be ready (non-blocking check)
# Migrations are handled by the migration job in Kubernetes
php artisan migrate:status > /dev/null 2>&1 || echo "Database not ready yet, continuing..."

# Create storage link if it doesn't exist
php artisan storage:link || true

# Clear and cache config (safe to run on every startup)
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

# Start PHP-FPM in background
php-fpm -D

# Start nginx in foreground
nginx -g 'daemon off;'

