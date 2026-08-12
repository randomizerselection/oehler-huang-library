#!/usr/bin/env bash
set -euo pipefail

overlay=${1:?usage: install-overlay-release.sh OVERLAY RELEASE_ID [staging|production]}
release_id=${2:?usage: install-overlay-release.sh OVERLAY RELEASE_ID [staging|production]}
environment=${3:-staging}

[[ "$release_id" =~ ^[A-Za-z0-9._-]{3,120}$ ]] || { echo "Invalid release id" >&2; exit 2; }
[[ "$environment" == "staging" || "$environment" == "production" ]] || { echo "Environment must be staging or production" >&2; exit 2; }
[[ -f "$overlay" ]] || { echo "Overlay not found: $overlay" >&2; exit 2; }

base=/opt/oehler-huang-platform
release_dir="$base/releases/$release_id"
if [[ "$environment" == "staging" ]]; then
  current="$base/current-staging"
  data_dir=/var/lib/oehler-huang-platform-staging
  backup_dir=/var/backups/oehler-huang-platform-staging
  env_file=/etc/oehler-huang-platform/staging.env
  service=oehler-huang-platform-staging.service
  port=8790
else
  current="$base/current"
  data_dir=/var/lib/oehler-huang-platform
  backup_dir=/var/backups/oehler-huang-platform
  env_file=/etc/oehler-huang-platform/platform.env
  service=oehler-huang-platform.service
  port=8787
fi

[[ -L "$current" ]] || { echo "Current release link not found: $current" >&2; exit 3; }
previous=$(readlink -f "$current")
[[ "$previous" == "$base/releases/"* && -d "$previous" ]] || { echo "Current release is outside the release root" >&2; exit 3; }
[[ ! -e "$release_dir" ]] || { echo "Release already exists: $release_dir" >&2; exit 3; }
[[ -f "$env_file" ]] || { echo "Environment file not found: $env_file" >&2; exit 3; }

while IFS= read -r entry; do
  [[ -n "$entry" ]] || continue
  case "/$entry/" in
    //*|*/../*) echo "Unsafe overlay entry: $entry" >&2; exit 4 ;;
  esac
done < <(tar --list --gzip --file "$overlay")

install -d -o root -g root -m 0755 "$release_dir"
cp -a --link "$previous/." "$release_dir/"
while IFS= read -r entry; do
  [[ -n "$entry" && "$entry" != */ ]] || continue
  rm -f -- "$release_dir/$entry"
done < <(tar --list --gzip --file "$overlay")
tar --extract --gzip --file "$overlay" --directory "$release_dir" --no-same-owner --no-same-permissions
[[ -f "$release_dir/package.json" && -f "$release_dir/apps/platform/server/app-server.mjs" ]] || { echo "Overlay release is incomplete" >&2; exit 4; }

cd "$release_dir"
npm ci --omit=dev --ignore-scripts=false
rm -f -- apps/library/assets/data/content-manifest.json apps/library/assets/data/quiz-bank.json
npm run build:content

if [[ -f "$data_dir/econmark.sqlite" ]]; then
  backup_id="pre-release-$release_id"
  runuser -u econmark -- env OH_DATA_DIR="$data_dir" OH_BACKUP_DIR="$backup_dir" node "$release_dir/apps/platform/scripts/backup.mjs" "$backup_id"
  node "$release_dir/apps/platform/scripts/verify-backup.mjs" "$backup_dir/$backup_id"
fi

runuser -u econmark -- env OH_DATA_DIR="$data_dir" node "$release_dir/apps/platform/scripts/migrate.mjs"
chown -R root:root "$release_dir"
chmod -R go-w "$release_dir"

unit_source="$release_dir/deploy/oehler-huang-platform.service"
sed \
  -e "s|/opt/oehler-huang-platform/current|$current|g" \
  -e "s|EnvironmentFile=/etc/oehler-huang-platform/platform.env|EnvironmentFile=$env_file|" \
  -e "s|ReadWritePaths=/var/lib/oehler-huang-platform /var/backups/oehler-huang-platform|ReadWritePaths=$data_dir $backup_dir|" \
  "$unit_source" >"/etc/systemd/system/$service"
chmod 0644 "/etc/systemd/system/$service"

next_link="$base/.current-$release_id"
switched=false
rollback() {
  if [[ "$switched" == true && -d "$previous" ]]; then
    ln -s "$previous" "$base/.rollback-current"
    mv -Tf "$base/.rollback-current" "$current"
    systemctl restart "$service" || true
  fi
}
trap rollback ERR
ln -s "$release_dir" "$next_link"
mv -Tf "$next_link" "$current"
switched=true
systemctl daemon-reload
systemctl restart "$service"
for _ in {1..30}; do
  if curl --fail --silent "http://127.0.0.1:$port/api/health" >/dev/null; then
    trap - ERR
    echo "Overlay release $release_id is healthy on 127.0.0.1:$port ($environment)."
    exit 0
  fi
  sleep 1
done
echo "Health check failed for overlay release $release_id" >&2
exit 5
