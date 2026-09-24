"""Scenario groups 4, 5, 11, 12: batch binding, decision validation,
transactional rollback, and entry-point safety."""
import json
import os
import sqlite3
import unittest

from fixtures import (CLASS_S36, EMMA, HEADER, LEO, PLATFORM_TITLE, ASSIGNED_ON, WENDY,
                      build_workspace, fresh_import, homework_row, insert_homework,
                      load_state, message, read_log, run_script, save_state, write_decisions,
                      write_pending)


def emma_message(mid='m1', sender='DING_EMMA', time='2026-09-16 10:00:00'):
    return message(mid, sender, time=time, candidates=[{'key': EMMA['key']}])


def submitted_decision(mid='m1', student=EMMA, **extra):
    decision = {'messageId': mid, 'action': 'submitted', 'studentKey': student['key'],
                'assignment': HEADER, 'evidence': 'photo shows full working',
                'responseFormat': 'worked', 'workingPhotoPresent': True}
    decision.update(extra)
    return decision


class WorkspaceCase(unittest.TestCase):
    def prepare(self, fixture):
        result = run_script(fixture, 'update.py', 'prepare')
        return result

    def commit(self, fixture):
        return run_script(fixture, 'update.py', 'commit')


class BatchBindingTests(WorkspaceCase):
    def test_prepare_rejects_decisions_from_another_batch(self):
        fixture = build_workspace(self)
        write_pending(fixture, [], batch_id='batch-1')
        write_decisions(fixture, [], batch_id='stale-batch')
        result = self.prepare(fixture)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('decisions not bound to current fetch batch', result.stderr)
        self.assertFalse((fixture.state / 'plan.json').exists())

    def test_prepare_rejects_legacy_list_decisions(self):
        fixture = build_workspace(self)
        write_pending(fixture, [], batch_id='batch-1')
        save_state(fixture, 'decisions.json', [])
        result = self.prepare(fixture)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('decisions not bound to current fetch batch', result.stderr)
        self.assertFalse((fixture.state / 'plan.json').exists())

    def test_commit_rejects_plan_after_refetch(self):
        fixture = build_workspace(self)
        write_pending(fixture, [], batch_id='batch-1')
        write_decisions(fixture, [], batch_id='batch-1')
        self.assertEqual(self.prepare(fixture).returncode, 0)
        self.assertEqual(load_state(fixture, 'plan.json')['batchId'], 'batch-1')
        # A new fetch replaces the batch before commit.
        write_pending(fixture, [], batch_id='batch-2')
        result = self.commit(fixture)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('plan is stale', result.stderr)
        self.assertFalse((fixture.state / 'ledger.json').exists())
        self.assertIsNone(homework_row(fixture.db))
        self.assertFalse((fixture.tmp / 'backups').exists())

    def test_english_name_decisions_must_match_batch_too(self):
        fixture = build_workspace(self)
        write_pending(fixture, [], batch_id='batch-1')
        write_decisions(fixture, [], batch_id='batch-1')
        write_decisions(fixture, [], batch_id='other', name='english-name-decisions.json')
        result = self.prepare(fixture)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('decisions not bound to current fetch batch', result.stderr)
        self.assertFalse((fixture.state / 'plan.json').exists())


class DecisionValidationTests(WorkspaceCase):
    def test_acknowledgment_cannot_be_reviewed_as_an_absence_reason(self):
        fixture = build_workspace(self)
        incoming = emma_message(mid='absence-1')
        incoming['text'] = 'okok'
        incoming['absenceReason'] = {'attendanceLogId': 'attlog-1', 'reason': 'okok',
                                     'category': 'other'}
        write_pending(fixture, [incoming])
        write_decisions(fixture, [{'messageId': 'absence-1', 'action': 'absence_reason',
                                   'studentKey': EMMA['key'], 'evidence': 'Acknowledgment only.'}])
        result = self.prepare(fixture)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('explicit, substantive student reason', result.stderr)

    def test_reviewed_absence_reason_is_bound_to_captured_platform_row(self):
        fixture = build_workspace(self)
        incoming = emma_message(mid='absence-1')
        incoming['text'] = 'Absence reason: I was ill.'
        incoming['absenceReason'] = {'attendanceLogId': 'attlog-1', 'reason': 'I was ill.', 'category': 'health',
                                     'absenceStartDate': None, 'absenceEndDate': None}
        with sqlite3.connect(fixture.db) as db:
            db.execute('INSERT INTO selector_attendance_log VALUES (?,?,?,?,?,?,?,?)',
                       ('attlog-1', 'session-1', CLASS_S36, EMMA['accountId'], 'absent',
                        'lesson', '2026-09-16T00:00:00+00:00', '2026-09-16T00:00:00+00:00'))
            db.execute('''INSERT INTO absence_followups
                (attendance_log_id,provider,status,recipient_external_id,conversation_id,sent_at,
                 response_message_id,reason_text,reason_category,responded_at,updated_at)
                VALUES (?,?,?,?,?,?,?,?,?,?,?)''',
                       ('attlog-1', 'dingtalk', 'responded', EMMA['dingtalkId'], 'conv-1',
                        '2026-09-16T00:05:00+00:00', 'absence-1', 'I was ill.', 'health',
                        '2026-09-16T02:00:00+00:00', '2026-09-16T02:00:00+00:00'))
        write_pending(fixture, [incoming])
        write_decisions(fixture, [{'messageId': 'absence-1', 'action': 'absence_reason',
                                   'studentKey': EMMA['key'],
                                   'evidence': 'Captured reply to the verified absence prompt.'}])
        prepared = self.prepare(fixture)
        self.assertEqual(prepared.returncode, 0, prepared.stderr)
        self.assertEqual(load_state(fixture, 'plan.json')['absenceReviews'][0]['attendanceLogId'], 'attlog-1')
        committed = self.commit(fixture)
        self.assertEqual(committed.returncode, 0, committed.stderr)
        ledger = load_state(fixture, 'ledger.json')['processed']['absence-1']
        self.assertEqual(ledger['action'], 'absence_reason')

    def test_s33_student_is_rejected(self):
        fixture = build_workspace(self)
        incoming = message('m1', WENDY['dingtalkId'], candidates=[{'key': WENDY['key']}],
                           conversation_id='conv-wendy', title='王芳 Wendy')
        write_pending(fixture, [incoming])
        write_decisions(fixture, [submitted_decision(student=WENDY)])
        result = self.prepare(fixture)
        self.assertNotEqual(result.returncode, 0)
        self.assertFalse((fixture.state / 'plan.json').exists())
        self.assertIsNone(homework_row(fixture.db, WENDY))
        # The explicit class guard itself, with the student resolved:
        update = fresh_import(fixture, 'update')
        students = {WENDY['key']: {'key': WENDY['key'], 'class': 'S3.3',
                                   'dingtalkId': WENDY['dingtalkId']}}
        with self.assertRaises(ValueError) as caught:
            update.verified_student({'studentKey': WENDY['key']}, incoming, students)
        self.assertIn("outside ['S3.6']", str(caught.exception))

    def test_unresolved_identity_is_rejected(self):
        fixture = build_workspace(self)
        write_pending(fixture, [emma_message(sender='DING_UNKNOWN')])
        decision = submitted_decision()
        write_decisions(fixture, [decision])
        # candidates hold Emma's key but the sender is not linked and there are
        # no permitted candidates, so identity is not uniquely resolved.
        write_pending(fixture, [message('m1', 'DING_UNKNOWN', candidates=[])])
        result = self.prepare(fixture)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('identity must be uniquely resolved', result.stderr)

    def test_duplicate_message_decisions_rejected(self):
        fixture = build_workspace(self)
        write_pending(fixture, [emma_message()])
        write_decisions(fixture, [submitted_decision(), submitted_decision()])
        result = self.prepare(fixture)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Duplicate message decision', result.stderr)

    def test_letter_only_without_working_cannot_be_submitted(self):
        fixture = build_workspace(self)
        write_pending(fixture, [emma_message()])
        write_decisions(fixture, [submitted_decision(responseFormat='letter_only',
                                                    workingPhotoPresent=False)])
        result = self.prepare(fixture)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Letter-only answer requires working', result.stderr)

    def test_needs_work_then_submitted_lifecycle(self):
        fixture = build_workspace(self)
        write_pending(fixture, [emma_message()], batch_id='batch-1')
        write_decisions(fixture, [{'messageId': 'm1', 'action': 'needs_work',
                                   'studentKey': EMMA['key'], 'assignment': HEADER,
                                   'evidence': 'answer photo only',
                                   'responseFormat': 'letter_only',
                                   'workingPhotoPresent': False,
                                   'contextReviewed': True,
                                   'workingCheckEvidence': 'no working visible'}],
                        batch_id='batch-1')
        self.assertEqual(self.prepare(fixture).returncode, 0)
        plan = load_state(fixture, 'plan.json')
        self.assertEqual(plan['homeworkWrites'][0]['status'], 'awaiting_working')
        self.assertEqual(self.commit(fixture).returncode, 0)
        row = homework_row(fixture.db)
        self.assertEqual(row['status'], 'awaiting_working')

        write_pending(fixture, [emma_message('m2', time='2026-09-16 11:00:00')], batch_id='batch-2')
        write_decisions(fixture, [submitted_decision('m2')], batch_id='batch-2')
        self.assertEqual(self.prepare(fixture).returncode, 0)
        plan = load_state(fixture, 'plan.json')
        self.assertEqual(plan['homeworkWrites'][0]['oldStatus'], 'awaiting_working')
        self.assertEqual(plan['homeworkWrites'][0]['status'], 'submitted')
        self.assertEqual(self.commit(fixture).returncode, 0)
        self.assertEqual(homework_row(fixture.db)['status'], 'submitted')
        events = sqlite3.connect(fixture.db).execute(
            "SELECT event_type FROM homework_submission_events ORDER BY recorded_at").fetchall()
        self.assertIn(('working_received',), events)

    def test_awaiting_working_never_overwrites_submitted(self):
        fixture = build_workspace(self)
        insert_homework(fixture.db, EMMA, 'submitted')
        write_pending(fixture, [emma_message('m9')])
        write_decisions(fixture, [{'messageId': 'm9', 'action': 'needs_work',
                                   'studentKey': EMMA['key'], 'assignment': HEADER,
                                   'evidence': 'answer photo only',
                                   'responseFormat': 'letter_only',
                                   'workingPhotoPresent': False,
                                   'contextReviewed': True,
                                   'workingCheckEvidence': 'no working visible'}])
        self.assertEqual(self.prepare(fixture).returncode, 0)
        plan = load_state(fixture, 'plan.json')
        self.assertEqual(plan['homeworkWrites'], [])
        self.assertEqual(self.commit(fixture).returncode, 0)
        self.assertEqual(homework_row(fixture.db)['status'], 'submitted')

    def test_teacher_accepted_is_preserved(self):
        fixture = build_workspace(self)
        write_pending(fixture, [emma_message()], batch_id='batch-1')
        write_decisions(fixture, [submitted_decision(teacherAccepted=True)], batch_id='batch-1')
        self.assertEqual(self.prepare(fixture).returncode, 0)
        self.assertEqual(self.commit(fixture).returncode, 0)
        self.assertEqual(homework_row(fixture.db)['teacher_accepted'], 1)

        write_pending(fixture, [emma_message('m2', time='2026-09-16 11:00:00')], batch_id='batch-2')
        write_decisions(fixture, [submitted_decision('m2', teacherAccepted=False)], batch_id='batch-2')
        self.assertEqual(self.prepare(fixture).returncode, 0)
        self.assertEqual(self.commit(fixture).returncode, 0)
        self.assertEqual(homework_row(fixture.db)['teacher_accepted'], 1)

    def test_old_status_mismatch_aborts_commit_and_rolls_back(self):
        fixture = build_workspace(self)
        # Leo's sender is new so the plan carries an identity link; the rollback
        # must undo it together with everything else.
        incoming = message('m1', 'DING_NEW', candidates=[{'key': LEO['key']}],
                           conversation_id='conv-leo', title='李雷')
        write_pending(fixture, [incoming])
        write_decisions(fixture, [submitted_decision(student=LEO)])
        self.assertEqual(self.prepare(fixture).returncode, 0)
        # Teacher edits the row between prepare and commit.
        insert_homework(fixture.db, LEO, 'missing', row_id='hw-teacher')
        result = self.commit(fixture)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('changed after prepare', result.stderr)
        row = homework_row(fixture.db, LEO)
        self.assertEqual(row['status'], 'missing')
        self.assertIsNone(row['evidence_json'])
        connection = sqlite3.connect(fixture.db)
        links = connection.execute(
            "SELECT * FROM student_integrations WHERE external_id='DING_NEW'").fetchall()
        connection.close()
        self.assertEqual(links, [])
        self.assertFalse((fixture.state / 'ledger.json').exists())

    def test_empty_change_set_skips_backup(self):
        fixture = build_workspace(self)
        write_pending(fixture, [emma_message()])
        write_decisions(fixture, [{'messageId': 'm1', 'action': 'ignore',
                                   'studentKey': EMMA['key']}])
        self.assertEqual(self.prepare(fixture).returncode, 0)
        result = self.commit(fixture)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIsNone(json.loads(result.stdout)['backup'])
        self.assertFalse((fixture.tmp / 'backups').exists())
        ledger = load_state(fixture, 'ledger.json')
        self.assertIn('m1', ledger['processed'])
        self.assertIn('checkedThrough', ledger)


class ConcurrencyTests(WorkspaceCase):
    def test_commit_with_held_write_lock_raises_and_backup_restores_state(self):
        fixture = build_workspace(self)
        write_pending(fixture, [emma_message()])
        write_decisions(fixture, [submitted_decision()])
        self.assertEqual(self.prepare(fixture).returncode, 0)
        holder = sqlite3.connect(fixture.db)
        holder.execute('BEGIN IMMEDIATE')
        holder.execute("UPDATE accounts SET updated_at='held' WHERE id=?", (EMMA['accountId'],))
        try:
            result = run_script(fixture, 'update.py', 'commit')
        finally:
            holder.rollback()
            holder.close()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('locked', (result.stderr + result.stdout).lower())
        self.assertIsNone(homework_row(fixture.db))
        backups = list((fixture.tmp / 'backups').glob('*.sqlite'))
        self.assertEqual(len(backups), 1)
        restored = sqlite3.connect(backups[0])
        count = restored.execute('SELECT COUNT(*) FROM homework_submissions').fetchone()[0]
        name = restored.execute('SELECT preferred_name FROM accounts WHERE id=?',
                                (EMMA['accountId'],)).fetchone()[0]
        restored.close()
        self.assertEqual(count, 0)
        self.assertEqual(name, 'Emma')


class EntryPointTests(WorkspaceCase):
    def test_update_without_args_exits_nonzero_without_writes(self):
        fixture = build_workspace(self)
        result = run_script(fixture, 'update.py')
        self.assertNotEqual(result.returncode, 0)
        self.assertFalse((fixture.state / 'plan.json').exists())
        self.assertIsNone(homework_row(fixture.db))

    def test_update_with_invalid_command_exits_nonzero_without_writes(self):
        fixture = build_workspace(self)
        result = run_script(fixture, 'update.py', 'bogus')
        self.assertNotEqual(result.returncode, 0)
        self.assertFalse((fixture.state / 'plan.json').exists())
        self.assertIsNone(homework_row(fixture.db))


class TeacherExceptionTests(unittest.TestCase):
    def exception(self, student=EMMA, **extra):
        decision = {'action': 'submitted', 'studentKey': student['key'],
                    'assignment': HEADER, 'teacherException': True, 'teacherAccepted': True,
                    'authorizedBy': 'Samuel, 2026-09-18',
                    'evidence': 'Teacher-approved exemption; no student submission required.'}
        decision.update(extra)
        return decision

    def test_exception_records_submitted_row_without_receipt(self):
        fixture = build_workspace(self, {})
        write_pending(fixture, [])
        write_decisions(fixture, [self.exception()])
        result = run_script(fixture, 'update.py', 'prepare')
        self.assertEqual(result.returncode, 0, result.stderr)
        plan = load_state(fixture, 'plan.json')
        write = plan['homeworkWrites'][0]
        self.assertEqual(write['status'], 'submitted')
        self.assertTrue(write['teacherAccepted'])
        self.assertIsNone(write['completedAt'])
        self.assertIsNone(write['sourceMessageId'])
        result = run_script(fixture, 'update.py', 'commit')
        self.assertEqual(result.returncode, 0, result.stderr)
        row = homework_row(fixture.db, EMMA)
        self.assertEqual(row['status'], 'submitted')
        self.assertEqual(row['teacher_accepted'], 1)
        # No completion receipt for an exemption.
        save_state(fixture, 'receipts.json', {'enabledAt': '2026-09-18', 'receipts': {}})
        run_script(fixture, 'receipts.py', '--send')
        self.assertEqual(read_log(fixture, 'sends.log'), [])

    def test_exception_requires_authorization_and_evidence(self):
        fixture = build_workspace(self, {})
        write_pending(fixture, [])
        write_decisions(fixture, [self.exception(authorizedBy=None)])
        result = run_script(fixture, 'update.py', 'prepare')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('authorizedBy', result.stdout + result.stderr)

    def test_exception_for_other_class_is_refused(self):
        fixture = build_workspace(self, {})
        write_pending(fixture, [])
        write_decisions(fixture, [self.exception(student=WENDY)])
        result = run_script(fixture, 'update.py', 'prepare')
        self.assertNotEqual(result.returncode, 0)

    def test_exception_does_not_downgrade_a_real_submission(self):
        fixture = build_workspace(self, {})
        insert_homework(fixture.db, EMMA, 'late')
        write_pending(fixture, [])
        write_decisions(fixture, [self.exception()])
        run_script(fixture, 'update.py', 'prepare')
        result = run_script(fixture, 'update.py', 'commit')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(homework_row(fixture.db, EMMA)['status'], 'late')


HW2_HEADER = '18 Sep 2026\nDeflationary gap (9708/31 Q18)'


class MultiAssignmentMessageTests(unittest.TestCase):
    def test_one_message_can_back_two_assignments(self):
        fixture = build_workspace(self, {})
        write_pending(fixture, [message('m-both', 'DING_EMMA', candidates=[
            {'key': EMMA['key'], 'accountId': EMMA['accountId'], 'classId': CLASS_S36,
             'class': 'S3.6', 'name': '张梦', 'english': 'Emma', 'dingtalkId': 'DING_EMMA'}])])
        write_decisions(fixture, [
            {'messageId': 'm-both', 'action': 'submitted', 'studentKey': EMMA['key'],
             'assignment': HEADER, 'evidence': 'photo covers both questions, Q19 side',
             'responseFormat': 'worked', 'workingPhotoPresent': True},
            {'messageId': 'm-both', 'action': 'submitted', 'studentKey': EMMA['key'],
             'assignment': HW2_HEADER, 'evidence': 'photo covers both questions, Q18 side',
             'responseFormat': 'worked', 'workingPhotoPresent': True},
        ])
        result = run_script(fixture, 'update.py', 'prepare')
        self.assertEqual(result.returncode, 0, result.stderr)
        plan = load_state(fixture, 'plan.json')
        self.assertEqual(len(plan['homeworkWrites']), 2)
        result = run_script(fixture, 'update.py', 'commit')
        self.assertEqual(result.returncode, 0, result.stderr)
        ledger = load_state(fixture, 'ledger.json')
        keys = list(ledger['processed'])
        self.assertIn('m-both', keys)
        self.assertEqual(len(keys), 2)
        composite = [k for k in keys if k != 'm-both'][0]
        self.assertTrue(composite.startswith('m-both~dup-'))
        self.assertIsNotNone(homework_row(fixture.db, EMMA))
        connection = sqlite3.connect(fixture.db)
        rows = connection.execute(
            'SELECT assignment_title FROM homework_submissions WHERE student_account_id=?',
            (EMMA['accountId'],)).fetchall()
        connection.close()
        self.assertEqual(sorted(r[0] for r in rows),
                         ['Deflationary gap (9708/31 Q18)', 'Inflationary gap (Q19)'])
        # fetch idempotency: the plain messageId key marks the message as processed.
        self.assertIn('m-both', ledger['processed'])

    def test_receipts_use_the_real_message_id_for_composite_keys(self):
        fixture = build_workspace(self, {})
        write_pending(fixture, [message('m-both', 'DING_EMMA', candidates=[
            {'key': EMMA['key'], 'accountId': EMMA['accountId'], 'classId': CLASS_S36,
             'class': 'S3.6', 'name': '张梦', 'english': 'Emma', 'dingtalkId': 'DING_EMMA'}])])
        write_decisions(fixture, [
            {'messageId': 'm-both', 'action': 'submitted', 'studentKey': EMMA['key'],
             'assignment': HEADER, 'evidence': 'Q19 side',
             'responseFormat': 'worked', 'workingPhotoPresent': True},
            {'messageId': 'm-both', 'action': 'submitted', 'studentKey': EMMA['key'],
             'assignment': HW2_HEADER, 'evidence': 'Q18 side',
             'responseFormat': 'worked', 'workingPhotoPresent': True},
        ])
        run_script(fixture, 'update.py', 'prepare')
        run_script(fixture, 'update.py', 'commit')
        save_state(fixture, 'receipts.json', {'enabledAt': '2026-09-18', 'receipts': {}})
        result = run_script(fixture, 'receipts.py', '--send',
                            extra_env={'MOCK_SCENARIO': str(fixture.scenario_path)})
        self.assertEqual(result.returncode, 0, result.stderr)
        sends = read_log(fixture, 'sends.log')
        self.assertEqual(len(sends), 2)
        connection = sqlite3.connect(fixture.db)
        events = connection.execute(
            "SELECT external_message_id FROM homework_submission_events WHERE event_type='confirmation_sent'").fetchall()
        connection.close()
        self.assertTrue(events)
        self.assertEqual({e[0] for e in events}, {'m-both'})
