"""Regression tests for smaller context and bounded, complete read-only scans."""
import importlib.util
import json
from pathlib import Path
import shutil
import tempfile
import threading
import time
import unittest
from unittest.mock import patch

from runner import Workflow, context_message, control_response, read, save
import student_messages as replies

HOME = Path(__file__).resolve().parents[1]


class PacketTests(unittest.TestCase):
    def test_text_aliases_are_lossless_and_differing_text_is_retained(self):
        text = 'An actual long student answer. ' * 8
        row = {'messageId': 'm', 'openMessageId': 'm', 'content': text, 'text': text}
        pending = {'m': {'text': text}}
        small = context_message(row, pending)
        self.assertEqual(small['textFromPendingMessageId'], 'm')
        self.assertEqual(pending[small['textFromPendingMessageId']]['text'], text)
        self.assertNotIn('content', small)
        row['text'] = 'A different edited answer'
        self.assertEqual(context_message(row, pending)['text'], row['text'])
        self.assertEqual(context_message({'content': 'Hi', 'text': 'Hi'}), {'content': 'Hi'})

    def test_delta_keeps_changed_closures_and_preserves_full_personal_history(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            workflow = Workflow('qq-ic3', root, root)
            save(root / 'state/pending.json', {'batchId': 'b1', 'messages': []})
            save(root / 'state/latest-response.json', {'complete': True})
            save(root / 'assignments.json', [])
            history = {'old': {'conversationId': 'c0', 'messageId': 'm0', 'status': 'open'}}
            save(root / 'state/personal-attention.json', {'items': history})
            original = (root / 'state/personal-attention.json').read_bytes()
            changed = {'conversationId': 'c1', 'messageId': 'm1', 'status': 'closed'}
            workflow.packet({'new': [], 'changed': [changed], 'openCount': 1})
            packet = read(root / 'state/review-packet.json')
            self.assertEqual(list(packet['personalRequests'].values()), [changed])
            self.assertEqual(packet['personalSummary']['openCount'], 1)
            self.assertEqual((root / 'state/personal-attention.json').read_bytes(), original)
            workflow.packet()  # same-batch recovery keeps the exact delta
            self.assertEqual(read(root / 'state/review-packet.json')['personalRequests'], packet['personalRequests'])
            save(root / 'state/pending.json', {'batchId': 'b2', 'messages': []})
            workflow.packet()  # a stale delta never hides the fallback history
            self.assertEqual(read(root / 'state/review-packet.json')['personalRequests'], history)

    def test_smaller_response_retains_errors_timings_and_exact_inspection(self):
        result = {'runId': 'r', 'status': 'attention', 'preparedInputs': {'private': 'hash'},
                  'remainingMessageIds': ['pending'], 'stages': [
                      {'script': 'receipts.py', 'seconds': 2, 'summary': {'awaitingConfirmation': 1},
                       'attention': True, 'returncode': 0, 'log': 'private-log'}]}
        small = control_response(result, 'run-record')
        self.assertEqual(small['remainingMessageIds'], ['pending'])
        self.assertEqual(small['stages'][0]['log'], 'private-log')
        self.assertEqual(small['stages'][0]['seconds'], 2)
        self.assertNotIn('preparedInputs', small)
        plan = {'runId': 'r', 'planSha256': 'hash', 'plan': {'homeworkWrites': [result]}}
        self.assertEqual(control_response(plan), plan)


class HistoryTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        root = Path(self.temp.name)
        shutil.copyfile(HOME / 'workflows/qq-ic3/qq_cli.py', root / 'qq_cli.py')
        save(root / 'config.json', {})
        spec = importlib.util.spec_from_file_location('isolated_qq_history', root / 'qq_cli.py')
        self.module = importlib.util.module_from_spec(spec)
        with patch.dict('os.environ', {'QQ_CONFIG_PATH': str(root / 'config.json')}):
            spec.loader.exec_module(self.module)

    def test_read_concurrency_is_bounded_and_order_and_resume_are_preserved(self):
        contacts = [{'userId': str(i)} for i in range(1, 8)]
        lock = threading.Lock()
        active = peak = 0
        calls = []
        def api(action, payload):
            nonlocal active, peak
            self.assertEqual(action, 'get_friend_msg_history')
            with lock:
                active += 1
                peak = max(active, peak)
                calls.append(payload)
            time.sleep(0.015 * (4 - payload['user_id'] % 3))
            with lock:
                active -= 1
            return {'messages': [payload['user_id']]}
        with patch.object(self.module, 'call_api', api):
            result = list(self.module.history_pages(contacts, 1, 321, 100))
        self.assertEqual([messages[0] for _, messages in result], list(range(2, 8)))
        self.assertGreater(peak, 1)
        self.assertLessEqual(peak, 3)
        self.assertEqual([c['user_id'] for c in calls if c.get('message_seq') == 321], [2])

    def test_any_prefetch_error_fails_the_page_without_emitting_partial_success(self):
        def api(action, payload):
            if payload['user_id'] == 2:
                raise self.module.TransportError('fixture failure')
            return {'messages': []}
        with patch.object(self.module, 'call_api', api):
            pages = self.module.history_pages([{'userId': str(i)} for i in range(1, 4)], 0, 0, 100)
            with self.assertRaises(self.module.TransportError):
                next(pages)

    def test_ocr_socket_timeout_is_identifiable_and_bounded(self):
        self.module.CONFIG['onebotHttp'] = 'http://127.0.0.1:1'
        with patch.object(self.module.urllib.request, 'urlopen', side_effect=TimeoutError('fixture')) as request:
            with self.assertRaisesRegex(self.module.TransportError, 'OCR_TIMEOUT'):
                self.module.call_api('ocr_image', {'image': 'fixture'}, timeout=25)
        self.assertEqual(request.call_args.kwargs['timeout'], 25)


class MessageTests(unittest.TestCase):
    def test_personalization_uses_verified_name_and_catalog_topic_with_safe_fallback(self):
        meta = {'displayName': 'Homework 2', 'header': '18 Sep 2026\nDeflationary gap (Q18)'}
        label = replies.assignment_label(meta)
        self.assertEqual(label, 'Homework 2 — Deflationary gap (Q18)')
        self.assertEqual(replies.greeting({'english': 'Emma'}), 'Hi Emma,')
        self.assertEqual(replies.greeting({'english': '张梦'}), 'Hi,')
        self.assertIsNone(replies.assignment_label({'displayName': '作业'}))

    def test_completion_acknowledges_the_specific_missing_evidence(self):
        student = {'english': 'Emma'}
        text = replies.receipt_text({'completionKind': 'working'}, student, 'Homework 2')
        self.assertIn('thanks for adding your working for Homework 2', text)
        text = replies.receipt_text({'completionKind': 'sentences'}, student, 'Homework 1')
        self.assertIn('rewriting your answer to Homework 1 in full sentences', text)

    def test_catalog_cache_invalidates_on_change_and_rejects_duplicate_headers(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            save(root / 'assignments.json', [{'header': 'h', 'displayName': 'Old'}])
            self.assertEqual(replies.assignment_meta(root, 'h')['displayName'], 'Old')
            save(root / 'assignments.json', [{'header': 'h', 'displayName': 'New name'}])
            self.assertEqual(replies.assignment_meta(root, 'h')['displayName'], 'New name')
            save(root / 'assignments.json', [{'header': 'h'}, {'header': 'h'}])
            with self.assertRaises(ValueError):
                replies.assignment_meta(root, 'h')
