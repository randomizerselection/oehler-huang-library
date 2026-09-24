"""Absence follow-ups: plan preparation, identity resolution, text + PDF
delivery, platform recording, and reply capture. No DingTalk calls are made."""
import hashlib
import json
import sqlite3
import unittest

from fixtures import (EMMA, LEO, LESSON_CONTENT_ID, LESSON_GROUP_ID, LESSON_GROUP_TITLE,
                      LESSON_MARKED_AT, LESSON_TITLE, absence_followup_row, build_workspace,
                      calls_for, default_scenario, fresh_import, group_has_pdf, group_missing,
                      insert_absence, load_state, read_log, run_script, save_state,
                      set_scenario, unlink_dingtalk, wire_message, write_lesson_assets)

EXPECTED_EMMA = (
    "Hi Emma, you were marked absent from Samuel's A Level Economics lesson “Actual growth, potential growth and output gaps” on 20 September 2026. The lesson covered actual and potential growth, negative and positive output gaps, and how to interpret them using diagrams. Please reply to this message with “Absence reason:” followed by the reason you were absent. Please download the lesson PDF from the Economics 5 group. Please study the lesson independently and let Samuel know if anything is unclear. — Adam, Samuel's automated teaching assistant.")


def prepare_fixture(test, scenario=None, students=(EMMA, LEO)):
    fixture = build_workspace(test, scenario or {})
    pdf = write_lesson_assets(fixture)
    for index, student in enumerate(students, start=1):
        insert_absence(fixture.db, student, log_id=f'attlog-{index}')
    return fixture, pdf


def authorize(fixture):
    plan = load_state(fixture, 'absence-followup-plan.json')
    plan['status'] = 'authorized'
    save_state(fixture, 'absence-followup-plan.json', plan)
    return plan


class PrepareTests(unittest.TestCase):
    def test_date_filter_excludes_older_absences(self):
        fixture, _ = prepare_fixture(self, students=(EMMA,))
        insert_absence(fixture.db, LEO, log_id='older', marked_at='2026-09-19T08:00:00Z')
        result = run_script(fixture, 'absence_followups.py', 'prepare', '--date', '2026-09-20')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(result.stdout)['recipients'], 1)

    def test_authorize_binds_digest_and_prepare_cannot_replace_active_plan(self):
        fixture, _ = prepare_fixture(self)
        result = run_script(fixture, 'absence_followups.py', 'prepare')
        digest = json.loads(result.stdout)['planSha256']
        bad = run_script(fixture, 'absence_followups.py', 'authorize', '--plan-sha256', 'wrong')
        self.assertNotEqual(bad.returncode, 0)
        self.assertEqual(load_state(fixture, 'absence-followup-plan.json')['status'], 'draft')
        good = run_script(fixture, 'absence_followups.py', 'authorize', '--plan-sha256', digest)
        self.assertEqual(good.returncode, 0, good.stderr)
        before = (fixture.state / 'absence-followup-plan.json').read_bytes()
        self.assertNotEqual(run_script(fixture, 'absence_followups.py', 'prepare').returncode, 0)
        self.assertEqual((fixture.state / 'absence-followup-plan.json').read_bytes(), before)

    def test_plan_personalizes_each_message_and_hashes_the_lesson_pdf(self):
        fixture, pdf = prepare_fixture(self)
        result = run_script(fixture, 'absence_followups.py', 'prepare')
        self.assertEqual(result.returncode, 0, result.stderr)
        summary = json.loads(result.stdout)
        self.assertEqual(summary['recipients'], 2)
        self.assertEqual(summary['unreachable'], 0)

        plan = load_state(fixture, 'absence-followup-plan.json')
        self.assertEqual(plan['status'], 'draft')
        self.assertEqual(plan['campaign'].startswith('absence-followup-'), True)
        attachment = plan['attachments'][LESSON_CONTENT_ID]
        self.assertEqual(attachment['name'], pdf.name)
        self.assertEqual(attachment['sha256'], hashlib.sha256(pdf.read_bytes()).hexdigest())
        self.assertEqual(attachment['title'], LESSON_TITLE)
        messages = {entry['student']['key']: entry['message'] for entry in plan['recipients']}
        self.assertEqual(messages[EMMA['key']], EXPECTED_EMMA)
        self.assertEqual(messages[LEO['key']][:4], 'Hi, ')
        self.assertEqual(plan['recipients'][0]['identityEvidence'], 'platform-link')
        self.assertEqual(plan['recipients'][0]['markedAt'], LESSON_MARKED_AT)
        # Students are pointed at the group, so the resolved group is part of the reviewed plan.
        self.assertEqual(plan['group'], {'title': LESSON_GROUP_TITLE, 'conversationId': LESSON_GROUP_ID,
                                         'memberCount': 37, 'checkedAt': plan['group']['checkedAt'],
                                         'pdfInGroup': False})
        self.assertIn(f'from the {LESSON_GROUP_TITLE} group', EXPECTED_EMMA)

    def test_group_resolution_failure_stops_prepare(self):
        fixture, _ = prepare_fixture(self, group_missing())
        result = run_script(fixture, 'absence_followups.py', 'prepare')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('missing or not unique', result.stderr)

    def test_planned_students_are_never_planned_twice(self):
        fixture, _ = prepare_fixture(self)
        self.assertEqual(run_script(fixture, 'absence_followups.py', 'prepare').returncode, 0)
        insert_absence(fixture.db, EMMA, log_id='attlog-9', followup={
            'status': 'sent', 'conversation_id': 'conv-emma', 'sent_at': LESSON_MARKED_AT})
        plan = load_state(fixture, 'absence-followup-plan.json')
        plan['status'] = 'draft'
        save_state(fixture, 'absence-followup-plan.json', plan)
        self.assertEqual(run_script(fixture, 'absence_followups.py', 'prepare').returncode, 0)
        plan = load_state(fixture, 'absence-followup-plan.json')
        self.assertEqual({entry['attendanceLogId'] for entry in plan['recipients']},
                         {'attlog-1', 'attlog-2'})

    def test_lesson_without_an_exported_pdf_is_skipped_not_messaged(self):
        fixture = build_workspace(self, {})
        pdf = write_lesson_assets(fixture)
        pdf.unlink()
        insert_absence(fixture.db, EMMA, log_id='attlog-1')
        result = run_script(fixture, 'absence_followups.py', 'prepare')
        self.assertEqual(result.returncode, 0, result.stderr)
        summary = json.loads(result.stdout)
        self.assertEqual(summary['recipients'], 0)
        self.assertEqual(len(summary['skippedDetail']), 1)
        self.assertIn('has not been exported', summary['skippedDetail'][0]['reason'])

    def test_recorded_period_suppresses_each_covered_later_absence(self):
        fixture = build_workspace(self, {})
        write_lesson_assets(fixture)
        insert_absence(fixture.db, EMMA, log_id='attlog-1', followup={
            'status': 'responded', 'conversation_id': 'conv-emma',
            'sent_at': '2026-09-20T02:00:00+00:00'})
        with sqlite3.connect(fixture.db) as db:
            db.execute("""UPDATE absence_followups
                SET status='responded',absence_start_date='2026-09-20',absence_end_date='2026-09-30'
                WHERE attendance_log_id='attlog-1'""")
        insert_absence(fixture.db, EMMA, log_id='attlog-2', marked_at='2026-09-25T02:00:00+00:00')
        result = run_script(fixture, 'absence_followups.py', 'prepare')
        self.assertEqual(result.returncode, 0, result.stderr)
        summary = json.loads(result.stdout)
        self.assertEqual(summary['recipients'], 0)
        self.assertEqual(summary['skipped'], 1)
        self.assertEqual(summary['skippedDetail'][0]['absenceEndDate'], '2026-09-30')
        self.assertEqual(read_log(fixture, 'sends.log'), [])


class IdentityTests(unittest.TestCase):
    def test_unlinked_student_resolved_from_a_unique_directory_match(self):
        fixture, _ = prepare_fixture(
            self, {'search': {'李雷': [{'name': '李雷', 'openDingTalkId': 'DING_LEO_DIR'}]}})
        unlink_dingtalk(fixture.db, LEO)
        self.assertEqual(run_script(fixture, 'absence_followups.py', 'prepare').returncode, 0)
        plan = load_state(fixture, 'absence-followup-plan.json')
        leo = [entry for entry in plan['recipients'] if entry['student']['key'] == LEO['key']][0]
        self.assertEqual(leo['recipientId'], 'DING_LEO_DIR')
        self.assertEqual(leo['identityEvidence'], 'contact-search')

    def test_unlinked_student_without_a_directory_match_is_recorded_unreachable(self):
        fixture, _ = prepare_fixture(self, {'search': {}})
        unlink_dingtalk(fixture.db, LEO)
        self.assertEqual(run_script(fixture, 'absence_followups.py', 'prepare').returncode, 0)
        plan = load_state(fixture, 'absence-followup-plan.json')
        self.assertEqual([entry['student']['key'] for entry in plan['recipients']], [EMMA['key']])
        self.assertEqual(len(plan['unreachable']), 1)
        authorize(fixture)
        result = run_script(fixture, 'absence_followups.py', 'send')
        self.assertEqual(result.returncode, 0, result.stderr)
        row = absence_followup_row(fixture.db, 'attlog-2')
        self.assertEqual(row['status'], 'unreachable')
        self.assertIsNone(row['sent_at'])
        self.assertEqual([send['openDingTalkId'] for send in read_log(fixture, 'sends.log')
                          if send['openDingTalkId']], [EMMA['dingtalkId']])
        self.assertEqual([send['group'] for send in read_log(fixture, 'sends.log') if send['group']],
                         [LESSON_GROUP_ID])

    def test_ambiguous_directory_match_is_never_messaged(self):
        fixture, _ = prepare_fixture(self, {'search': {'李雷': [
            {'name': '李雷', 'openDingTalkId': 'DING_ONE'},
            {'name': '李雷', 'openDingTalkId': 'DING_TWO'}]}})
        unlink_dingtalk(fixture.db, LEO)
        self.assertEqual(run_script(fixture, 'absence_followups.py', 'prepare').returncode, 0)
        plan = load_state(fixture, 'absence-followup-plan.json')
        self.assertEqual([entry['student']['key'] for entry in plan['recipients']], [EMMA['key']])
        self.assertIn('not unique', plan['unreachable'][0]['reason'])


class SendTests(unittest.TestCase):
    def test_completed_send_is_a_local_noop(self):
        fixture, _ = prepare_fixture(self)
        run_script(fixture, 'absence_followups.py', 'prepare')
        authorize(fixture)
        sent = run_script(fixture, 'absence_followups.py', 'send')
        self.assertEqual(sent.returncode, 0, sent.stderr)
        calls_before = read_log(fixture, 'calls.log')
        again = run_script(fixture, 'absence_followups.py', 'send')
        self.assertEqual(again.returncode, 0, again.stderr)
        self.assertEqual(json.loads(again.stdout)['status'], 'completed')
        self.assertEqual(read_log(fixture, 'calls.log'), calls_before)

    def test_failed_drive_info_resumes_without_reuploading(self):
        fixture, _ = prepare_fixture(self, {'driveInfo': {'mode': 'fail'}})
        run_script(fixture, 'absence_followups.py', 'prepare')
        authorize(fixture)
        self.assertNotEqual(run_script(fixture, 'absence_followups.py', 'send').returncode, 0)
        self.assertEqual(load_state(fixture, 'absence-followup-plan.json')['attachments'][LESSON_CONTENT_ID]
                         ['driveFile']['fileId'], 'FILE1')
        set_scenario(fixture, default_scenario())
        resumed = run_script(fixture, 'absence_followups.py', 'send')
        self.assertEqual(resumed.returncode, 0, resumed.stderr)
        # One Drive upload feeds the single group card; each student gets text only.
        self.assertEqual(len(calls_for(fixture, 'drive', 'upload')), 1)
        self.assertEqual(len(read_log(fixture, 'sends.log')), 3)

    def test_resume_does_not_overwrite_a_captured_reason(self):
        fixture, _ = prepare_fixture(self)
        run_script(fixture, 'absence_followups.py', 'prepare')
        authorize(fixture)
        self.assertEqual(run_script(fixture, 'absence_followups.py', 'send').returncode, 0)
        import sqlite3
        with sqlite3.connect(fixture.db) as db:
            db.execute("UPDATE absence_followups SET status='responded',reason_text='I was ill.' WHERE attendance_log_id='attlog-1'")
        plan = load_state(fixture, 'absence-followup-plan.json')
        plan['status'] = 'authorized'  # Crash before completion checkpoint / resumed partial campaign.
        save_state(fixture, 'absence-followup-plan.json', plan)
        self.assertEqual(run_script(fixture, 'absence_followups.py', 'send').returncode, 0)
        row = absence_followup_row(fixture.db, 'attlog-1')
        self.assertEqual((row['status'], row['reason_text']), ('responded', 'I was ill.'))

    def test_send_requires_an_authorized_plan(self):
        fixture, _ = prepare_fixture(self)
        self.assertEqual(run_script(fixture, 'absence_followups.py', 'prepare').returncode, 0)
        result = run_script(fixture, 'absence_followups.py', 'send')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('not authorized', result.stderr)
        self.assertEqual(read_log(fixture, 'sends.log'), [])

    def test_send_posts_the_pdf_to_the_group_and_messages_students_without_it(self):
        fixture, pdf = prepare_fixture(self)
        self.assertEqual(run_script(fixture, 'absence_followups.py', 'prepare').returncode, 0)
        authorize(fixture)
        result = run_script(fixture, 'absence_followups.py', 'send')
        self.assertEqual(result.returncode, 0, result.stderr)
        summary = json.loads(result.stdout.splitlines()[-1])
        self.assertEqual(summary['completedRecipients'], 2)
        self.assertEqual(summary['group']['alreadyPresent'], [])
        self.assertEqual(summary['group']['posted'][0]['name'], pdf.name)

        sends = read_log(fixture, 'sends.log')
        self.assertEqual(len(sends), 3)
        card, texts = sends[0], sends[1:]
        # The PDF goes into the group, never into a student's personal chat.
        self.assertEqual(card['group'], LESSON_GROUP_ID)
        self.assertIsNone(card['openDingTalkId'])
        self.assertEqual(card['msgType'], 'file')
        self.assertEqual(card['fileName'], pdf.name)
        self.assertEqual(card['fileType'], 'pdf')
        self.assertEqual(card['fileSize'], str(pdf.stat().st_size))
        self.assertEqual([send['openDingTalkId'] for send in texts],
                         [EMMA['dingtalkId'], LEO['dingtalkId']])
        self.assertTrue(all(send['group'] is None and send['msgType'] is None for send in texts))
        self.assertEqual(texts[0]['content'], EXPECTED_EMMA)
        self.assertIn('from the Economics 5 group', texts[1]['content'])
        # Uploaded once for the group card, not once per student.
        self.assertEqual(len(calls_for(fixture, 'drive', 'upload')), 1)

        row = absence_followup_row(fixture.db, 'attlog-1')
        self.assertEqual(row['status'], 'sent')
        self.assertEqual(row['recipient_external_id'], EMMA['dingtalkId'])
        self.assertEqual(row['message_text'], EXPECTED_EMMA)
        self.assertEqual(row['lesson_pdf_name'], pdf.name)
        self.assertEqual(row['lesson_pdf_sha256'], hashlib.sha256(pdf.read_bytes()).hexdigest())
        self.assertIsNotNone(row['conversation_id'])
        self.assertIsNotNone(row['sent_at'])

        plan = load_state(fixture, 'absence-followup-plan.json')
        self.assertEqual(plan['status'], 'completed')
        self.assertTrue(plan['group']['pdfInGroup'])
        deliveries = load_state(fixture, 'absence-followup-deliveries.json')
        self.assertEqual(deliveries['status'], 'completed')
        self.assertTrue(all(entry['status'] == 'sent'
                            for entry in deliveries['messages'].values()))

    def test_pdf_already_in_the_group_is_never_posted_again(self):
        fixture, pdf = prepare_fixture(self, group_has_pdf('9-2-1-growth-output-gaps.pdf'))
        result = run_script(fixture, 'absence_followups.py', 'prepare')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertTrue(load_state(fixture, 'absence-followup-plan.json')['group']['pdfInGroup'])
        authorize(fixture)
        sent = run_script(fixture, 'absence_followups.py', 'send')
        self.assertEqual(sent.returncode, 0, sent.stderr)
        self.assertEqual(json.loads(sent.stdout.splitlines()[-1])['group']['alreadyPresent'],
                         [pdf.name])
        self.assertEqual(calls_for(fixture, 'drive', 'upload'), [])
        sends = read_log(fixture, 'sends.log')
        self.assertEqual(len(sends), 2)
        self.assertTrue(all(send['group'] is None for send in sends))

    def test_changed_pdf_after_authorization_blocks_the_send(self):
        fixture, pdf = prepare_fixture(self)
        self.assertEqual(run_script(fixture, 'absence_followups.py', 'prepare').returncode, 0)
        authorize(fixture)
        pdf.write_bytes(b'%PDF-1.4 replaced\n')
        result = run_script(fixture, 'absence_followups.py', 'send')
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(read_log(fixture, 'sends.log'), [])

    def test_uncertain_delivery_is_resumed_only_after_a_recorded_inspection(self):
        fixture, _ = prepare_fixture(self)
        self.assertEqual(run_script(fixture, 'absence_followups.py', 'prepare').returncode, 0)
        plan = authorize(fixture)
        set_scenario(fixture, default_scenario(send={'mode': 'fail'}))
        failed = run_script(fixture, 'absence_followups.py', 'send')
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn('uncertain', failed.stdout + failed.stderr)
        deliveries = load_state(fixture, 'absence-followup-deliveries.json')
        key = [entry['idempotencyKey'] for entry in deliveries['messages'].values()][0]
        # The group card is delivered first, so it is the delivery that goes uncertain.
        self.assertTrue(key.startswith('absence-group-'))

        # A blind rerun refuses to send while the outcome is unresolved.
        before = len(read_log(fixture, 'sends.log'))
        self.assertNotEqual(run_script(fixture, 'absence_followups.py', 'send').returncode, 0)
        self.assertEqual(len(read_log(fixture, 'sends.log')), before)

        set_scenario(fixture, default_scenario())
        resolved = run_script(fixture, 'absence_followups.py',
                              '--resolve-uncertain', key, '--note', 'chat inspected: nothing sent')
        self.assertEqual(resolved.returncode, 0, resolved.stderr)
        self.assertEqual(json.loads(resolved.stdout)['status'], 'not-sent')
        resumed = run_script(fixture, 'absence_followups.py', 'send')
        self.assertEqual(resumed.returncode, 0, resumed.stderr)
        self.assertEqual(json.loads(resumed.stdout.splitlines()[-1])['completedRecipients'], 2)
        self.assertEqual(absence_followup_row(fixture.db, 'attlog-1')['status'], 'sent')
        self.assertEqual(plan['recipients'][0]['recipientId'], EMMA['dingtalkId'])

    def test_resolving_an_uncertain_delivery_requires_evidence(self):
        fixture, _ = prepare_fixture(self)
        result = run_script(fixture, 'absence_followups.py',
                            '--resolve-uncertain', 'absence-text-nothing', '--note', '')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('evidence note', result.stderr)


class CaptureTests(unittest.TestCase):
    def snapshot(self, fixture, conversation_id, sender_id, content, mid='reply-1',
                 time='2026-09-20 14:05:00'):
        save_state(fixture, 'latest-response.json', {'success': True, 'complete': True, 'pages': 1,
            'result': {'hasMore': False, 'conversationMessagesList': [
                {'openConversationId': conversation_id, 'singleChat': True, 'title': '张梦 Emma',
                 'messages': [wire_message(mid, sender_id, time=time, content=content)]}]}})

    def test_reason_prefix_is_removed(self):
        fixture, _ = prepare_fixture(self)
        followups = fresh_import(fixture, 'absence_followups')
        self.assertEqual(followups.normalize_reason(' Absence reason: Medical appointment '),
                         'Medical appointment')

    def test_capture_records_an_explicit_reason_in_the_verified_conversation(self):
        fixture, _ = prepare_fixture(self)
        insert_absence(fixture.db, EMMA, log_id='attlog-1', followup={
            'status': 'sent', 'conversation_id': 'conv-emma', 'sent_at': '2026-09-20T02:00:00+00:00'})
        self.snapshot(fixture, 'conv-emma', EMMA['dingtalkId'],
                      'Absence reason: I had a medical appointment.')
        result = run_script(fixture, 'absence_followups.py', 'capture')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(result.stdout)['captured'], 1)
        row = absence_followup_row(fixture.db, 'attlog-1')
        self.assertEqual(row['status'], 'responded')
        self.assertEqual(row['response_message_id'], 'reply-1')
        self.assertEqual(row['reason_text'], 'I had a medical appointment.')
        self.assertEqual(row['reason_category'], 'health')

        # The same reply is never captured twice.
        again = run_script(fixture, 'absence_followups.py', 'capture')
        self.assertEqual(json.loads(again.stdout)['captured'], 0)

    def test_capture_does_not_treat_acknowledgments_or_unlabelled_text_as_reasons(self):
        for text in ('okok', 'Absence reason: okok', 'I had an appointment'):
            with self.subTest(text=text):
                fixture = build_workspace(self, {})
                insert_absence(fixture.db, EMMA, log_id='attlog-1', followup={
                    'status': 'sent', 'conversation_id': 'conv-emma',
                    'sent_at': '2026-09-20T02:00:00+00:00'})
                self.snapshot(fixture, 'conv-emma', EMMA['dingtalkId'], text)
                result = run_script(fixture, 'absence_followups.py', 'capture')
                self.assertEqual(result.returncode, 0, result.stderr)
                self.assertEqual(json.loads(result.stdout)['captured'], 0)
                row = absence_followup_row(fixture.db, 'attlog-1')
                self.assertEqual((row['status'], row['reason_text']), ('sent', None))

    def test_capture_skips_acknowledgment_before_a_real_reason(self):
        fixture = build_workspace(self, {})
        insert_absence(fixture.db, EMMA, log_id='attlog-1', followup={
            'status': 'sent', 'conversation_id': 'conv-emma',
            'sent_at': '2026-09-20T02:00:00+00:00'})
        save_state(fixture, 'latest-response.json', {'success': True, 'complete': True,
            'result': {'hasMore': False, 'conversationMessagesList': [{
                'openConversationId': 'conv-emma', 'messages': [
                    wire_message('ack', EMMA['dingtalkId'], time='2026-09-20 14:05:00', content='okok'),
                    wire_message('reason', EMMA['dingtalkId'], time='2026-09-20 14:06:00',
                                 content='Absence reason: I was ill.')]}]}})
        result = run_script(fixture, 'absence_followups.py', 'capture')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(result.stdout)['captured'], 1)
        row = absence_followup_row(fixture.db, 'attlog-1')
        self.assertEqual((row['response_message_id'], row['reason_text']), ('reason', 'I was ill.'))

    def test_capture_records_an_explicit_prolonged_absence_period(self):
        fixture, _ = prepare_fixture(self)
        insert_absence(fixture.db, EMMA, log_id='attlog-1', followup={
            'status': 'sent', 'conversation_id': 'conv-emma', 'sent_at': '2026-09-20T02:00:00+00:00'})
        self.snapshot(fixture, 'conv-emma', EMMA['dingtalkId'],
                      'Absence reason: I will be away from 20 September to 30 September.')
        result = run_script(fixture, 'absence_followups.py', 'capture')
        self.assertEqual(result.returncode, 0, result.stderr)
        row = absence_followup_row(fixture.db, 'attlog-1')
        self.assertEqual((row['absence_start_date'], row['absence_end_date']),
                         ('2026-09-20', '2026-09-30'))

    def test_capture_ignores_replies_that_precede_the_question(self):
        fixture, _ = prepare_fixture(self)
        insert_absence(fixture.db, EMMA, log_id='attlog-1', followup={
            'status': 'sent', 'conversation_id': 'conv-emma', 'sent_at': '2026-09-20T02:00:00+00:00'})
        self.snapshot(fixture, 'conv-emma', EMMA['dingtalkId'], 'Good morning',
                      mid='reply-early', time='2026-09-20 08:00:00')
        result = run_script(fixture, 'absence_followups.py', 'capture')
        self.assertEqual(json.loads(result.stdout)['captured'], 0)
        self.assertEqual(absence_followup_row(fixture.db, 'attlog-1')['status'], 'sent')

    def test_incomplete_scan_is_refused(self):
        fixture, _ = prepare_fixture(self)
        save_state(fixture, 'latest-response.json', {'complete': False, 'result': {
            'hasMore': True, 'conversationMessagesList': []}})
        result = run_script(fixture, 'absence_followups.py', 'capture')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('complete DingTalk message scan', result.stderr)


class FetchIntegrationTests(unittest.TestCase):
    def test_fetch_captures_a_pending_absence_reason(self):
        fixture = build_workspace(self, {'pages': [{'cursor': '0', 'hasMore': False, 'conversations': []}]})
        insert_absence(fixture.db, EMMA, log_id='attlog-1', followup={
            'status': 'sent', 'conversation_id': 'conv-emma', 'sent_at': '2026-09-20T02:00:00+00:00'})
        set_scenario(fixture, {'pages': [{'cursor': '0', 'hasMore': False, 'conversations': [
            {'openConversationId': 'conv-emma', 'singleChat': True, 'title': '张梦 Emma',
             'messages': [{'openMessageId': 'reply-1', 'createTime': '2026-09-20 14:05:00',
                           'sender': '张梦 Emma', 'senderOpenDingTalkId': EMMA['dingtalkId'],
                           'content': 'Absence reason: I was ill.', 'resources': []}]}]}]})
        result = run_script(fixture, 'fetch.py')
        self.assertEqual(result.returncode, 0, result.stderr)
        row = absence_followup_row(fixture.db, 'attlog-1')
        self.assertEqual(row['status'], 'responded')
        self.assertEqual(row['reason_text'], 'I was ill.')


if __name__ == '__main__':
    unittest.main()
