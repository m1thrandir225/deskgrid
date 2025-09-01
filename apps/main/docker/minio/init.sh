#!/bin/bash

echo "Starting MinIO initialization..."

# Wait for MinIO to be ready
until mc alias set minio http://minio:9000 ${MINIO_ROOT_USER:-sail} ${MINIO_ROOT_PASSWORD:-password}; do
    echo "Waiting for MinIO to be ready..."
    sleep 2
done

echo "MinIO is ready. Creating buckets..."

mc mb minio/deskgrid --ignore-existing

mc anonymous set public minio/deskgrid


echo "MinIO bucket initialization complete!"
echo "Available buckets:"
mc ls minio/
