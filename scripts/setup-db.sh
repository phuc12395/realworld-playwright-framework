#!/usr/bin/env bash
set -e

ENV="dev"

for arg in "$@"
do
  case $arg in
    --env=*)
      ENV="${arg#*=}"
      shift
      ;;
  esac
done

echo "🚀 Starting db for $ENV environment..."
docker compose -f docker-compose.yml -f docker-compose.$ENV.yml up -d --wait
NODE_ENV=$ENV npm run sqlz -- db:create
NODE_ENV=$ENV npm run sqlz -- db:migrate
NODE_ENV=$ENV npm run sqlz -- db:seed:all

echo "✅ db for $ENV environment ready"