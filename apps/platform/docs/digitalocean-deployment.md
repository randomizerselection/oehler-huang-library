# DigitalOcean VPS deployment runbook

## Target architecture

```text
Public HTTPS
    │
    ▼
Nginx :443 ── TLS, request-size limit, proxy timeout
    │
    ▼
EconMark 127.0.0.1:4173 ── accounts, CSRF, workflows, provider routing
    ├── /var/lib/econmark/econmark.sqlite
    └── /var/lib/econmark/images/<account_id>/...
             │
             └── encrypted off-VPS backup of database + images
```

One VPS is sufficient for the competition and an initial class workload. Nginx is the only public listener; Node remains bound to loopback. The data directory must be on a persistent, monitored disk and backed up as one unit.

## 1. Prepare the server

Use a currently supported Ubuntu LTS image, install Node.js 22.5 or newer, Nginx and the certificate tooling approved for the server. Create a non-login service account and directories:

```bash
sudo useradd --system --home /opt/econmark --shell /usr/sbin/nologin econmark
sudo mkdir -p /opt/econmark /var/lib/econmark /etc/econmark
sudo chown -R econmark:econmark /opt/econmark /var/lib/econmark
sudo chmod 700 /var/lib/econmark /etc/econmark
```

Copy the repository into `/opt/econmark`, then install exact production dependencies:

```bash
cd /opt/econmark
sudo -u econmark npm ci --omit=dev
node --version
npm test
npm run check
```

## 2. Configure secrets and limits

Copy `deploy/econmark.env.example` to `/etc/econmark/econmark.env`, replace model keys and tune limits. The file must not be web-readable or committed:

```bash
sudo chown root:econmark /etc/econmark/econmark.env
sudo chmod 640 /etc/econmark/econmark.env
```

Use `ECONMARK_COOKIE_SECURE=true` behind HTTPS. `ECONMARK_MAX_REQUEST_MB` must exceed the base64-expanded single-file size, and Nginx `client_max_body_size` must be at least as large. Begin with concurrency 4; raise it only after observing memory, API rate limits and latency.

## 3. Install systemd service

Copy `deploy/econmark.service` to `/etc/systemd/system/econmark.service`, then:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now econmark
sudo systemctl status econmark
sudo journalctl -u econmark -n 100 --no-pager
curl http://127.0.0.1:4173/api/config
```

The unit restricts filesystem writes to `/var/lib/econmark`. If code or data paths change, update both the service and environment file deliberately.

## 4. Configure Nginx and TLS

Copy `deploy/nginx.conf.example`, replace `econmark.example.com`, enable the site, validate Nginx and obtain a trusted certificate using the server's approved ACME workflow. After HTTPS is active, verify:

```bash
curl -I https://econmark.example.com/
curl https://econmark.example.com/api/config
```

Keep HTTP redirected to HTTPS. Do not expose port 4173 in the cloud firewall. Permit only SSH, HTTP and HTTPS; restrict SSH to keys and trusted source addresses where practical.

## 5. Smoke test the real system

1. In a signed-out private window, run all three public samples and the 30-person synthetic batch.
2. Create a temporary account and confirm the password is not present in logs or database text.
3. Upload one small anonymized image, mark it and reload the page.
4. Open the stored run and original image from account history.
5. In a second account, verify the first account's result and image URLs return 404.
6. Test teacher-review and full-auto batches, then print the bilingual feedback pack.
7. Test configured per-file and batch boundaries and confirm old data remains intact.

## 6. Permanent data and backup

Back up `/var/lib/econmark` off the VPS. The safest simple procedure is a brief maintenance window: stop EconMark, take a snapshot/copy of the complete directory, restart it, then verify the backup and perform periodic restores on another host.

```bash
sudo systemctl stop econmark
sudo tar --xattrs --acls -C /var/lib -cpf /secure-backup/econmark-YYYYMMDD.tar econmark
sudo systemctl start econmark
```

The backup destination must not be inside `/var/lib/econmark` and should use encryption and separate credentials. Do not back up only `econmark.sqlite`; every database image row must remain paired with the corresponding file. EconMark never auto-deletes uploads, so monitoring must alert before disk or inode exhaustion (for example at 70%, 85% and 95%). At the final threshold, reduce upload limits or stop accepting new uploads—never silently delete historical work.

## 7. Updates and rollback

Before an update, create a verified backup, run tests on the new code, stop the service, replace code without replacing `/var/lib/econmark`, run `npm ci --omit=dev`, and restart. Retain the previous application release so code can be rolled back while continuing to use the same 3.0 data contract. Never run `git reset --hard` or delete the data directory as a deployment shortcut.

## 8. Operational risks

Open registration plus permanent files can be abused. The application supplies baseline login/grading rate limits and account quotas, but a public VPS should additionally use Nginx or firewall rate controls, cost alerts, disk monitoring, automated health checks and an account-disable administration procedure. If public uploads are not needed for the competition, keep the public samples open and restrict account creation at the network or invitation layer in a later release; do not weaken record ownership checks.
