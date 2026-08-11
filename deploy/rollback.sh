#!/usr/bin/env bash
set -euo pipefail

release_id=${1:?usage: rollback.sh RELEASE_ID [staging|production]}
environment=${2:-staging}
[[ "$release_id" =~ ^[A-Za-z0-9._-]{3,120}$ ]] || { echo "Invalid release id" >&2; exit 2; }
target="/opt/oehler-huang-platform/releases/$release_id"
[[ -d "$target" ]] || { echo "Release not found: $target" >&2; exit 3; }
if [[ "$environment" == "staging" ]]; then
  service=oehler-huang-platform-staging.service
  port=8790
  current=/opt/oehler-huang-platform/current-staging
elif [[ "$environment" == "production" ]]; then
  service=oehler-huang-platform.service
  port=8787
  current=/opt/oehler-huang-platform/current
else
  echo "Environment must be staging or production" >&2
  exit 2
fi
link="/opt/oehler-huang-platform/.rollback-$release_id"
ln -s "$target" "$link"
mv -Tf "$link" "$current"
systemctl restart "$service"
for _ in {1..30}; do
  if curl --fail --silent "http://127.0.0.1:$port/api/health"; then
    echo
    echo "Rolled back to $release_id."
    exit 0
  fi
  sleep 1
done
echo "Rollback health check failed for $release_id" >&2
systemctl status "$service" --no-pager >&2 || true
exit 5
