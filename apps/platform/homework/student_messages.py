"""Deterministic English replies from verified records, with no model calls."""
from functools import lru_cache
import json
from pathlib import Path
import re

CJK = re.compile(r'[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]')

DINGTALK_SIGNATURE = " — Adam, Samuel's automated teaching assistant."


def dingtalk_text(text):
    """Identify new DingTalk drafts before review/persistence, never at transport.

    Keep one line for Windows .cmd launchers. Persisted deliveries retain their
    original text and keys; QQ templates do not use this identity.
    """
    return text if text.endswith(DINGTALK_SIGNATURE) else text + DINGTALK_SIGNATURE


def greeting(student):
    name = (student.get('english') or '').strip()
    return f'Hi {name},' if re.fullmatch(r"[A-Za-z][A-Za-z .'-]{0,49}", name) else 'Hi,'


@lru_cache(maxsize=8)
def _catalog(path, modified, size):
    return json.loads(Path(path).read_text(encoding='utf-8-sig'))


def assignment_meta(root, header):
    path = Path(root) / 'assignments.json'
    stat = path.stat()
    matches = [a for a in _catalog(str(path), stat.st_mtime_ns, stat.st_size) if a['header'] == header]
    if len(matches) > 1:
        raise ValueError('Ambiguous assignment catalog header')
    return matches[0] if matches else {}


def assignment_label(meta):
    # Only use teacher-maintained labels. Do not translate names or infer topics.
    label = (meta.get('displayName') or '').strip()
    header = meta.get('header') or ''
    topic = (meta.get('title') or (header.split('\n', 1)[1] if '\n' in header else '')).strip()
    parts = []
    for value in (label, topic):
        value = ' '.join(value.split())
        if value and not CJK.search(value) and value not in parts:
            parts.append(value)
    return ' — '.join(parts) or None


def receipt_text(item, student, label):
    target = label or 'your assignment'
    completion = item.get('completionKind')
    if completion == 'sentences':
        return f"{greeting(student)} thanks for rewriting your answer to {target} in full sentences. Your submission is now complete."
    if completion == 'working':
        return f"{greeting(student)} thanks for adding your working for {target}. Your submission is now complete."
    return f"{greeting(student)} thanks for sending {target}. I've marked it as submitted."


def working_text(item, student, label):
    target = label or 'your assignment'
    if item.get('responseFormat') == 'list_only':
        return f'{greeting(student)} I received your points for {target}. Please write them in full sentences and send a photo so I can record a complete submission.'
    return f'{greeting(student)} I received your answer for {target}. Please send a clear photo showing your working so I can record a complete submission.'


def name_text(english_name):
    return f"{greeting({'english': english_name})} thanks for letting me know. I've saved your preferred English name."


def feedback_text(item, student, label):
    # Windows .cmd transport launchers require a single-line content argument.
    remark = ' '.join(item['feedback'].split())
    return (f"{greeting(student)} {label or 'Your essay'}: {int(item['score'])}/{int(item['scoreMax'])}. "
            f"Next step: {remark} The model answer follows.")
