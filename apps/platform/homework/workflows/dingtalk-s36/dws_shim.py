"""Translate the Codex DingTalk CLI dialect used by the automation scripts
into the Kimi npm dws CLI dialect (Economics 5 org sign-in).

Mappings:
- drop `--profile <value>` (npm dws has no profile flag; the Kimi sign-in is fixed)
- `contact user search --query X`      -> `--keyword X`
- `chat message send --content X`      -> `--text X`
- `chat message send --idempotency-key K` -> `--uuid K`
- drop `--ai-tag=true` (npm dws has no AI-tag flag)
- always append `--format json`
Everything else passes through unchanged (including `--yes`).
"""
import os
import subprocess
import sys

# Callers (fetch.cli, run_guard.self_identity) decode our stdout as UTF-8, but a
# piped stdout on Windows defaults to the locale codepage (GBK here), corrupting
# CJK message content. Pin UTF-8 output regardless of console codepage.
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

# S36_DWS overrides the CLI path for tests; production default is unchanged.
DWS = os.environ.get('S36_DWS') or 'C:/Users/oehle/AppData/Roaming/kimi-desktop/daimon-share/daimon/npm-global/dws.cmd'


def translate(argv):
    args = list(argv)
    while '--profile' in args:
        i = args.index('--profile')
        del args[i:i + 2]
    if args[:3] == ['contact', 'user', 'search']:
        args = ['--keyword' if a == '--query' else a for a in args]
    if args[:3] == ['chat', 'message', 'send']:
        args = [
            '--text' if a == '--content'
            else '--uuid' if a == '--idempotency-key'
            else a
            for a in args
            if not a.startswith('--ai-tag')
        ]
    args += ['--format', 'json']
    return args


def strip_nonjson_prefix(stdout):
    """Some dws commands (e.g. download-media) print progress lines before the
    JSON envelope even with --format json. Drop everything before the first
    line that opens a JSON value so callers can parse stdout directly."""
    lines = (stdout or '').splitlines(keepends=True)
    for i, line in enumerate(lines):
        stripped = line.lstrip()
        if stripped.startswith('{') or stripped.startswith('['):
            return ''.join(lines[i:])
    return stdout or ''


def main():
    args = translate(sys.argv[1:])
    proc = subprocess.run([DWS, *args], capture_output=True, encoding='utf-8', errors='replace', timeout=240)
    sys.stdout.write(strip_nonjson_prefix(proc.stdout))
    sys.stderr.write(proc.stderr or '')
    sys.exit(proc.returncode)


if __name__ == '__main__':
    main()
