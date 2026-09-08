# VPS release operations

`publish-to-vps.ps1` validates the workspace, builds a source archive, uploads it, and invokes `install-release.sh`. Staging listens only on `127.0.0.1:8790`; test it with an SSH tunnel. The installer does not edit Nginx, DNS, TLS, or HSTS.

Run `npm run release:plan` to preview selected files and sizes, or
`node deploy/release-files.mjs --output <file>` for the exact list. The publisher
uses this list rather than archiving all of `apps/`. Shared workspaces are included;
authoring, tests, private archives, app-local deployment history and scratch output
are excluded. Public-file rules are shared with the Node server. Nginx must proxy
application assets through Node to preserve those rules.

Production activation is deliberately separate. After ICP approval and explicit authorization:

1. Deploy with `-Environment production`.
2. Review and install `nginx-oehler-huang-platform.conf`.
3. Obtain/renew certificates, add the TLS listener and HSTS only after HTTPS is confirmed.
4. Switch root and `www` DNS, then redirect the legacy `mark` host and `/mark/` paths to `/econmark/`.

Every upgrade creates and verifies a database/upload backup before migrations, then switches its symlink atomically: `current-staging` for private staging and `current` for production. Use `rollback.sh <release-id> <environment>` for code rollback. Database rollbacks require a tested backup restore when a migration is not backward-compatible.

Existing environment files are preserved verbatim during upgrades. Defaults and
legacy provider settings are imported only when creating a new environment. The
installer restarts the service after switching releases and restores the previous
release if startup or the health check fails.

For a small code-only release over a constrained connection, `install-overlay-release.sh` can create a new release from the current release using hard links and safely overlay a Git archive. It still reinstalls production dependencies, rebuilds generated content, backs up and verifies persistent data, runs migrations, enforces read-only code permissions, switches atomically, health-checks, and restores the previous symlink on failure. Use a full `publish-to-vps.ps1` release whenever media or other large source assets changed.
