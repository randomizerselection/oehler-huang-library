"""OCR evidence capture: transcription files recorded for review and grading."""
import json
from pathlib import Path
import unittest
import subprocess
from unittest.mock import patch

from fixtures import (EMMA, build_workspace, empty_pages, fresh_import, load_state, message,
                      read_log, run_script, save_state, write_pending)


def incoming(message_id='m1', student=EMMA):
    return message(message_id, student['qqId'], candidates=[{'key': student['key'],
                                                             'accountId': student['accountId'],
                                                             'qqId': student['qqId']}],
                   conversation_id='conv-' + student['accountId'], title=student['key'])


class OcrEvidenceTests(unittest.TestCase):
    def fixture_image(self, image_bytes=b'fixture image'):
        fixture = build_workspace(self, {'pages': empty_pages()})
        image = fixture.state / 'answer.jpg'
        image.write_bytes(image_bytes)
        save_state(fixture, 'media.json', [{'messageId': 'm1', 'path': str(image)}])
        write_pending(fixture, [incoming()])
        return fixture, image, fresh_import(fixture, 'ocr_evidence')

    def test_timeout_uses_one_local_fallback_and_caches_its_provenance(self):
        fixture, image, module = self.fixture_image()
        with patch.object(module, 'cli', side_effect=RuntimeError('OCR_TIMEOUT')) as remote, \
             patch.object(module, 'local_transcribe', return_value={
                 'provider': 'windows-ocr', 'text': 'Machine text', 'frameCount': 1, 'allFrames': True, 'decoderVersion': 2}) as local:
            first = module.run()
            second = module.run()
        self.assertEqual(remote.call_count, 1)
        self.assertEqual(local.call_count, 1)
        self.assertEqual(first['files'][0]['provider'], 'windows-ocr')
        self.assertIn('timed out', first['files'][0]['fallbackReason'])
        self.assertEqual(second['cached'], 1)

    def test_disguised_gif_bypasses_qq_and_empty_result_is_explicit_not_an_error(self):
        fixture, image, module = self.fixture_image(b'GIF89a fixture animation')
        with patch.object(module, 'cli') as remote, patch.object(module, 'local_transcribe', return_value={
                'provider': 'windows-ocr', 'text': '', 'frameCount': 32, 'allFrames': True, 'decoderVersion': 2}) as local:
            first = module.run()
            second = module.run()
        remote.assert_not_called()
        self.assertEqual(local.call_count, 1)
        self.assertEqual(first['files'][0]['status'], 'no-text-found')
        self.assertEqual(second['cached'], 1)
        self.assertEqual(Path(first['files'][0]['transcription']).read_text(), '')
        self.assertEqual(load_state(fixture, 'pending.json')['messages'][0]['messageId'], 'm1')

    def test_both_ocr_failures_leave_no_success_cache_or_fake_transcription(self):
        fixture, image, module = self.fixture_image()
        with patch.object(module, 'cli', side_effect=subprocess.TimeoutExpired('fixture', 40)), \
             patch.object(module, 'local_transcribe', side_effect=RuntimeError('local unavailable')):
            with self.assertRaisesRegex(RuntimeError, 'local unavailable'):
                module.run()
        self.assertFalse(list(module.OCR_DIR.rglob('*.txt')))
        self.assertFalse(list(module.OCR_DIR.rglob('*.json')))

    def test_auth_or_malformed_result_never_triggers_fallback(self):
        fixture, image, module = self.fixture_image()
        with patch.object(module, 'cli', side_effect=RuntimeError('authorization failed')), \
             patch.object(module, 'local_transcribe') as local:
            with self.assertRaises(RuntimeError):
                module.run()
            local.assert_not_called()
        with patch.object(module, 'cli', return_value={'result': {'text': None}}), \
             patch.object(module, 'local_transcribe') as local:
            with self.assertRaises(RuntimeError):
                module.run()
            local.assert_not_called()

    def test_partial_animation_cache_cannot_hide_later_frames(self):
        fixture, image, module = self.fixture_image(b'GIF89a fixture animation')
        digest = module.hashlib.sha256(image.read_bytes()).hexdigest()
        module.save(fixture.state / ('ocr/cache/' + digest + '.json'), {
            'version': 1, 'sha256': digest, 'text': '',
            'textSha256': module.hashlib.sha256(b'').hexdigest(), 'provider': 'windows-ocr'})
        with patch.object(module, 'local_transcribe', return_value={
                'provider': 'windows-ocr', 'text': 'Text from later frame', 'frameCount': 2, 'allFrames': True}):
            result = module.run()
        self.assertEqual(result['cached'], 0)
        self.assertEqual(Path(result['files'][0]['transcription']).read_text(), 'Text from later frame')

    def test_transcribes_pending_evidence_for_resolved_students(self):
        fixture = build_workspace(self, {'pages': empty_pages(),
                                         'ocrText': {'default': ['Discuss whether supply-side', 'Firstly education']}})
        image = str(fixture.state / 'answer.jpg')
        Path(image).write_bytes(b'fixture image')
        save_state(fixture, 'media.json', [{'messageId': 'm1', 'sender': '张梦', 'path': image}])
        write_pending(fixture, [incoming()])
        result = run_script(fixture, 'ocr_evidence.py')
        self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
        self.assertEqual(json.loads(result.stdout)['transcribed'], 1)
        written = (fixture.state / 'ocr' / 'm1-0.txt').read_text(encoding='utf-8')
        self.assertIn('Firstly education', written)
        calls = [row for row in read_log(fixture, 'calls.log')
                 if row[:3] == ['chat', 'message', 'ocr-text']]
        self.assertEqual(len(calls), 1)
        self.assertIn(image, calls[0])

    def test_unchanged_image_reuses_ocr_but_changed_bytes_invalidate(self):
        fixture = build_workspace(self, {'pages': empty_pages(), 'ocrText': {'default': ['answer text']}})
        image = fixture.state / 'answer.jpg'
        image.write_bytes(b'first image')
        save_state(fixture, 'media.json', [{'messageId': 'm1', 'path': str(image)}])
        write_pending(fixture, [incoming()])
        self.assertEqual(run_script(fixture, 'ocr_evidence.py').returncode, 0)
        second = run_script(fixture, 'ocr_evidence.py')
        self.assertEqual(second.returncode, 0, second.stderr)
        self.assertEqual(json.loads(second.stdout)['cached'], 1)
        self.assertEqual(json.loads(second.stdout)['transcribed'], 0)
        image.write_bytes(b'different image')
        third = run_script(fixture, 'ocr_evidence.py')
        self.assertEqual(third.returncode, 0, third.stderr)
        self.assertEqual(json.loads(third.stdout)['transcribed'], 1)
        calls = [r for r in read_log(fixture, 'calls.log') if r[:3] == ['chat', 'message', 'ocr-text']]
        self.assertEqual(len(calls), 2)

    def test_unresolved_sender_produces_no_transcription(self):
        fixture = build_workspace(self, {'pages': empty_pages(),
                                         'ocrText': {'default': ['should not be used']}})
        save_state(fixture, 'media.json', [{'messageId': 'm1', 'sender': 'unknown', 'path': 'C:/tmp/x.jpg'}])
        ambiguous = incoming()
        ambiguous['candidates'] = [{'key': 'IC3.1|1|张梦', 'accountId': 'acct-a', 'qqId': 'OTHER-1'},
                                   {'key': 'IC3.1|2|李雷', 'accountId': 'acct-b', 'qqId': 'OTHER-2'}]
        write_pending(fixture, [ambiguous])
        result = run_script(fixture, 'ocr_evidence.py')
        self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
        report = json.loads(result.stdout)
        self.assertEqual(report['transcribed'], 0)
        self.assertEqual(report['skipped'][0]['reason'], 'sender not uniquely resolved')
        self.assertFalse((fixture.state / 'ocr' / 'm1-0.txt').exists())

    def test_one_student_in_two_classes_is_still_uniquely_resolved(self):
        # The same account appears once per class; the linked QQ number decides.
        fixture = build_workspace(self, {'pages': empty_pages(),
                                         'ocrText': {'default': ['one answer']}})
        image = str(fixture.state / 'answer.jpg')
        Path(image).write_bytes(b'fixture image')
        save_state(fixture, 'media.json', [{'messageId': 'm1', 'sender': '张梦', 'path': image}])
        both = incoming()
        both['candidates'] = [{'key': 'IC3.1|1|张梦', 'accountId': EMMA['accountId'], 'qqId': EMMA['qqId']},
                              {'key': 'IC3 Investment|1|张梦', 'accountId': EMMA['accountId'], 'qqId': EMMA['qqId']}]
        write_pending(fixture, [both])
        result = run_script(fixture, 'ocr_evidence.py')
        self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
        self.assertEqual(json.loads(result.stdout)['transcribed'], 1)
        self.assertTrue((fixture.state / 'ocr' / 'm1-0.txt').exists())


if __name__ == '__main__':
    unittest.main()
