"""Record a machine transcription of each pending answer as grading evidence.

For every pending message that resolves to a student, use NapCat's QQ OCR
(`chat message ocr-text`) or bounded on-device Windows OCR for each downloaded
evidence file and store it under state/ocr/<messageId>-<n>.txt. The review step
then grades the answer against the assignment mark scheme from that text, and
the decision evidence cites the transcription file, so a mark can be checked
afterwards without re-reading the photo.

QQ's OCR is imperfect on handwriting: the transcription is supporting evidence,
never a replacement for reading the image, and it is stored verbatim (no
correction of the machine's spelling). The primary route uses the logged-in QQ
session; timeout fallback and multi-frame GIF decoding run locally. Provider,
frame coverage and explicit no-text results are retained alongside the transcript.

Usage:
  python ocr_evidence.py                 # every pending message
  python ocr_evidence.py --message-id ID # one message
"""
import argparse
import hashlib
import json
import os
import re
import subprocess
from pathlib import Path
from fetch import ROOT, cli, save

OCR_DIR = ROOT / 'state' / 'ocr'


def media_files(fixture_message):
    """Downloaded evidence files recorded for one pending message by media.py."""
    media_path = ROOT / 'state' / 'media.json'
    if not media_path.exists():
        return []
    entries = json.loads(media_path.read_text(encoding='utf-8'))
    return [entry['path'] for entry in entries if entry.get('messageId') == fixture_message]


def local_transcribe(path):
    if os.name != 'nt':
        raise RuntimeError('On-device Windows OCR is unavailable on this operating system')
    shell = Path(os.environ.get('SystemRoot', 'C:/Windows')) / 'System32/WindowsPowerShell/v1.0/powershell.exe'
    result = subprocess.run([str(shell), '-NoProfile', '-NonInteractive', '-File',
                             str(Path(__file__).with_name('windows_ocr.ps1')), '-ImagePath', str(Path(path).resolve())],
                            capture_output=True, encoding='utf-8-sig', errors='replace', timeout=20)
    if result.returncode:
        raise RuntimeError('Windows OCR failed: ' + result.stderr[-800:])
    response = json.loads(result.stdout)
    if (response.get('provider') != 'windows-ocr' or not isinstance(response.get('text'), str)
            or response.get('allFrames') is not True or not isinstance(response.get('frameCount'), int)
            or response['frameCount'] < 1 or response.get('decoderVersion') != 2):
        raise RuntimeError('Windows OCR returned an invalid result')
    return response


def transcribe(message_id, path, local_only=False):
    # QQ labels downloaded attachments .jpg even when the actual file is a GIF.
    # Use the local multi-frame decoder for animations instead of waiting on QQ's
    # screenshot OCR. This is format routing, not automatic homework rejection.
    with Path(path).open('rb') as image:
        is_gif = image.read(6) in (b'GIF87a', b'GIF89a')
    if local_only or is_gif:
        return local_transcribe(path)
    try:
        response = cli(['chat', 'message', 'ocr-text', '--file-path', str(path)])
        result = response.get('result') if isinstance(response, dict) else None
        if not isinstance(result, dict) or not isinstance(result.get('text'), str):
            raise RuntimeError(f'OCR returned an invalid result for {path}')
        return {**result, 'provider': 'qq-ocr'}
    except (subprocess.TimeoutExpired, RuntimeError) as error:
        # A bounded local fallback is not a retry of the stalled QQ operation.
        # Authentication/account errors and malformed responses still fail closed.
        if not isinstance(error, subprocess.TimeoutExpired) and 'OCR_TIMEOUT' not in str(error):
            raise
        result = local_transcribe(path)
        return {**result, 'fallbackReason': 'QQ OCR timed out; on-device OCR used'}


def run(message_id=None, local_only=False):
    pending = json.loads((ROOT / 'state' / 'pending.json').read_text(encoding='utf-8'))
    media_path = ROOT / 'state' / 'media.json'
    by_message = {}
    for entry in json.loads(media_path.read_text(encoding='utf-8')) if media_path.exists() else []:
        by_message.setdefault(entry.get('messageId'), []).append(entry['path'])
    OCR_DIR.mkdir(parents=True, exist_ok=True)
    written, skipped, cached = [], [], 0
    for message in pending.get('messages', []):
        mid = message['messageId']
        if message_id and mid != message_id:
            continue
        # Resolve exactly as the review does: a candidate whose linked QQ matches the
# sender is decisive, otherwise a single unambiguous name match.
        candidates = message.get('candidates') or []
        linked = [c for c in candidates if c.get('qqId') and c.get('qqId') == message.get('senderId')]
        # One student can sit in several classes, so the same account appears once
        # per class: uniqueness is about the account behind the QQ number.
        accounts = {c.get('accountId') for c in linked}
        if len(accounts) != 1 and len(candidates) != 1:
            skipped.append({'messageId': mid, 'reason': 'sender not uniquely resolved'})
            continue
        paths = by_message.get(mid, [])
        if not paths:
            skipped.append({'messageId': mid, 'reason': 'no downloaded evidence'})
            continue
        for index, path in enumerate(paths):
            # Reuse only successful transcriptions of the exact same bytes.
            # Do not cache errors, missing files, or just a file path/mtime.
            image_bytes = Path(path).read_bytes()
            digest = hashlib.sha256(image_bytes).hexdigest()
            cache = OCR_DIR / 'cache' / (digest + '.json')
            record = json.loads(cache.read_text(encoding='utf-8')) if cache.exists() else {}
            hit = (record.get('version') == 1 and record.get('sha256') == digest
                   and isinstance(record.get('text'), str)
                   and record.get('textSha256') == hashlib.sha256(record['text'].encode()).hexdigest())
            if record.get('provider') == 'windows-ocr' or image_bytes[:6] in (b'GIF87a', b'GIF89a'):
                hit = hit and record.get('allFrames') is True and record.get('decoderVersion') == 2
            if hit:
                result = record
            else:
                result = transcribe(mid, path, local_only=local_only)
            text = result['text']
            if not isinstance(text, str):
                raise RuntimeError('OCR text must be a string')
            if not hit:
                save(cache, {'version': 1, 'sha256': digest, 'text': text,
                             'textSha256': hashlib.sha256(text.encode()).hexdigest(),
                             'provider': result.get('provider', 'qq-ocr'),
                             'fallbackReason': result.get('fallbackReason'),
                             'frameCount': result.get('frameCount'), 'allFrames': result.get('allFrames'),
                             'decoderVersion': result.get('decoderVersion')})
            safe_mid = mid if re.fullmatch(r'[A-Za-z0-9_-]+', mid) else hashlib.sha256(mid.encode()).hexdigest()
            target = OCR_DIR / f'{safe_mid}-{index}.txt'
            if not target.exists() or target.read_text(encoding='utf-8') != text:
                tmp = target.with_suffix('.tmp')
                tmp.write_text(text, encoding='utf-8')
                tmp.replace(target)
            cached += int(hit)
            written.append({'messageId': mid, 'file': str(path), 'sha256': digest,
                            'transcription': str(target), 'cached': hit,
                            'provider': result.get('provider', 'qq-ocr'),
                            'status': 'text-found' if text.strip() else 'no-text-found',
                            'fallbackReason': result.get('fallbackReason'),
                            'frameCount': result.get('frameCount'), 'allFrames': result.get('allFrames'),
                            'decoderVersion': result.get('decoderVersion')})
    report = {'transcribed': len(written) - cached, 'cached': cached, 'skipped': skipped, 'files': written}
    save(ROOT / 'state' / 'ocr.json', report)
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--message-id')
    parser.add_argument('--local-only', action='store_true',
                        help='Maintenance: transcribe locally without retrying a failed QQ OCR call')
    args = parser.parse_args()
    lock = ROOT / 'state/ocr.lock'
    handle = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    try:
        print(json.dumps(run(message_id=args.message_id, local_only=args.local_only), ensure_ascii=True))
    finally:
        os.close(handle)
        lock.unlink()
