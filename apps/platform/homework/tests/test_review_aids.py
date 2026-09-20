"""Synthetic evidence only: bounded text, safe original media, run-bound cleanup."""
import base64
import json
from pathlib import Path
import tempfile
import time
import unittest
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
from unittest.mock import patch

from review_aids import enrich, MAX_TRANSCRIPT_BYTES
from review_viewer import CHILDREN, document, media_type, start
from runner import Workflow, compact, save

PNG = base64.b64decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a0V8AAAAASUVORK5CYII=')


class ReviewAidsTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.state = Path(self.tmp.name) / 'state'
        (self.state / 'ocr').mkdir(parents=True)
        (self.state / 'media').mkdir()
        self.image = self.state / 'media' / 'answer.png'
        self.image.write_bytes(PNG)
        self.ocr = self.state / 'ocr' / 'm1.txt'
        self.ocr.write_text('Exact original\ntranscription.', encoding='utf-8')
        self.packet = {'batchId': 'b1', 'messages': [
            {'messageId': 'm1', 'conversationId': 'c1', 'media': [str(self.image)], 'ocr': [str(self.ocr)]},
            {'messageId': 'm2', 'conversationId': 'c1', 'media': [], 'ocr': [str(self.ocr)]}]}

    def test_transcriptions_are_exact_deduplicated_and_grouping_does_not_drop_messages(self):
        enrich(self.packet, self.state)
        self.assertEqual(self.packet['reviewGroups'], [{'conversationId': 'c1', 'messageIds': ['m1', 'm2']}])
        self.assertEqual(self.packet['transcriptions'], {str(self.ocr): {
            'included': True, 'text': self.ocr.read_bytes().decode('utf-8')}})

    def test_omission_is_explicit_not_silently_truncated_or_empty(self):
        self.ocr.write_text('x' * (MAX_TRANSCRIPT_BYTES + 1), encoding='utf-8')
        enrich(self.packet, self.state)
        entry = self.packet['transcriptions'][str(self.ocr)]
        self.assertFalse(entry['included'])
        self.assertNotIn('text', entry)
        self.assertEqual(self.packet['messages'][0]['ocr'], [str(self.ocr)])

    def test_total_ocr_budget_and_empty_success(self):
        with patch('review_aids.MAX_TOTAL_BYTES', 1):
            enrich(self.packet, self.state)
        self.assertFalse(self.packet['transcriptions'][str(self.ocr)]['included'])
        self.ocr.write_text('', encoding='utf-8')
        enrich(self.packet, self.state)
        self.assertEqual(self.packet['transcriptions'][str(self.ocr)], {'included': True, 'text': ''})

    def test_outside_paths_and_html_are_not_served_or_inlined(self):
        outside = Path(self.tmp.name) / 'private.txt'
        outside.write_text('SECRET', encoding='utf-8')
        self.packet['messages'][0].update(messageId='<script>BAD</script>', media=[str(outside)], ocr=[str(outside)])
        enrich(self.packet, self.state)
        self.assertFalse(self.packet['transcriptions'][str(outside)]['included'])
        page, files = document(self.packet, self.state, '/token')
        self.assertEqual(files, [])
        self.assertNotIn(b'<script>BAD', page)
        self.assertIn(b'&lt;script&gt;', page)
        self.assertNotIn(b'SECRET', page)
        self.image.write_bytes(b'<html>not an image</html>')
        self.assertIsNone(media_type(self.image))

    def test_gif_with_jpg_extension_preserves_original_bytes(self):
        gif = self.state / 'media' / 'sticker.jpg'
        gif.write_bytes(b'GIF89a' + b'fixture')
        self.assertEqual(media_type(gif), 'image/gif')

    def test_viewer_reuses_one_server_blocks_other_files_and_exits_on_close(self):
        save(self.state / 'run.lock', {'runId': 'run-fixture'})
        save(self.state / 'pending.json', {'batchId': 'b1'})
        save(self.state / 'review-packet.json', self.packet)
        self.addCleanup(lambda: (self.state / 'run.lock').unlink(missing_ok=True))
        info = start(self.state, 'run-fixture')
        child = next(child for child in CHILDREN if child.pid == info['pid'])
        self.assertEqual(start(self.state, 'run-fixture')['url'], info['url'])
        with urlopen(info['url'], timeout=2) as response:
            self.assertIn("default-src 'none'", response.headers['Content-Security-Policy'])
            self.assertIn(b'Original homework evidence', response.read())
        with urlopen(info['url'] + 'media/0', timeout=2) as response:
            self.assertEqual(response.read(), PNG)
        for route in ['../config.json', 'media/99']:
            with self.assertRaises(HTTPError) as error:
                urlopen(info['url'] + route, timeout=2)
            error.exception.close()
        with self.assertRaises(HTTPError) as error:
            urlopen(Request(info['url'], headers={'Host': 'attacker.invalid'}), timeout=2)
        self.assertEqual(error.exception.code, 403)
        error.exception.close()
        (self.state / 'run.lock').unlink()
        # The child checks the lock before serving a request, then exits within 0.5 s.
        with self.assertRaises((HTTPError, URLError, ConnectionError)) as error:
            urlopen(info['url'], timeout=2)
        if isinstance(error.exception, HTTPError):
            error.exception.close()
        child.wait(timeout=3)

    def test_viewer_rejects_wrong_owner_and_changed_batch(self):
        save(self.state / 'run.lock', {'runId': 'other'})
        save(self.state / 'pending.json', {'batchId': 'b1'})
        save(self.state / 'review-packet.json', self.packet)
        with self.assertRaisesRegex(RuntimeError, 'could not start'):
            start(self.state, 'run-fixture')

    def test_compact_results_retain_verification_counts(self):
        self.assertEqual(compact({'commitVerified': True, 'homeworkVerified': 3}),
                         {'commitVerified': True, 'homeworkVerified': 3})
