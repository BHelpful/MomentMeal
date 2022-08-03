#!/bin/sh
# wait-for-postgres.sh

set -e

cmd="$@"
  
until PGPASSWORD=123 psql -h "host.docker.internal" -U "postgres" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "Postgres is up - executing command"

exec $cmd