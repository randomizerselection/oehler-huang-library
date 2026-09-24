"""Install reversible legacy-path launchers; never copy/reset homework state."""
import argparse
import datetime as dt
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys
import uuid

from runtime import HOME, PROFILES, REPOSITORY, runtime_root, source_root
from runner import save, read, digest


def wrapper(source):
    return ('"""Compatibility launcher. Maintained in oehler-huang-platform."""\n'
            'import sys as _sys\nfrom pathlib import Path as _Path\n'
            f'_source = _Path({str(source)!r})\n'
            '_sys.path.insert(0, str(_source.parent))\n'
            '_sys.path.insert(0, str(_source.parents[2]))\n'
            '__file__ = str(_source)\n'
            'exec(compile(_source.read_text(encoding="utf-8"), str(_source), "exec"), globals())\n')


def instructions(profile):
    return (f'# {profile}: platform-owned homework workflow\n\n'
            'The implementation and current operating instructions have moved to\n'
            f'`{HOME / "README.md"}` and `{HOME / "REVIEW.md"}`.\n'
            'Read those two concise files for regular checks. The platform runner\n'
            'replaces the old long manual lifecycle; do not run both in one check.\n\n'
            f'Start with `python "{HOME / "runner.py"}" {profile} collect`.\n'
            'Read the returned packet, inspect the actual evidence, then follow\n'
            'prepare → inspect → finish using that run ID and exact plan digest.\n'
            'An empty complete fetch can finish without a homework plan.\n\n'
            'Existing config.json, assignments.json, state/, attachments and CLI\n'
            'launchers remain authoritative in this directory. Never copy/reset\n'
            'delivery ledgers or switch account/profile/model/class scope. The\n'
            'existing Python filenames are compatibility launchers. Scheduled\n'
            'checks must not edit source, install dependencies or self-repair.\n'
            'Keep regular checks free of reminders/campaigns and surface failures.\n'
            + (f'\nFor explicit S3.6 absence questions with lesson PDFs, use the existing\n'
               f'`{HOME / "ABSENCE_FOLLOWUPS.md"}` fast path. Do not port the module,\n'
               'run homework collection/tests, or build a temporary retry driver.\n'
               if profile == 'dingtalk-s36' else ''))


def live_workers(roots):
    if os.name != 'nt':
        raise RuntimeError('Live compatibility installation currently requires Windows process checks')
    result = subprocess.run(['powershell.exe', '-NoProfile', '-Command',
        "Get-CimInstance Win32_Process -Filter \"Name='python.exe'\" | Select-Object ProcessId,CommandLine | ConvertTo-Json -Compress"],
        capture_output=True, encoding='utf-8', errors='replace', timeout=30, check=True)
    rows = json.loads(result.stdout or '[]')
    if isinstance(rows, dict):
        rows = [rows]
    found = []
    for row in rows:
        command = (row.get('CommandLine') or '').replace('\\', '/').lower()
        if row['ProcessId'] == os.getpid() or 'friend_accept_server.py' in command:
            continue
        if any(root.as_posix().lower() in command for root in roots):
            found.append(row['ProcessId'])
    return found


def changes():
    result = []
    for profile in PROFILES:
        root = runtime_root(profile)
        for source in source_root(profile).glob('*.py'):
            if source.name.startswith('test_'):
                continue
            target = root / source.name
            if target.exists():
                result.append((target, wrapper(source)))
        test_runner = source_root(profile) / 'tests/run_tests.py'
        if test_runner.exists() and (root / 'tests/run_tests.py').exists():
            result.append((root / 'tests/run_tests.py', wrapper(test_runner)))
        result.append((root / 'README.md', instructions(profile)))
        if (root / 'REGULAR_CHECK_PROMPT.md').exists():
            result.append((root / 'REGULAR_CHECK_PROMPT.md', instructions(profile)))
    return [(path, text) for path, text in result
            if not path.exists() or path.read_text(encoding='utf-8') != text]


def install(apply=False):
    roots = [runtime_root(profile) for profile in PROFILES]
    locks = [str(path) for root in roots for path in (root / 'state').glob('*.lock')]
    workers = live_workers(roots)
    proposed = changes()
    if locks or workers:
        raise RuntimeError(f'Workflows are busy; locks={locks}, workerPids={workers}')
    if not apply:
        return {'status': 'ready', 'files': len(proposed), 'runtimeRoots': [str(p) for p in roots]}
    held = []
    manifest = None
    try:
        # Existing Kimi schedulers recognize this lease during the short cutover.
        for root in roots:
            path = root / 'state/run.lock'
            with path.open('x', encoding='utf-8') as stream:
                json.dump({'runId': 'platform-migration', 'pid': os.getpid(),
                           'heartbeatAt': dt.datetime.now(dt.timezone.utc).isoformat()}, stream)
            held.append(path)
        backup = REPOSITORY / '.platform-data/homework/migrations' / uuid.uuid4().hex
        manifest = backup / 'manifest.json'
        entries = []
        for index, (path, content) in enumerate(proposed):
            original = backup / f'{index:03d}-{path.name}'
            original.parent.mkdir(parents=True, exist_ok=True)
            old = path.read_bytes() if path.exists() else None
            if old is not None:
                original.write_bytes(old)
            entries.append({'path': str(path), 'backup': str(original) if old is not None else None,
                            'before': digest(path), 'after': hashlib.sha256(content.encode('utf-8')).hexdigest()})
        save(manifest, {'status': 'prepared', 'entries': entries})
        for (path, content), entry in zip(proposed, entries):
            if digest(path) != entry['before']:
                raise RuntimeError(f'File changed during migration: {path}')
            temporary = path.with_name(path.name + '.platform-migration.tmp')
            temporary.write_bytes(content.encode('utf-8'))
            temporary.replace(path)
        save(manifest, {'status': 'installed', 'entries': entries})
        return {'status': 'installed', 'files': len(entries), 'manifest': str(manifest)}
    except Exception:
        if manifest and manifest.exists():
            rollback(manifest, check_busy=False, partial=True)
        raise
    finally:
        for path in held:
            if read(path, {}).get('runId') == 'platform-migration':
                path.unlink()


def rollback(manifest, check_busy=True, partial=False):
    document = read(Path(manifest))
    roots = [runtime_root(profile) for profile in PROFILES]
    if check_busy and (live_workers(roots) or any(list((r / 'state').glob('*.lock')) for r in roots)):
        raise RuntimeError('Workflows are busy; refusing rollback')
    if check_busy:
        held = []
        try:
            for root in roots:
                path = root / 'state/run.lock'
                with path.open('x', encoding='utf-8') as stream:
                    json.dump({'runId': 'platform-rollback', 'pid': os.getpid(),
                               'heartbeatAt': dt.datetime.now(dt.timezone.utc).isoformat()}, stream)
                held.append(path)
            return rollback(manifest, check_busy=False, partial=partial)
        finally:
            for path in held:
                if read(path, {}).get('runId') == 'platform-rollback':
                    path.unlink()
    selected = []
    for entry in document['entries']:
        path = Path(entry['path']).resolve()
        if not any(path.is_relative_to(root.resolve()) for root in roots):
            raise ValueError('Rollback target is outside registered runtime roots')
        actual = digest(path)
        if partial and actual == entry['before']:
            continue
        if actual != entry['after']:
            raise RuntimeError(f'Intervening edit; refusing to overwrite {path}')
        backup = Path(entry['backup']) if entry['backup'] else None
        if backup and digest(backup) != entry['before']:
            raise ValueError('Backup digest mismatch')
        selected.append((path, backup))
    for path, backup in selected:
        if backup:
            temporary = path.with_name(path.name + '.platform-rollback.tmp')
            temporary.write_bytes(backup.read_bytes())
            temporary.replace(path)
        else:
            path.unlink()
    save(Path(manifest), {**document, 'status': 'rolled-back'})
    return {'status': 'rolled-back', 'files': len(selected)}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--check', action='store_true')
    group.add_argument('--apply', action='store_true')
    group.add_argument('--rollback', type=Path)
    args = parser.parse_args()
    try:
        result = rollback(args.rollback) if args.rollback else install(args.apply)
        print(json.dumps(result))
    except Exception as error:
        print(json.dumps({'status': 'failed', 'error': str(error)}))
        sys.exit(1)
