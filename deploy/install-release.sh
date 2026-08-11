#!/usr/bin/env bash
set -euo pipefail

archive=${1:?usage: install-release.sh ARCHIVE RELEASE_ID [staging|production]}
release_id=${2:?usage: install-release.sh ARCHIVE RELEASE_ID [staging|production]}
environment=${3:-staging}

[[ "$release_id" =~ ^[A-Za-z0-9._-]{3,120}$ ]] || { echo "Invalid release id" >&2; exit 2; }
[[ "$environment" == "staging" || "$environment" == "production" ]] || { echo "Environment must be staging or production" >&2; exit 2; }
[[ -f "$archive" ]] || { echo "Archive not found: $archive" >&2; exit 2; }

base=/opt/oehler-huang-platform
release_dir="$base/releases/$release_id"
if [[ "$environment" == "staging" ]]; then
  current="$base/current-staging"
  data_dir=/var/lib/oehler-huang-platform-staging
  backup_dir=/var/backups/oehler-huang-platform-staging
  env_file=/etc/oehler-huang-platform/staging.env
  service=oehler-huang-platform-staging.service
  port=8790
  cookie_secure=false
else
  current="$base/current"
  data_dir=/var/lib/oehler-huang-platform
  backup_dir=/var/backups/oehler-huang-platform
  env_file=/etc/oehler-huang-platform/platform.env
  service=oehler-huang-platform.service
  port=8787
  cookie_secure=true
fi

id econmark >/dev/null 2>&1 || useradd --system --home-dir "$data_dir" --shell /usr/sbin/nologin econmark
install -d -o root -g root -m 0755 "$base" "$base/releases" /etc/oehler-huang-platform
install -d -o econmark -g econmark -m 0750 "$data_dir"
install -d -o econmark -g econmark -m 0700 "$backup_dir"
[[ ! -e "$release_dir" ]] || { echo "Release already exists: $release_dir" >&2; exit 3; }
install -d -o root -g root -m 0755 "$release_dir"
tar --extract --gzip --file "$archive" --directory "$release_dir" --no-same-owner --no-same-permissions
[[ -f "$release_dir/package.json" && -f "$release_dir/apps/platform/server/app-server.mjs" ]] || { echo "Release archive is incomplete" >&2; exit 4; }

cd "$release_dir"
npm ci --omit=dev --ignore-scripts=false
npm run build:content

cat >"$env_file" <<EOF
NODE_ENV=production
OH_HOST=127.0.0.1
OH_PORT=$port
OH_DATA_DIR=$data_dir
OH_BACKUP_DIR=$backup_dir
OH_LIBRARY_ROOT=$current/apps/library
OH_SELECTOR_ROOT=$current/apps/student-selector
ECONMARK_COOKIE_SECURE=$cookie_secure
ECONMARK_SESSION_DAYS=30
OH_STUDENT_MAX_FILE_MB=16
OH_TEACHER_MAX_FILE_MB=32
OH_STUDENT_STORAGE_MB=100
OH_TEACHER_STORAGE_MB=2048
OH_BATCH_TOTAL_MB=512
OH_DISK_WARN_PERCENT=60
OH_DISK_CRITICAL_PERCENT=70
OH_DISK_UPLOAD_STOP_PERCENT=80
OH_ALLOW_LEGACY_REGISTRATION=false
EOF
chmod 0640 "$env_file"
chown root:econmark "$env_file"

if [[ -f "$data_dir/econmark.sqlite" ]]; then
  backup_id="pre-release-$release_id"
  runuser -u econmark -- env OH_DATA_DIR="$data_dir" OH_BACKUP_DIR="$backup_dir" node "$release_dir/apps/platform/scripts/backup.mjs" "$backup_id"
  node "$release_dir/apps/platform/scripts/verify-backup.mjs" "$backup_dir/$backup_id"
fi

runuser -u econmark -- env OH_DATA_DIR="$data_dir" node "$release_dir/apps/platform/scripts/migrate.mjs"
chown -R econmark:econmark "$data_dir" "$backup_dir"
find "$data_dir" -type d -exec chmod 0750 {} +
find "$data_dir" -type f -exec chmod 0640 {} +
if [[ -d "$data_dir/backups" ]]; then chmod 0700 "$data_dir/backups"; fi
find "$backup_dir" -type d -exec chmod 0700 {} +
find "$backup_dir" -type f -exec chmod 0600 {} +
chown -R root:root "$release_dir"
chmod -R go-w "$release_dir"

unit_source="$release_dir/deploy/oehler-huang-platform.service"
sed \
  -e "s|/opt/oehler-huang-platform/current|$current|g" \
  -e "s|EnvironmentFile=/etc/oehler-huang-platform/platform.env|EnvironmentFile=$env_file|" \
  -e "s|ReadWritePaths=/var/lib/oehler-huang-platform /var/backups/oehler-huang-platform|ReadWritePaths=$data_dir $backup_dir|" \
  "$unit_source" >"/etc/systemd/system/$service"
chmod 0644 "/etc/systemd/system/$service"
install -m 0644 "$release_dir/deploy/oehler-huang-storage-check.service" /etc/systemd/system/oehler-huang-storage-check.service
install -m 0644 "$release_dir/deploy/oehler-huang-storage-check.timer" /etc/systemd/system/oehler-huang-storage-check.timer

previous=""
[[ -L "$current" ]] && previous=$(readlink -f "$current")
next_link="$base/.current-$release_id"
ln -s "$release_dir" "$next_link"
mv -Tf "$next_link" "$current"

rollback() {
  if [[ -n "$previous" && -d "$previous" ]]; then
    ln -s "$previous" "$base/.rollback-current"
    mv -Tf "$base/.rollback-current" "$current"
    systemctl restart "$service" || true
  fi
}
trap rollback ERR
systemctl daemon-reload
systemctl enable --now "$service"
if [[ "$environment" == "production" ]]; then systemctl enable --now oehler-huang-storage-check.timer; fi
for _ in {1..30}; do
  if curl --fail --silent "http://127.0.0.1:$port/api/health" >/dev/null; then
    trap - ERR
    echo "Release $release_id is healthy on 127.0.0.1:$port ($environment)."
    exit 0
  fi
  sleep 1
done
echo "Health check failed for release $release_id" >&2
exit 5
