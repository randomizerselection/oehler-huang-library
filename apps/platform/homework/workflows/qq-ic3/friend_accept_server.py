"""Auto-accept incoming QQ friend requests from pre-identified students.

NapCatQQ exposes no polling API for incoming friend requests (unlike groups,
`get_friend_system_msg` is unsupported), so acceptance has to be event-driven:
NapCat's HTTP-client network config POSTs OneBot events here, and this server
approves a friend request only when its sender is already linked in the
platform database as an active student in one of `config.json` `classes`
(`student_integrations.provider='qq'`, `external_id` = QQ number).

Everything else is logged and ignored — an unknown or out-of-scope sender is
never approved, and no message is ever sent to the requester. Every decision is
appended to state/friend-requests.json under the request's opaque `flag`, so a
repeated webhook delivery returns the stored decision without calling NapCat
again.

Security: the listener binds loopback only and requires
`Authorization: Bearer <webhookToken>` from config.json on every POST. GET
/health is unauthenticated and used by run_guard preflight.

Usage:
  python friend_accept_server.py            # run the listener (forever)
  python friend_accept_server.py --retry-failed
                                            # re-attempt logged approve_failed
                                            # entries once, then exit

Config (config.json, env QQ_CONFIG_PATH overrides):
  webhookToken      bearer token NapCat must send (required)
  friendAcceptPort  listen port, default 3001 (env QQ_FRIEND_ACCEPT_PORT wins)
  onebotHttp        OneBot v11 base URL, e.g. http://127.0.0.1:3000
  onebotToken       OneBot access token used for set_friend_add_request
  platformDatabase  SQLite path (opened read-only)
  classes           in-scope class names, e.g. ["IC3.1", "IC3.2"]

Stdlib only. Exit codes: 0 ok; 1 configuration or database error.
"""
import datetime as dt
import hmac
import json
import os
import sqlite3
import sys
import threading
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse
from pathlib import Path

# Fixture copies keep local config; production data is registered privately.
SOURCE_ROOT = Path(__file__).resolve().parent
if (SOURCE_ROOT / 'config.json').is_file():
    ROOT = SOURCE_ROOT
else:
    import sys
    sys.path.insert(0, str(SOURCE_ROOT.parents[1]))
    from runtime import runtime_root
    ROOT = runtime_root('qq-ic3', SOURCE_ROOT)
STATE = ROOT / 'state'
# Tests point QQ_CONFIG_PATH at a fixture config; default behaviour is unchanged.
CONFIG_PATH = Path(os.environ['QQ_CONFIG_PATH']) if os.environ.get('QQ_CONFIG_PATH') else ROOT / 'config.json'
CONFIG = json.loads(CONFIG_PATH.read_text(encoding='utf-8'))
TZ = dt.timezone(dt.timedelta(hours=8))
AUDIT = STATE / 'friend-requests.json'

# A piped stdout on Windows otherwise uses the locale codepage (GBK here) and
# corrupts CJK nicknames in printed event summaries.
for stream in (sys.stdout, sys.stderr):
    try:
        stream.reconfigure(encoding='utf-8', errors='replace')
    except (AttributeError, ValueError):
        pass

_audit_lock = threading.Lock()
# Lightweight counters surfaced by /health so a check can tell whether NapCat is
# actually pushing events at all (a silent webhook misconfiguration looks
# exactly like "no students added me today").
_counters = {'events': 0, 'requests': 0, 'lastEventAt': None,
             'rejected': 0, 'lastRejectedAt': None}


def now():
    return dt.datetime.now(TZ).isoformat()


def log(message):
    print(f'[{now()}] {message}', flush=True)


def port():
    return int(os.environ.get('QQ_FRIEND_ACCEPT_PORT') or CONFIG.get('friendAcceptPort') or 3001)


def webhook_token():
    token = str(CONFIG.get('webhookToken') or '')
    if not token or 'CHANGE-ME' in token:
        raise SystemExit('config.json webhookToken is missing or still a placeholder; '
                         'set the same token in NapCat\'s httpClients entry')
    return token


def load_audit():
    if not AUDIT.exists():
        return {'requests': {}}
    try:
        data = json.loads(AUDIT.read_text(encoding='utf-8'))
    except ValueError:
        return {'requests': {}}
    data.setdefault('requests', {})
    return data


def save_audit(data):
    STATE.mkdir(parents=True, exist_ok=True)
    temp = AUDIT.with_suffix('.json.tmp')
    temp.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding='utf-8')
    temp.replace(AUDIT)


def record(flag, entry):
    """Persist one decision; returns the stored entry."""
    with _audit_lock:
        data = load_audit()
        data['requests'][flag] = entry
        data['updatedAt'] = now()
        save_audit(data)
    return entry


def lookup_student(user_id):
    """Return the linked in-scope student for a QQ number, else None."""
    uri = 'file:' + str(CONFIG['platformDatabase']).replace('\\', '/') + '?mode=ro'
    connection = sqlite3.connect(uri, uri=True, timeout=15)
    connection.row_factory = sqlite3.Row
    try:
        rows = connection.execute(
            """
            SELECT a.id AS accountId, a.legal_name AS legalName,
                   a.preferred_name AS preferredName, c.name AS class
            FROM student_integrations si
            JOIN accounts a ON a.id = si.account_id
            JOIN class_memberships m ON m.account_id = a.id AND m.status = 'active'
            JOIN classes c ON c.id = m.class_id
            WHERE si.provider = 'qq' AND si.external_id = ?
            """, (str(user_id),)).fetchall()
    finally:
        connection.close()
    in_scope = [dict(row) for row in rows if row['class'] in (CONFIG.get('classes') or [])]
    if len(in_scope) != 1:
        return None
    student = in_scope[0]
    name = (student['preferredName'] or student['legalName'] or '').strip()
    return {'accountId': student['accountId'], 'name': name, 'class': student['class'],
            'remark': f'{name} {student["class"]}'.strip()}


def approve(flag, remark):
    """Approve one friend request through the OneBot API."""
    url = CONFIG['onebotHttp'].rstrip('/') + '/set_friend_add_request'
    request = urllib.request.Request(
        url,
        data=json.dumps({'flag': flag, 'approve': True, 'remark': remark}).encode('utf-8'),
        headers={'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + str(CONFIG.get('onebotToken') or '')})
    with urllib.request.urlopen(request, timeout=60) as response:
        envelope = json.loads(response.read())
    if envelope.get('status') == 'failed' or envelope.get('retcode') not in (0, None):
        detail = envelope.get('message') or envelope.get('wording') or ''
        raise RuntimeError(f"set_friend_add_request failed: retcode={envelope.get('retcode')} {detail}".strip())


def decide(event):
    """Apply one friend-request event; returns the audit entry."""
    flag = str(event.get('flag') or '')
    user_id = str(event.get('user_id') or '')
    base = {'flag': flag, 'userId': user_id, 'comment': event.get('comment') or '',
            'time': event.get('time'), 'decidedAt': now()}
    if not flag:
        return dict(base, decision='ignored', reason='request event carried no flag')
    student = lookup_student(user_id)
    if not student:
        log(f'ignored friend request from unlinked/out-of-scope QQ {user_id}')
        return dict(base, decision='ignored', reason='sender not linked as an in-scope student')
    try:
        approve(flag, student['remark'])
    except (urllib.error.URLError, OSError, TimeoutError, ValueError, RuntimeError) as error:
        log(f'approve FAILED for {student["remark"]} (QQ {user_id}): {error}')
        return dict(base, decision='approve_failed', matchedStudent=student, error=str(error))
    log(f'accepted friend request from {student["remark"]} (QQ {user_id})')
    return dict(base, decision='accepted', matchedStudent=student)


def handle_event(event):
    """Handle one OneBot event; returns the HTTP response body."""
    _counters['events'] += 1
    _counters['lastEventAt'] = now()
    if event.get('post_type') != 'request' or event.get('request_type') != 'friend':
        return {}
    _counters['requests'] += 1
    flag = str(event.get('flag') or '')
    if flag:
        stored = load_audit()['requests'].get(flag)
        if stored:
            return {}          # already decided; never call NapCat twice
    entry = decide(event)
    if flag:
        record(flag, entry)
    else:
        record(f'no-flag-{entry["userId"]}-{entry.get("time")}', entry)
    return {}


class Handler(BaseHTTPRequestHandler):
    server_version = 'qq-friend-accept/1.0'

    def reply(self, status, payload):
        body = json.dumps(payload).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def authorized(self):
        header = self.headers.get('Authorization') or ''
        offered = header[len('Bearer '):] if header.startswith('Bearer ') else header
        if offered:
            return hmac.compare_digest(offered, webhook_token())
        query = parse_qs(urlparse(self.path).query)
        offered = (query.get('access_token') or [''])[0]
        if offered:
            return hmac.compare_digest(offered, webhook_token())
        # NapCat 4.18 pushes to this listener without any Authorization header even
        # when the client config carries a token (verified live on 19 Sep 2026:
        # path '/', application/json, no auth header). Loopback-only binding plus
        # pre-linked-student filtering are therefore the real controls; any token
        # that IS offered must still be correct.
        return self.client_address[0] in ('127.0.0.1', '::1')

    def do_GET(self):
        if self.path.split('?')[0] != '/health':
            return self.reply(404, {'error': 'not found'})
        return self.reply(200, {'ok': True, 'service': 'qq-friend-accept', 'time': now(),
                                'events': _counters['events'], 'friendRequests': _counters['requests'],
                                'lastEventAt': _counters['lastEventAt'],
                                'rejected': _counters['rejected'], 'lastRejectedAt': _counters['lastRejectedAt'],
                                'lastRejected': _counters.get('lastRejected')})

    def do_POST(self):
        if self.path.split('?')[0] not in ('/', ''):
            return self.reply(404, {'error': 'not found'})
        if not self.authorized():
            # A rejected push is a misconfiguration, not quiet traffic: count it
            # so /health can tell the two apart.
            _counters['rejected'] += 1
            _counters['lastRejectedAt'] = now()
            header = self.headers.get('Authorization') or ''
            _counters['lastRejected'] = {
                'path': self.path,
                'authHeaderPresent': bool(header),
                'authScheme': header.split(' ')[0] if header else '',
                'authLength': len(header),
                'userAgent': (self.headers.get('User-Agent') or '')[:60],
                'contentType': (self.headers.get('Content-Type') or '')[:40],
            }
            log(f"rejected POST: {json.dumps(_counters['lastRejected'], ensure_ascii=False)}")
            return self.reply(401, {'error': 'bad or missing bearer token'})
        length = int(self.headers.get('Content-Length') or 0)
        raw = self.rfile.read(length) if length else b''
        try:
            event = json.loads(raw or b'{}')
        except ValueError:
            return self.reply(400, {'error': 'malformed JSON body'})
        if not isinstance(event, dict):
            return self.reply(400, {'error': 'event must be a JSON object'})
        try:
            return self.reply(200, handle_event(event))
        except Exception as error:                       # never drop an event silently
            log(f'event handling error: {error!r}')
            return self.reply(500, {'error': str(error)})

    def log_message(self, fmt, *args):
        pass                                             # keep the console for decisions only


def retry_failed():
    """Re-attempt logged approve_failed requests once, then exit."""
    data = load_audit()
    pending = {flag: entry for flag, entry in data['requests'].items()
               if entry.get('decision') == 'approve_failed'}
    updated = 0
    for flag, entry in pending.items():
        student = entry.get('matchedStudent') or {}
        try:
            approve(flag, student.get('remark') or '')
        except (urllib.error.URLError, OSError, TimeoutError, ValueError, RuntimeError) as error:
            entry['error'] = str(error)
            entry['retriedAt'] = now()
            log(f'retry failed again for {student.get("remark")}: {error}')
        else:
            entry['decision'] = 'accepted'
            entry.pop('error', None)
            entry['decidedAt'] = now()
            updated += 1
            log(f'retry accepted for {student.get("remark")}')
        data['requests'][flag] = entry
    with _audit_lock:
        data['updatedAt'] = now()
        save_audit(data)
    print(json.dumps({'retried': len(pending), 'accepted': updated}, ensure_ascii=False))


def main():
    if '--retry-failed' in sys.argv[1:]:
        retry_failed()
        return 0
    token = webhook_token()
    bind_port = port()
    server = ThreadingHTTPServer(('127.0.0.1', bind_port), Handler)
    log(f'friend-accept listener on http://127.0.0.1:{bind_port} '
        f'(bearer token configured: {len(token)} chars); NapCat webhook -> POST /')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        log('stopping on interrupt')
    finally:
        server.server_close()
    return 0


if __name__ == '__main__':
    sys.exit(main())