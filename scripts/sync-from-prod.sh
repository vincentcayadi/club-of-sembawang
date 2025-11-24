#!/bin/bash

# Sync production Supabase data to local Postgres
# Drops all local tables and syncs from production
# Usage: ./scripts/sync-from-prod.sh

set -e

echo "[1/5] Checking local Postgres connection..."

# Production database (Supabase) - loaded from environment
if [ -z "$DATABASE_URI" ]; then
  echo "ERROR: DATABASE_URI environment variable is not set"
  echo "Please set DATABASE_URI to your production Supabase connection string"
  exit 1
fi
PROD_DB="$DATABASE_URI"

# Local database
LOCAL_DB="postgresql://postgres:postgres@localhost:5432/postgres"

# Check if local Postgres is running
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
  echo "ERROR: Local Postgres is not running on port 5432"
  echo "Start it with: docker run --name payload-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -p 5432:5432 -d postgres:16"
  exit 1
fi

echo "[2/5] Dropping all local tables..."

# Drop all tables in public schema
psql "$LOCAL_DB" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

echo "[3/5] Dumping production database..."

# Create temp directory for dump
TEMP_DIR=$(mktemp -d)
DUMP_FILE="$TEMP_DIR/prod_dump.sql"

pg_dump "$PROD_DB" \
  --no-owner \
  --no-acl \
  > "$DUMP_FILE"

echo "[4/5] Restoring production data to local..."
psql "$LOCAL_DB" < "$DUMP_FILE" > /dev/null

echo "[5/5] Cleaning up..."
rm -rf "$TEMP_DIR"

echo ""
echo "SUCCESS: Local database synced with production"
echo "WARNING: This is read-only. Local changes will not affect production."
