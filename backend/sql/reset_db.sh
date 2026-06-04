#!/usr/bin/env sh
set -e

DB_NAME="productionplacer"
DB_USER="$(whoami)"

echo "Resetting database: $DB_NAME"

dropdb -U "$DB_USER" --if-exists "$DB_NAME"
createdb -U "$DB_USER" "$DB_NAME"

psql -U "$DB_USER" -d "$DB_NAME" -f 01_schema.sql
psql -U "$DB_USER" -d "$DB_NAME" -f 02_productionplacer.sql
