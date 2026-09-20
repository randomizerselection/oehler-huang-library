"""Run-level lock, preflight checks, and run records for the QQ IC3 automation.

Commands:
  preflight  Environment, state writability, platform schema, and signed-in
             QQ account checks. Exit 0 ok; 4 sign-in required; 5 account
             mismatch; 6 OneBot transport down (start NapCatQQ).
  begin      Acquire state/run.lock and open a run record. Exit 3 when another
             active run holds the lock (skipped overlap, not an error).
  heartbeat  Refresh the lock heartbeat between long review steps.
  end        Close the current run record and release the lock.
  status     Print lock/run state (read-only).

Lock liveness is two-tier, because every lifecycle step (including begin
itself) is a short-lived process and there is no long-lived orchestrator PID:
  - owner PID alive AND heartbeat younger than 6h        -> active (exit 3);
  - owner PID dead/missing AND heartbeat younger than 45 minutes
                                                         -> active (exit 3);
  - otherwise                                            -> stale: the lock is
    renamed to run.lock.stale-<timestamp> and the new run proceeds.
"""
import argparse
import datetime as dt
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.request
import uuid
from pathlib import Path
from fetch import ROOT, CONFIG, TZ, save
import platform_db

LOCK = ROOT / 'state' / 'run.lock'
RUNS = ROOT / 'state' / 'runs'
STALE = dt.timedelta(hours=6)
# Every lifecycle step (begin included) is a short-lived process with no
# long-lived orchestrator PID, so a dead owner PID alone must not make the
# lock reclaimable: an agent-driven run heartbeats between steps, and 45
# minutes comfortably covers one in-progress step while still letting a
# crashed run's lock be reclaimed before the next-but-one 30-minute fire.
DEAD_OWNER_GRACE = dt.timedelta(minutes=45)
AUTH_RE = re.compile(r'auth|sign.?in|login|token|unauthor|401', re.I)
# Connection-refused/unreachable from the OneBot endpoint means NapCatQQ is not
# running: report "transport down" (exit 6), which is distinct from sign-in.
TRANSPORT_RE = re.compile(r'connection refused|unreachable|cannot reach|timed out|timeout|10061|11161', re.I)


class SignInRequired(Exception):
    pass


class TransportDown(Exception):
    pass


def now():
    return dt.datetime.now(TZ)


def emit(payload):
    print(json.dumps(payload, ensure_ascii=True))


def self_identity():
    """Read-only account check through the configured qq-cli. Never retries and
    never runs any other transport command. Returns the signed-in QQ number."""
    proc = subprocess.run([CONFIG['cli'], 'contact', 'user', 'get-self'],
                          capture_output=True, encoding='utf-8', errors='replace', timeout=120)
    output = ((proc.stdout or '') + '\n' + (proc.stderr or '')).strip()
    try:
        payload = json.loads(proc.stdout)
    except ValueError:
        if TRANSPORT_RE.search(output):
            raise TransportDown(output[:300])
        if proc.returncode or AUTH_RE.search(output):
            raise SignInRequired(output[:300])
        raise RuntimeError('QQ transport returned non-JSON output for get-self: ' + output[:300])
    if proc.returncode or payload.get('success') is False:
        text = json.dumps(payload, ensure_ascii=True) + ' ' + output
        if TRANSPORT_RE.search(text):
            raise TransportDown(text[:300])
        if AUTH_RE.search(text):
            raise SignInRequired(text[:300])
        raise RuntimeError('get-self failed: ' + text[:300])
    found = {}
    def visit(node, depth):
        if depth > 6 or 'user' in found:
            return
        if isinstance(node, dict):
            user = node.get('userId') or node.get('user_id')
            if user:
                found.setdefault('user', user)
            for value in node.values():
                visit(value, depth + 1)
        elif isinstance(node, list):
            for value in node:
                visit(value, depth + 1)
    visit(payload, 0)
    if found.get('user'):
        return str(found['user'])
    raise RuntimeError('get-self response lacks userId: ' + json.dumps(payload, ensure_ascii=True)[:300])


def listener_state():
    """'ok' when the friend-request listener answers /health, else 'down'."""
    port = int(CONFIG.get('friendAcceptPort') or 3001)
    request = urllib.request.Request(f'http://127.0.0.1:{port}/health')
    try:
        with urllib.request.urlopen(request, timeout=5) as response:
            body = json.loads(response.read() or b'{}')
        return 'ok' if body.get('ok') else 'down'
    except (urllib.error.URLError, TimeoutError, OSError, ValueError):
        return 'down'


def preflight():
    checks = {'python': {'executable': sys.executable, 'version': sys.version.split()[0]}}
    state_dir = ROOT / 'state'
    if not state_dir.is_dir() or not os.access(state_dir, os.W_OK):
        raise RuntimeError(f'state directory is not writable: {state_dir}')
    checks['stateWritable'] = str(state_dir)
    db_path = Path(CONFIG['platformDatabase'])
    if not db_path.exists():
        raise RuntimeError(f'Platform database not found: {db_path}')
    checks['platformSchemaVersion'] = platform_db.require_schema()
    # Non-fatal: the homework check runs without the friend-request listener, but
    # an outage is worth surfacing because pending friend requests then wait.
    checks['friendAcceptListener'] = listener_state()
    user = self_identity()
    checks['account'] = {'userId': user}
    if user != str(CONFIG.get('expectedUserId') or ''):
        emit({'status': 'error', 'error': 'account mismatch', 'checks': checks,
              'expected': {'userId': CONFIG.get('expectedUserId')}})
        return 5
    emit({'status': 'ok', 'checks': checks})
    return 0


def read_lock():
    try:
        return json.loads(LOCK.read_text(encoding='utf-8'))
    except (OSError, ValueError):
        return None


def pid_alive(pid):
    # os.kill(pid, 0) on Windows calls TerminateProcess and would kill the owner;
    # probe liveness with OpenProcess/GetExitCodeProcess instead.
    if os.name == 'nt':
        import ctypes
        import ctypes.wintypes
        kernel32 = ctypes.windll.kernel32
        handle = kernel32.OpenProcess(0x1000, False, pid)  # PROCESS_QUERY_LIMITED_INFORMATION
        if not handle:
            return False
        try:
            code = ctypes.wintypes.DWORD()
            if not kernel32.GetExitCodeProcess(handle, ctypes.byref(code)):
                return False
            return code.value == 259  # STILL_ACTIVE
        finally:
            kernel32.CloseHandle(handle)
    try:
        os.kill(pid, 0)
    except OSError:
        return False
    return True


def owner_alive(owner):
    if not owner:
        return False
    heartbeat = owner.get('heartbeatAt')
    if not heartbeat:
        return False
    try:
        age = now() - dt.datetime.fromisoformat(heartbeat)
    except ValueError:
        return False
    if age >= STALE:
        return False
    if owner.get('pid') and pid_alive(owner['pid']):
        return True
    # Dead or missing owner PID: the lock still counts as active during the
    # grace window that covers one in-progress lifecycle step.
    return age < DEAD_OWNER_GRACE


def begin():
    owner = read_lock() if LOCK.exists() else None
    stale_note = None
    if LOCK.exists():
        if owner_alive(owner):
            emit({'status': 'skipped', 'reason': 'overlap', 'owner': owner})
            return 3
        stamp = now().strftime('%Y%m%d-%H%M%S')
        stale_path = LOCK.with_name(f'run.lock.stale-{stamp}')
        LOCK.rename(stale_path)
        stale_note = {'previousOwner': owner, 'renamedTo': stale_path.name}
    started = now()
    run_id = 'run-' + started.strftime('%Y%m%d-%H%M%S') + '-' + uuid.uuid4().hex[:8]
    # Each lifecycle step is its own short-lived process, so the orchestrating
    # agent registers its own long-lived PID via QQ_RUN_OWNER_PID; without it
    # the lock owner is this (immediately exiting) process.
    owner_pid = int(os.environ.get('QQ_RUN_OWNER_PID') or os.getpid())
    lock_data = {'runId': run_id, 'pid': owner_pid,
                 'startedAt': started.isoformat(), 'heartbeatAt': started.isoformat()}
    handle = os.open(LOCK, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    try:
        os.write(handle, json.dumps(lock_data, ensure_ascii=False, indent=2).encode('utf-8'))
    finally:
        os.close(handle)
    RUNS.mkdir(parents=True, exist_ok=True)
    record = {'runId': run_id, 'startedAt': started.isoformat(), 'status': 'in-progress'}
    if stale_note:
        record['staleLock'] = stale_note
    save(RUNS / f'{run_id}.json', record)
    emit({'runId': run_id})
    return 0


def heartbeat():
    owner = read_lock() if LOCK.exists() else None
    if not owner:
        emit({'status': 'warning', 'message': 'no run lock present; nothing to heartbeat'})
        return 0
    owner['heartbeatAt'] = now().isoformat()
    save(LOCK, owner)
    emit({'status': 'ok', 'runId': owner.get('runId'), 'heartbeatAt': owner['heartbeatAt']})
    return 0


def end(status, notes):
    owner = read_lock() if LOCK.exists() else None
    if not owner or not owner.get('runId'):
        raise RuntimeError('No active run lock; cannot end a run')
    run_id = owner['runId']
    record_path = RUNS / f'{run_id}.json'
    record = json.loads(record_path.read_text(encoding='utf-8')) if record_path.exists() else {'runId': run_id}
    if notes:
        merged = json.loads(notes)
        if not isinstance(merged, dict):
            raise ValueError('--notes must be a JSON object')
        record.update(merged)
    record['status'] = status
    record['finishedAt'] = now().isoformat()
    save(record_path, record)
    LOCK.unlink()
    emit(record)
    return 0


def status():
    owner = read_lock() if LOCK.exists() else None
    report = {'locked': LOCK.exists(), 'lock': owner, 'ownerAlive': owner_alive(owner) if owner else False}
    if owner and owner.get('runId'):
        record_path = RUNS / f"{owner['runId']}.json"
        if record_path.exists():
            report['run'] = json.loads(record_path.read_text(encoding='utf-8'))
    emit(report)
    return 0


def main():
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest='command', required=True)
    sub.add_parser('preflight')
    sub.add_parser('begin')
    sub.add_parser('heartbeat')
    end_parser = sub.add_parser('end')
    end_parser.add_argument('--status', required=True, choices=['complete', 'incomplete', 'failed', 'skipped'])
    end_parser.add_argument('--notes', help='JSON object merged into the run record')
    sub.add_parser('status')
    args = parser.parse_args()
    try:
        if args.command == 'preflight':
            code = preflight()
        elif args.command == 'begin':
            code = begin()
        elif args.command == 'heartbeat':
            code = heartbeat()
        elif args.command == 'end':
            code = end(args.status, args.notes)
        else:
            code = status()
    except TransportDown:
        emit({'status': 'error', 'error': 'transport down: OneBot endpoint unreachable (start NapCatQQ)'})
        code = 6
    except SignInRequired:
        emit({'status': 'error', 'error': 'sign-in required'})
        code = 4
    except Exception as exc:
        emit({'status': 'error', 'error': str(exc)[:500]})
        code = 1
    sys.exit(code)


if __name__ == '__main__':
    main()
