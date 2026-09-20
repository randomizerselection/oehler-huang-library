"""Locate private workflow data without embedding credentials in source.

Copied fixture workspaces keep their own config.json. Production registrations
live under .platform-data/homework/runtime.json; old data paths remain valid.
"""
import json
import os
from pathlib import Path

HOME = Path(__file__).resolve().parent
REPOSITORY = HOME.parents[2]
PROFILES = ('dingtalk-submissions', 'dingtalk-s36', 'qq-ic3')


def runtime_root(profile, source=None):
    if profile not in PROFILES:
        raise ValueError('Unknown homework profile')
    if source and (Path(source) / 'config.json').is_file():
        return Path(source)
    registry = Path(os.environ.get('HOMEWORK_REGISTRY',
                    REPOSITORY / '.platform-data/homework/runtime.json'))
    entries = json.loads(registry.read_text(encoding='utf-8-sig'))
    root = Path(entries[profile]['runtimeRoot']).resolve()
    if not (root / 'config.json').is_file():
        raise FileNotFoundError(f'No private config for {profile}: {root}')
    return root


def source_root(profile):
    if profile not in PROFILES:
        raise ValueError('Unknown homework profile')
    return HOME / 'workflows' / profile
