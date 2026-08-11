# VPS release operations

`publish-to-vps.ps1` validates the workspace, builds a source archive, uploads it, and invokes `install-release.sh`. Staging listens only on `127.0.0.1:8790`; test it with an SSH tunnel. The installer does not edit Nginx, DNS, TLS, or HSTS.

Production activation is deliberately separate. After ICP approval and explicit authorization:

1. Deploy with `-Environment production`.
2. Review and install `nginx-oehler-huang-platform.conf`.
3. Obtain/renew certificates, add the TLS listener and HSTS only after HTTPS is confirmed.
4. Switch root and `www` DNS, then add the `mark` redirect to `/mark/`.

Every upgrade creates and verifies a database/upload backup before migrations, then switches its symlink atomically: `current-staging` for private staging and `current` for production. Use `rollback.sh <release-id> <environment>` for code rollback. Database rollbacks require a tested backup restore when a migration is not backward-compatible.
