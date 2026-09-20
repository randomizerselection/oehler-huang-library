"""Regression tests: compat download-media envelope (downloadUrl) and the
cli() acceptance rules."""
import hashlib
import json
import os
import unittest

from fixtures import (build_workspace, calls_for, fresh_import, load_state,
                      message, run_script, set_scenario, write_pending)

IMAGE_BYTES = b'\x89PNG-fixture-evidence-bytes\r\n\x1a\n'


def media_path(fixture, mid, index=0):
    name = hashlib.sha256(mid.encode()).hexdigest()[:16] + f'-{index}.jpg'
    return fixture.state / 'media' / name


def image_pending(fixture):
    write_pending(fixture, [message(
        'm1', 'DING_EMMA',
        resources=[{'resourceType': 'image', 'resourceId': 'res-1'}])])


class CompatDownloadTests(unittest.TestCase):
    def test_download_url_envelope_is_fetched_to_expected_path(self):
        fixture = build_workspace(self)
        image = fixture.tmp / 'evidence.png'
        image.write_bytes(IMAGE_BYTES)
        set_scenario(fixture, {'downloadMedia': {'mode': 'compat', 'url': image.as_uri()}})
        image_pending(fixture)
        result = run_script(fixture, 'media.py')
        self.assertEqual(result.returncode, 0, result.stderr)
        target = media_path(fixture, 'm1')
        self.assertEqual(target.read_bytes(), IMAGE_BYTES)
        listing = load_state(fixture, 'media.json')
        self.assertEqual(listing, [{'messageId': 'm1', 'sender': '张梦 Emma', 'path': str(target)}])

        # Second run: the file exists, so no re-download is requested.
        result = run_script(fixture, 'media.py')
        self.assertEqual(result.returncode, 0, result.stderr)
        downloads = calls_for(fixture, 'chat', 'message', 'download-media')
        self.assertEqual(len(downloads), 1)
        self.assertEqual(media_path(fixture, 'm1').read_bytes(), IMAGE_BYTES)

    def test_legacy_direct_save_still_works(self):
        fixture = build_workspace(self, {'downloadMedia': {'mode': 'save'}})
        image_pending(fixture)
        result = run_script(fixture, 'media.py')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertTrue(media_path(fixture, 'm1').exists())

    def test_failed_envelope_raises_and_writes_nothing(self):
        fixture = build_workspace(self, {'downloadMedia': {'mode': 'compat-fail'}})
        image_pending(fixture)
        result = run_script(fixture, 'media.py')
        self.assertNotEqual(result.returncode, 0)
        self.assertFalse(media_path(fixture, 'm1').exists())
        self.assertFalse((fixture.state / 'media.json').exists())


class CliAcceptanceTests(unittest.TestCase):
    def setUp(self):
        self.saved_env = {key: os.environ.get(key) for key in ('MOCK_SCENARIO', 'MOCK_LOG_DIR')}

    def tearDown(self):
        for key, value in self.saved_env.items():
            if value is None:
                os.environ.pop(key, None)
            else:
                os.environ[key] = value

    def activate(self, fixture):
        os.environ['MOCK_SCENARIO'] = str(fixture.scenario_path)
        os.environ['MOCK_LOG_DIR'] = str(fixture.logs)

    def download(self, module, fixture):
        return module.cli(['chat', 'message', 'download-media', '--type', 'mediaId',
                           '--resource-id', 'res-1', '--message-id', 'm1',
                           '--open-conversation-id', 'conv-emma',
                           '--output', str(fixture.tmp / 'x.jpg')])

    def test_compat_envelope_accepted_and_failures_rejected(self):
        fixture = build_workspace(self, {'downloadMedia': {
            'mode': 'compat', 'url': 'https://example.invalid/signed.jpg?x=1'}})
        self.activate(fixture)
        fetch = fresh_import(fixture, 'fetch')
        result = self.download(fetch, fixture)
        self.assertEqual(result['response']['content']['result']['downloadUrl'],
                         'https://example.invalid/signed.jpg?x=1')

        set_scenario(fixture, {'downloadMedia': {'mode': 'compat-fail'}})
        with self.assertRaises(RuntimeError):
            self.download(fetch, fixture)

        set_scenario(fixture, {'downloadMedia': {'mode': 'garbage'}})
        with self.assertRaises(RuntimeError) as caught:
            self.download(fetch, fixture)
        self.assertIn('non-JSON', str(caught.exception))


if __name__ == '__main__':
    unittest.main()
