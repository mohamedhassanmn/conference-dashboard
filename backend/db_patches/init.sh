#!/bin/bash
set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
echo "Project root: $PROJECT_ROOT"

# Use first argument as env, default to development
ENV=${1:-development}
ENV_FILE="$PROJECT_ROOT/backend/.env.$ENV"

if [ -f "$ENV_FILE" ]; then
  echo "Loading $ENV_FILE..."
  export $(grep -v '^#' "$ENV_FILE" | xargs)
else
  echo "Error: $ENV_FILE not found"
  exit 1
fi

echo "Running db patches..."

for f in "$(dirname "$0")"/*.sql; do
  echo "Applying $f..."
  cat "$f" | docker compose -f "$PROJECT_ROOT/docker-compose.yml" exec -T db psql -U "$DB_USER" -d "$DB_NAME"
done

echo "All patches applied."