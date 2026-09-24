"""Reminder-campaign tests: review gate, integrity, idempotency, suppression."""
import hashlib
import json
import sqlite3
import unittest

import fixtures
from fixtures import (EMMA, HEADER, LEO, WENDY, build_workspace, calls_for,
                      conversation, empty_pages, insert_homework, load_state,
                      read_log, run_script, set_scenario, wire_message)


class ReminderCampaignTests(unittest.TestCase):
    def setUp(self):
        self.attachment = None
        self.fixture = build_workspace(self, {'pages': empty_pages()})
        self.attachment = self.fixture.tmp / 'q19.png'
        self.attachment.write_bytes(b'\x89PNG\r\n\x1a\nfixture-question-image')

    def build(self, *extra):
        return run_script(self.fixture, 'reminders.py', '--build',
                          '--assignment', HEADER, '--attachment', str(self.attachment), *extra)

    def authorize(self):
        return run_script(self.fixture, 'reminders.py', '--authorize')

    def upload(self):
        return run_script(self.fixture, 'reminders.py', '--upload')

    def send(self):
        return run_script(self.fixture, 'reminders.py', '--send')

    def plan(self):
        return load_state(self.fixture, 'reminder-plan.json')

    def deliveries(self):
        return load_state(self.fixture, 'reminder-deliveries.json')

    def ready_plan(self):
        self.build()
        self.authorize()
        self.upload()

    def unlink_leo(self):
        connection = sqlite3.connect(self.fixture.db)
        connection.execute('DELETE FROM student_integrations WHERE account_id=?', (LEO['accountId'],))
        connection.commit()
        connection.close()

    # -- build -----------------------------------------------------------
    def test_build_selects_missing_linked_students_and_neutral_greeting(self):
        result = self.build()
        self.assertEqual(result.returncode, 0, result.stderr)
        plan = self.plan()
        self.assertEqual(plan['status'], 'draft')
        self.assertEqual([r['student']['key'] for r in plan['recipients']],
                         [EMMA['key'], LEO['key']])
        self.assertEqual(plan['recipients'][0]['recipientId'], EMMA['dingtalkId'])
        self.assertEqual(plan['recipients'][0]['message'],
                         "Hi Emma, I don't have your Homework 1 yet - it was due on 17 September. Please send a photo of your answer with your working. The question is attached. — Adam, Samuel's automated teaching assistant.")
        self.assertTrue(plan['recipients'][1]['message'].startswith('Hi, I don'))
        self.assertEqual(plan['attachmentSha256'],
                         hashlib.sha256(self.attachment.read_bytes()).hexdigest())
        self.assertEqual(plan['unreachable'], [])
        self.assertNotIn(WENDY['key'], json.dumps(plan))

    def test_build_lists_students_without_a_verified_link_as_unreachable(self):
        self.unlink_leo()
        self.build()
        plan = self.plan()
        self.assertEqual([r['student']['key'] for r in plan['recipients']], [EMMA['key']])
        self.assertEqual([u['student']['key'] for u in plan['unreachable']], [LEO['key']])
        self.assertIn('DingTalk identity', plan['unreachable'][0]['reason'])

    # -- org-directory resolution ----------------------------------------
    def test_resolve_contacts_adds_unique_directory_match(self):
        self.unlink_leo()
        set_scenario(self.fixture, {'pages': empty_pages(),
                                    'search': {'李雷': [{'name': '李雷', 'openDingTalkId': 'DING_LEO_DIR'}]}})
        result = self.build('--resolve-contacts')
        self.assertEqual(result.returncode, 0, result.stderr)
        plan = self.plan()
        self.assertTrue(plan['resolvedContacts'])
        self.assertEqual([r['student']['key'] for r in plan['recipients']], [EMMA['key'], LEO['key']])
        self.assertEqual(plan['recipients'][1]['recipientId'], 'DING_LEO_DIR')
        self.assertEqual(plan['recipients'][1]['identityEvidence'], 'contact-search')
        self.assertEqual(plan['recipients'][0]['identityEvidence'], 'platform-link')

    def test_resolve_contacts_rejects_ambiguous_or_conflicting_matches(self):
        self.unlink_leo()
        set_scenario(self.fixture, {'pages': empty_pages(), 'search': {'李雷': [
            {'name': '李雷', 'openDingTalkId': 'DING_A'}, {'name': '李雷', 'openDingTalkId': 'DING_B'}]}})
        self.build('--resolve-contacts')
        plan = self.plan()
        self.assertEqual([r['student']['key'] for r in plan['recipients']], [EMMA['key']])
        self.assertIn('not unique', plan['unreachable'][0]['reason'])
        set_scenario(self.fixture, {'pages': empty_pages(),
                                    'search': {'李雷': [{'name': '李雷', 'openDingTalkId': EMMA['dingtalkId']}]}})
        self.build('--resolve-contacts')
        plan = self.plan()
        self.assertEqual([r['student']['key'] for r in plan['recipients']], [EMMA['key']])
        self.assertIn('already linked', plan['unreachable'][0]['reason'])

    def test_resolve_contacts_never_uses_a_directory_name_without_exact_match(self):
        self.unlink_leo()
        set_scenario(self.fixture, {'pages': empty_pages(),
                                    'search': {'李雷': [{'name': '李雷雷', 'openDingTalkId': 'DING_OTHER'}]}})
        self.build('--resolve-contacts')
        plan = self.plan()
        self.assertEqual([r['student']['key'] for r in plan['recipients']], [EMMA['key']])
        self.assertEqual(len(plan['unreachable']), 1)

    def test_platform_link_wins_over_directory_search(self):
        set_scenario(self.fixture, {'pages': empty_pages(),
                                    'search': {'李雷': [{'name': '李雷', 'openDingTalkId': 'DING_LEO_DIR'}]}})
        self.build('--resolve-contacts')
        plan = self.plan()
        leo = [r for r in plan['recipients'] if r['student']['key'] == LEO['key']][0]
        self.assertEqual(leo['recipientId'], LEO['dingtalkId'])
        self.assertEqual(leo['identityEvidence'], 'platform-link')

    def test_build_excludes_submitted_awaiting_and_teacher_accepted(self):
        self.unlink_leo()
        insert_homework(self.fixture.db, EMMA, 'submitted')
        self.build()
        self.assertEqual(self.plan()['recipients'], [])

    def test_build_leaves_awaiting_working_and_teacher_accepted_alone(self):
        self.unlink_leo()
        insert_homework(self.fixture.db, EMMA, 'awaiting_working')
        self.build()
        self.assertEqual(self.plan()['recipients'], [])
        connection = sqlite3.connect(self.fixture.db)
        connection.execute('UPDATE homework_submissions SET teacher_accepted=1 WHERE student_account_id=?',
                           (EMMA['accountId'],))
        connection.commit()
        connection.close()
        self.build()
        self.assertEqual(self.plan()['recipients'], [])

    def test_build_refuses_cjk_message_and_records_no_plan(self):
        plan_path = self.fixture.state / 'reminder-plan.json'
        self.build()
        plan = self.plan()
        plan['recipients'][0]['message'] = 'Hi Emma, 交作业'
        fixtures.save_state(self.fixture, 'reminder-plan.json', plan)
        self.authorize()
        self.upload()
        result = self.send()
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(calls_for(self.fixture, 'chat', 'message', 'send'), [])
        self.assertTrue(plan_path.exists())

    # -- review gate -----------------------------------------------------
    def test_send_refuses_draft_plan_without_any_cli_call(self):
        self.build()
        result = self.send()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('not authorized', result.stdout + result.stderr)
        self.assertEqual(read_log(self.fixture, 'calls.log'), [])

    def test_send_refuses_when_attachment_changed_after_authorize(self):
        self.unlink_leo()
        self.build()
        self.authorize()
        self.upload()
        self.attachment.write_bytes(b'\x89PNG\r\ndifferent-bytes')
        result = self.send()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Attachment changed', result.stdout + result.stderr)
        self.assertEqual(calls_for(self.fixture, 'chat', 'message', 'send'), [])

    def test_send_refuses_without_uploaded_question_image(self):
        self.build()
        self.authorize()
        result = self.send()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('--upload', result.stdout + result.stderr)
        self.assertEqual(calls_for(self.fixture, 'chat', 'message', 'send'), [])

    # -- happy path and idempotency --------------------------------------
    def test_send_delivers_text_then_file_card_and_confirms_both(self):
        self.unlink_leo()
        self.ready_plan()
        result = self.send()
        self.assertEqual(result.returncode, 0, result.stderr)
        sends = read_log(self.fixture, 'sends.log')
        self.assertEqual(len(sends), 2)
        text, card = sends
        self.assertEqual(text['openDingTalkId'], EMMA['dingtalkId'])
        self.assertIn('Hi Emma,', text['content'])
        self.assertIsNone(text['msgType'])
        self.assertNotEqual(text['idempotencyKey'], card['idempotencyKey'])
        self.assertTrue(text['idempotencyKey'].startswith('reminder-text-'))
        self.assertTrue(card['idempotencyKey'].startswith('reminder-question-'))
        self.assertEqual(card['msgType'], 'file')
        self.assertEqual(card['dentryId'], 'DENTRY1')
        self.assertEqual(card['spaceId'], 'SPACE1')
        self.assertEqual(card['fileName'], 'q19.png')
        self.assertEqual(card['fileType'], 'png')
        self.assertEqual(card['fileSize'], str(self.attachment.stat().st_size))
        self.assertEqual(card['filePath'], '/q19.png')
        confirmations = calls_for(self.fixture, 'chat', 'message', 'query-send-status')
        self.assertEqual(len(confirmations), 2)
        deliveries = self.deliveries()
        self.assertEqual(len(deliveries['messages']), 2)
        self.assertTrue(all(entry['status'] == 'sent' for entry in deliveries['messages'].values()))
        self.assertTrue(all(entry.get('openMessageId') for entry in deliveries['messages'].values()))

    def test_second_send_run_sends_nothing_new(self):
        self.ready_plan()
        self.send()
        before = len(read_log(self.fixture, 'sends.log'))
        result = self.send()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(len(read_log(self.fixture, 'sends.log')), before)

    def test_upload_is_idempotent(self):
        self.build()
        self.authorize()
        self.upload()
        uploads = calls_for(self.fixture, 'drive', 'upload')
        self.assertEqual(len(uploads), 1)
        self.upload()
        self.assertEqual(len(calls_for(self.fixture, 'drive', 'upload')), 1)

    # -- suppression -----------------------------------------------------
    def test_recipient_who_submitted_between_authorize_and_send_is_skipped(self):
        self.unlink_leo()
        self.ready_plan()
        insert_homework(self.fixture.db, EMMA, 'submitted')
        result = self.send()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(read_log(self.fixture, 'sends.log'), [])
        self.assertIn(EMMA['key'], self.deliveries()['skipped'])

    def test_recipient_with_new_pending_message_is_skipped(self):
        self.unlink_leo()
        self.ready_plan()
        set_scenario(self.fixture, {'pages': [{'cursor': '0', 'conversations': [
            conversation('conv-emma', [wire_message('m-new', EMMA['dingtalkId'])])], 'hasMore': False}]})
        result = self.send()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(read_log(self.fixture, 'sends.log'), [])
        self.assertIn(EMMA['key'], self.deliveries()['skipped'])

    # -- uncertain delivery ----------------------------------------------
    def test_failed_send_marks_uncertain_and_stops_without_resending(self):
        self.unlink_leo()
        self.ready_plan()
        set_scenario(self.fixture, {'pages': empty_pages(), 'send': {'mode': 'fail'}})
        result = self.send()
        self.assertNotEqual(result.returncode, 0)
        deliveries = self.deliveries()
        self.assertTrue(any(entry['status'] == 'uncertain' for entry in deliveries['messages'].values()))
        before = len(read_log(self.fixture, 'sends.log'))
        again = self.send()
        self.assertNotEqual(again.returncode, 0)
        self.assertEqual(len(read_log(self.fixture, 'sends.log')), before)

    def test_send_response_without_task_id_is_treated_as_uncertain(self):
        self.unlink_leo()
        self.ready_plan()
        set_scenario(self.fixture, {'pages': empty_pages(), 'send': {'openTaskId': None}})
        result = self.send()
        self.assertNotEqual(result.returncode, 0)

    def test_file_card_hits_server_validation_and_stops_the_campaign(self):
        """Regression: this CLI rejects a file card whose fileType is empty."""
        self.unlink_leo()
        self.ready_plan()
        set_scenario(self.fixture, {'pages': empty_pages(), 'send': {'mode': 'fail'}})
        self.send()
        deliveries = self.deliveries()
        uncertain = [k for k, v in deliveries['messages'].items() if v['status'] == 'uncertain']
        self.assertEqual(len(uncertain), 1)
        note = 'Verified in the DingTalk chat: no file card present'
        resolved = run_script(self.fixture, 'reminders.py', '--resolve-uncertain', uncertain[0],
                              '--note', note)
        self.assertEqual(resolved.returncode, 0, resolved.stderr)
        self.assertEqual(self.deliveries()['messages'][uncertain[0]]['status'], 'not-sent')

    def test_transient_scan_failure_is_retried_before_sending(self):
        self.unlink_leo()
        self.ready_plan()
        set_scenario(self.fixture, {'pages': empty_pages(), 'listAllFailures': 2})
        result = self.send()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(len(read_log(self.fixture, 'sends.log')), 2)

    def test_repeated_scan_failure_aborts_without_sending(self):
        self.unlink_leo()
        self.ready_plan()
        set_scenario(self.fixture, {'pages': empty_pages(), 'listAllFailures': 99})
        result = self.send()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('freshness fetch failed', result.stdout + result.stderr)
        self.assertEqual(read_log(self.fixture, 'sends.log'), [])

    def test_resolve_uncertain_requires_evidence_and_a_matching_entry(self):
        self.unlink_leo()
        self.ready_plan()
        set_scenario(self.fixture, {'pages': empty_pages(), 'send': {'mode': 'fail'}})
        self.send()
        key = [k for k, v in self.deliveries()['messages'].items() if v['status'] == 'uncertain'][0]
        missing_note = run_script(self.fixture, 'reminders.py', '--resolve-uncertain', key)
        self.assertNotEqual(missing_note.returncode, 0)
        unknown = run_script(self.fixture, 'reminders.py', '--resolve-uncertain', 'reminder-text-nope',
                             '--note', 'x')
        self.assertNotEqual(unknown.returncode, 0)

    def test_resolved_not_sent_entry_is_retried_with_corrections(self):
        self.unlink_leo()
        self.ready_plan()
        set_scenario(self.fixture, {'pages': empty_pages(), 'send': {'mode': 'fail'}})
        self.send()
        key = [k for k, v in self.deliveries()['messages'].items() if v['status'] == 'uncertain'][0]
        run_script(self.fixture, 'reminders.py', '--resolve-uncertain', key, '--note', 'verified absent')
        set_scenario(self.fixture, {'pages': empty_pages()})
        before = len(read_log(self.fixture, 'sends.log'))
        result = self.send()
        self.assertEqual(result.returncode, 0, result.stderr)
        # The failed text is retried, and the card that follows it is sent too.
        self.assertEqual(len(read_log(self.fixture, 'sends.log')), before + 2)


class CombinedReminderTests(unittest.TestCase):
    """Combined campaigns: one message per student naming all owed assignments,
    one question file card per owed assignment."""
    HW1_MESSAGE_2 = ("Hi Emma, I don't have your Homework 1 or Homework 2 yet - Homework 1 was due on 17 September and Homework 2 was due on 18 September. Please send a photo of your answer with your working for each. The questions are attached. — Adam, Samuel's automated teaching assistant.")

    def setUp(self):
        self.fixture = build_workspace(self, self.drive_scenario())
        self.hw1 = self.fixture.tmp / 'hw1.png'
        self.hw2 = self.fixture.tmp / 'hw2.png'
        self.hw1.write_bytes(b'\x89PNG\r\n\x1a\nfixture-homework-1-image')
        self.hw2.write_bytes(b'\x89PNG\r\n\x1a\nfixture-homework-2-image')

    def drive_scenario(self):
        return {'pages': empty_pages(),
                'driveUpload': {'byFile': {'hw1.png': {'fileId': 'F1', 'spaceId': 'S1'},
                                           'hw2.png': {'fileId': 'F2', 'spaceId': 'S2'}}},
                'driveInfo': {'byFileId': {'F1': {'dentryId': 'D1', 'spaceId': 'S1'},
                                           'F2': {'dentryId': 'D2', 'spaceId': 'S2'}}}}

    def build(self, *extra):
        return run_script(self.fixture, 'reminders.py', '--build',
                          '--assignment', fixtures.HEADER, '--attachment', str(self.hw1),
                          '--assignment', fixtures.HEADER2, '--attachment', str(self.hw2),
                          *extra)

    def authorize(self):
        return run_script(self.fixture, 'reminders.py', '--authorize')

    def upload(self):
        return run_script(self.fixture, 'reminders.py', '--upload')

    def send(self):
        return run_script(self.fixture, 'reminders.py', '--send')

    def plan(self):
        return load_state(self.fixture, 'reminder-plan.json')

    def recipient(self, student):
        return [r for r in self.plan()['recipients'] if r['student']['key'] == student['key']][0]

    def test_combined_build_names_each_students_full_owed_set(self):
        # Leo already submitted Homework 1; Emma owes both.
        insert_homework(self.fixture.db, LEO, 'submitted', row_id='hw-leo-1')
        result = self.build()
        self.assertEqual(result.returncode, 0, result.stderr)
        plan = self.plan()
        self.assertEqual([r['student']['key'] for r in plan['recipients']], [EMMA['key'], LEO['key']])
        emma, leo = self.recipient(EMMA), self.recipient(LEO)
        self.assertEqual(emma['owed'], [fixtures.HEADER, fixtures.HEADER2])
        self.assertEqual(emma['message'], self.HW1_MESSAGE_2)
        self.assertEqual(leo['owed'], [fixtures.HEADER2])
        self.assertEqual(leo['message'],
                         "Hi, I don't have your Homework 2 yet - it was due on 18 September. Please send a photo of your answer with your working. The question is attached. — Adam, Samuel's automated teaching assistant.")
        self.assertEqual([a['assignment'] for a in plan['attachments']],
                         [fixtures.HEADER, fixtures.HEADER2])
        self.assertEqual(plan['attachments'][0]['sha256'],
                         hashlib.sha256(self.hw1.read_bytes()).hexdigest())
        self.assertEqual(plan['attachments'][1]['sha256'],
                         hashlib.sha256(self.hw2.read_bytes()).hexdigest())
        self.assertEqual([m['label'] for m in plan['assignments']], ['Homework 1', 'Homework 2'])
        # Legacy single-assignment fields mirror the first attachment.
        self.assertEqual(plan['attachmentSha256'], plan['attachments'][0]['sha256'])
        for recipient in plan['recipients']:
            self.assertNotRegex(recipient['message'], r'[一-鿿]')

    def test_exclusions_trim_one_students_owed_set(self):
        insert_homework(self.fixture.db, LEO, 'submitted', row_id='hw-leo-1')
        result = self.build('--exclude', f"{EMMA['key']}:{fixtures.HEADER}")
        self.assertEqual(result.returncode, 0, result.stderr)
        emma = self.recipient(EMMA)
        self.assertEqual(emma['owed'], [fixtures.HEADER2])
        self.assertEqual(emma['excludedAssignments'],
                         [{'assignment': fixtures.HEADER,
                           'reason': 'already reminded earlier today (delivery confirmed)'}])
        self.assertEqual(emma['message'],
                         "Hi Emma, I don't have your Homework 2 yet - it was due on 18 September. Please send a photo of your answer with your working. The question is attached. — Adam, Samuel's automated teaching assistant.")
        self.assertEqual(self.recipient(LEO)['owed'], [fixtures.HEADER2])

        # Excluding everything a student owes drops them from the recipients.
        result = self.build('--exclude', f"{EMMA['key']}:{fixtures.HEADER}",
                            '--exclude', f"{EMMA['key']}:{fixtures.HEADER2}",
                            '--exclude', f"{LEO['key']}:{fixtures.HEADER2}")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(self.plan()['recipients'], [])

    def test_exclude_rejects_unknown_student_or_assignment(self):
        result = self.build('--exclude', f"{EMMA['key']}:not a real header")
        self.assertNotEqual(result.returncode, 0)
        result = self.build('--exclude', f"S3.6|99|没人:{fixtures.HEADER}")
        self.assertNotEqual(result.returncode, 0)

    def test_combined_upload_uploads_each_attachment_once(self):
        insert_homework(self.fixture.db, LEO, 'submitted', row_id='hw-leo-1')
        self.build()
        self.authorize()
        result = self.upload()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(len(calls_for(self.fixture, 'drive', 'upload')), 2)
        self.assertEqual(len(calls_for(self.fixture, 'drive', 'info')), 2)
        attachments = self.plan()['attachments']
        self.assertEqual(attachments[0]['driveFile']['dentryId'], 'D1')
        self.assertEqual(attachments[1]['driveFile']['dentryId'], 'D2')
        result = self.upload()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(len(calls_for(self.fixture, 'drive', 'upload')), 2)
        self.assertEqual(len(calls_for(self.fixture, 'drive', 'info')), 2)

    def test_combined_send_text_then_one_card_per_owed_assignment(self):
        insert_homework(self.fixture.db, LEO, 'submitted', row_id='hw-leo-1')
        self.build()
        self.authorize()
        self.upload()
        result = self.send()
        self.assertEqual(result.returncode, 0, result.stderr)
        sends = read_log(self.fixture, 'sends.log')
        self.assertEqual(len(sends), 5)
        emma_sends = [s for s in sends if s['openDingTalkId'] == EMMA['dingtalkId']]
        leo_sends = [s for s in sends if s['openDingTalkId'] == LEO['dingtalkId']]
        self.assertEqual(len(emma_sends), 3)
        self.assertEqual(len(leo_sends), 2)
        self.assertEqual(emma_sends[0]['content'], self.HW1_MESSAGE_2)
        self.assertIsNone(emma_sends[0]['msgType'])
        self.assertEqual([s['dentryId'] for s in emma_sends[1:]], ['D1', 'D2'])
        self.assertEqual([s['fileName'] for s in emma_sends[1:]], ['hw1.png', 'hw2.png'])
        self.assertEqual(leo_sends[1]['dentryId'], 'D2')
        keys = [s['idempotencyKey'] for s in sends]
        self.assertEqual(len(set(keys)), 5)
        self.assertTrue(keys[0].startswith('reminder-text-'))
        self.assertTrue(keys[1].startswith('reminder-question-'))
        self.assertTrue(keys[2].startswith('reminder-question-'))
        self.assertTrue(keys[3].startswith('reminder-text-'))
        self.assertTrue(keys[4].startswith('reminder-question-'))
        self.assertEqual(len(calls_for(self.fixture, 'chat', 'message', 'query-send-status')), 5)
        deliveries = load_state(self.fixture, 'reminder-deliveries.json')
        self.assertEqual(len(deliveries['messages']), 5)
        self.assertTrue(all(e['status'] == 'sent' for e in deliveries['messages'].values()))

        # Re-running the campaign sends nothing new.
        result = self.send()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(len(read_log(self.fixture, 'sends.log')), 5)

    def test_send_recomposes_text_from_the_live_owed_set(self):
        insert_homework(self.fixture.db, LEO, 'submitted', row_id='hw-leo-1')
        self.build()
        self.authorize()
        self.upload()
        # Emma submits Homework 1 between build and send.
        insert_homework(self.fixture.db, EMMA, 'submitted', row_id='hw-emma-1')
        result = self.send()
        self.assertEqual(result.returncode, 0, result.stderr)
        sends = read_log(self.fixture, 'sends.log')
        self.assertEqual(len(sends), 4)
        emma_sends = [s for s in sends if s['openDingTalkId'] == EMMA['dingtalkId']]
        self.assertEqual(len(emma_sends), 2)
        self.assertEqual(emma_sends[0]['content'],
                         "Hi Emma, I don't have your Homework 2 yet - it was due on 18 September. Please send a photo of your answer with your working. The question is attached. — Adam, Samuel's automated teaching assistant.")
        # Only the Homework 2 card goes out; the Homework 1 card is not sent.
        self.assertEqual(emma_sends[1]['dentryId'], 'D2')
        self.assertNotIn('D1', [s['dentryId'] for s in sends])


class ReminderStaticTests(unittest.TestCase):
    def test_no_forbidden_commands_or_paths(self):
        source = (fixtures.REAL_DIR / 'reminders.py').read_text(encoding='utf-8')
        for forbidden in ('auth login', 'submission-log.json', 'Submission Log', 'category',
                          'daily_campaign', 'reminders.py --send', 'migrate_to_platform'):
            self.assertNotIn(forbidden, source)
        self.assertIn('ensure_english_only', source)
        self.assertIn('query-send-status', source)


if __name__ == '__main__':
    unittest.main()