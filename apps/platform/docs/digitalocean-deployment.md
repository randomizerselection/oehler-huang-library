# VPS deployment pointer

Deployment is owned at the monorepo root. Use:

- `../../../deploy/README.md` for release, staging, production, backup, activation, and rollback operations.
- `../../../deploy/platform.env.example` for runtime configuration.
- `../../../deploy/oehler-huang-platform.service` for systemd.
- `../../../deploy/nginx-oehler-huang-platform.conf` for same-origin `/`, `/econmark/`, `/api/`, `/platform/`, and `/selector/` routing.
- `unified-platform-rollout.md` for cross-area smoke tests and cutover requirements.

Do not deploy `apps/platform` or `apps/library` separately. Persistent SQLite
and uploads live outside immutable releases below `OH_DATA_DIR`; every upgrade
must use the root release tooling so backup verification, migrations, atomic
symlink switching, health checks, and rollback remain one operation.
