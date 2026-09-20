"""Scenario group 3: fetch pagination integrity and batch identity."""
import json
import unittest

from fixtures import (build_workspace, conversation, empty_pages, load_state,
                      run_script, save_state, wire_message)


def multi_page_scenario():
    page0 = {'cursor': '0', 'hasMore': True, 'nextCursor': 'c1', 'conversations': [
        conversation('conv-emma', [
            wire_message('m1', 'QQ_EMMA', '2026-09-18 08:00:00'),
            wire_message('m2', 'QQ_EMMA', '2026-09-18 08:00:00'),  # timestamp tie
        ]),
        conversation('conv-leo', [wire_message('m3', 'QQ_LEO', '2026-09-18 08:01:00')],
                     title='李雷'),
    ]}
    page1 = {'cursor': 'c1', 'hasMore': False, 'conversations': [
        conversation('conv-emma', [
            wire_message('m2', 'QQ_EMMA', '2026-09-18 08:00:00'),  # duplicate across pages
            wire_message('m4', 'QQ_EMMA', '2026-09-18 08:02:00'),
        ]),
        conversation('conv-group', [wire_message('m5', 'QQ_EMMA', '2026-09-18 08:03:00')],
                     title='a group', single_chat=False),
    ]}
    return {'pages': [page0, page1]}


class FetchTests(unittest.TestCase):
    def test_multi_page_dedup_and_timestamp_ties(self):
        fixture = build_workspace(self, multi_page_scenario())
        result = run_script(fixture, 'fetch.py', extra_env={'QQ_RUN_ID': 'run-test-1'})
        self.assertEqual(result.returncode, 0, result.stderr)
        batch = load_state(fixture, 'pending.json')
        mids = [m['messageId'] for m in batch['messages']]
        self.assertEqual(sorted(mids), ['m1', 'm2', 'm3', 'm4'])
        self.assertEqual(len(mids), len(set(mids)))
        self.assertTrue(batch['batchId'])
        self.assertEqual(batch['runId'], 'run-test-1')
        # The group-chat message was not pended.
        self.assertNotIn('m5', mids)
        # Fetch never writes or advances the ledger watermark.
        self.assertFalse((fixture.state / 'ledger.json').exists())
        # Linked senders resolved without contact search.
        self.assertTrue((fixture.state / 'roster.json').exists())
        self.assertTrue((fixture.state / 'latest-response.json').exists())
        self.assertTrue((fixture.state / 'personal-replies.json').exists())

    def test_unresolved_evidence_survives_beyond_overlap(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        save_state(fixture, 'pending.json', {'batchId': 'old', 'messages': [
            {'messageId': 'old-pending', 'time': '2026-09-01 08:00:00', 'text': 'unresolved evidence'},
            {'messageId': 'old-done', 'time': '2026-09-01 08:01:00', 'text': 'already reviewed'}]})
        save_state(fixture, 'ledger.json', {'processed': {'old-done#assignment': {'messageId': 'old-done'}},
                                          'checkedThrough': '2026-09-18 00:00:00'})
        result = run_script(fixture, 'fetch.py')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual([m['messageId'] for m in load_state(fixture, 'pending.json')['messages']], ['old-pending'])

    def test_batch_id_changes_on_every_fetch(self):
        fixture = build_workspace(self, {'pages': empty_pages()})
        self.assertEqual(run_script(fixture, 'fetch.py').returncode, 0)
        first = load_state(fixture, 'pending.json')['batchId']
        self.assertEqual(run_script(fixture, 'fetch.py').returncode, 0)
        second = load_state(fixture, 'pending.json')['batchId']
        self.assertNotEqual(first, second)
        self.assertIsNone(load_state(fixture, 'pending.json')['runId'])

    def test_later_page_failure_keeps_previous_pending_and_watermark(self):
        scenario = multi_page_scenario()
        scenario['pages'][1] = {'cursor': 'c1', 'error': 'page fetch exploded'}
        fixture = build_workspace(self, scenario)
        save_state(fixture, 'pending.json', {'batchId': 'previous', 'messages': [], 'end': 'earlier'})
        save_state(fixture, 'ledger.json', {'processed': {}, 'checkedThrough': '2026-09-17 00:00:00'})
        before_ledger = (fixture.state / 'ledger.json').read_bytes()
        result = run_script(fixture, 'fetch.py')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('page fetch exploded', result.stderr + result.stdout)
        self.assertEqual(load_state(fixture, 'pending.json')['batchId'], 'previous')
        self.assertEqual((fixture.state / 'ledger.json').read_bytes(), before_ledger)
        self.assertFalse((fixture.state / 'latest-response.json').exists())

    def test_stalled_cursor_is_an_error(self):
        fixture = build_workspace(self, {'pages': [
            {'cursor': '0', 'conversations': [], 'hasMore': True, 'nextCursor': '0'}]})
        result = run_script(fixture, 'fetch.py')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('stalled', result.stderr + result.stdout)

    def test_more_than_fifty_pages_is_an_error(self):
        fixture = build_workspace(self, {'pages': [
            {'repeat': 60, 'cursorPrefix': 'r', 'conversations': [], 'hasMore': True}]})
        result = run_script(fixture, 'fetch.py')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('50 pages', result.stderr + result.stdout)


class FetchContactSearchToleranceTests(unittest.TestCase):
    def test_failing_contact_search_leaves_message_unresolved_not_aborted(self):
        page = {'cursor': '0', 'hasMore': False, 'conversations': [
            conversation('conv-emoji', [wire_message('m-emoji', 'QQ_UNKNOWN',
                                                     '2026-09-18 09:00:00', content='[图片消息] photo',
                                                     sender='jellyfish nickname')],
                         title='jellyfish nickname'),
            conversation('conv-emma', [wire_message('m-emma', 'QQ_EMMA',
                                                    '2026-09-18 09:01:00', content='homework 作业')]),
        ]}
        fixture = build_workspace(self, {'pages': [page],
                                         'search': {'jellyfish nickname': {'error': 'business error: code system_error'}}})
        result = run_script(fixture, 'fetch.py')
        self.assertEqual(result.returncode, 0, result.stderr)
        batch = load_state(fixture, 'pending.json')
        by_mid = {m['messageId']: m for m in batch['messages']}
        self.assertIn('m-emoji', by_mid)
        self.assertEqual(by_mid['m-emoji']['candidates'], [])
        self.assertIn('contactSearchError', by_mid['m-emoji'])
        self.assertIn('m-emma', by_mid)

    def test_failing_contact_search_skips_non_homework_message(self):
        page = {'cursor': '0', 'hasMore': False, 'conversations': [
            conversation('conv-emoji', [wire_message('m-emoji', 'QQ_UNKNOWN',
                                                     '2026-09-18 09:00:00', content='hello',
                                                     sender='jellyfish nickname')],
                         title='jellyfish nickname'),
        ]}
        fixture = build_workspace(self, {'pages': [page],
                                         'search': {'jellyfish nickname': {'error': 'business error: code system_error'}}})
        result = run_script(fixture, 'fetch.py')
        self.assertEqual(result.returncode, 0, result.stderr)
        batch = load_state(fixture, 'pending.json')
        self.assertEqual(batch['messages'], [])


if __name__ == '__main__':
    unittest.main()
