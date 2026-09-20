"""Local review aids: exact, bounded OCR text and lossless conversation grouping.

These aids never classify evidence, resolve an identity, or make a decision.
"""
from pathlib import Path

MAX_TRANSCRIPT_BYTES = 24_000
MAX_TOTAL_BYTES = 96_000


def confined_file(path, directory):
    candidate = Path(path).resolve()
    if not candidate.is_relative_to(Path(directory).resolve()) or not candidate.is_file():
        raise ValueError('Evidence path is missing or outside its private evidence directory')
    return candidate


def enrich(packet, state):
    groups, transcripts = {}, {}
    remaining = MAX_TOTAL_BYTES
    for message in packet['messages']:
        cid = message.get('conversationId')
        groups.setdefault(cid, []).append(message['messageId'])
        for raw in message.get('ocr', []):
            if raw in transcripts:
                continue
            try:
                path = confined_file(raw, state / 'ocr')
                size = path.stat().st_size
                if size > min(MAX_TRANSCRIPT_BYTES, remaining):
                    transcripts[raw] = {'included': False, 'reason': 'size-limit; read linked file'}
                    continue
                data = path.read_bytes()
                if len(data) > min(MAX_TRANSCRIPT_BYTES, remaining):
                    raise ValueError('Transcription changed while reading')
                transcripts[raw] = {'included': True, 'text': data.decode('utf-8-sig')}
                remaining -= len(data)
            except (OSError, ValueError, UnicodeError):
                transcripts[raw] = {'included': False, 'reason': 'unavailable; inspect evidence and report'}
    packet['reviewGroups'] = [{'conversationId': cid, 'messageIds': mids} for cid, mids in groups.items()]
    packet['transcriptions'] = transcripts
    packet['reviewGuide'] = (
        'Review each conversation group together. Included transcriptions are exact cached file text; '
        'cite their paths without rereading them. Inspect every relevant original image; OCR is not image inspection. '
        'Use an image tool first; otherwise use the maintained runner viewer action once for this run. '
        'Write one batch of decisions after review. No inferred identity, assignment or automatic ignores.')

