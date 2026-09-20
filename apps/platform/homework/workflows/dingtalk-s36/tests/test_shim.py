"""Regression tests for dws_shim.py UTF-8 output and dialect translation.

Windows piped stdout defaults to the locale codepage (GBK here), which used to
corrupt CJK DingTalk content before it reached fetch.cli/run_guard. The copied
shim is driven through a fixture "dws" (via the S36_DWS hook) that emits UTF-8
bytes containing CJK; the shim must re-emit valid UTF-8 even when its own
stdio is forced to GBK. The real dws CLI is never invoked.
"""
import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

from fixtures import REAL_DIR

FIXTURE_DWS = '''import json
import sys
# Emit UTF-8 bytes directly so the fixture is immune to the inherited
# locale/PYTHONIOENCODING (this mimics a dws build that writes UTF-8).
payload = {"argv": sys.argv[1:], "name": "\\u8001\\u5e08", "dept": "\\u8001\\u5e08\\u529e\\u516c\\u5ba4"}
sys.stdout.buffer.write(json.dumps(payload, ensure_ascii=False).encode("utf-8"))
'''


class ShimEncodingTests(unittest.TestCase):
    def setUp(self):
        tmp = Path(tempfile.mkdtemp(prefix='s36-shim-test-'))
        self.addCleanup(shutil.rmtree, tmp, True)
        self.tmp = tmp
        self.shim = tmp / 'dws_shim.py'
        shutil.copy(REAL_DIR / 'dws_shim.py', self.shim)
        fixture_py = tmp / 'fixture_dws.py'
        fixture_py.write_text(FIXTURE_DWS, encoding='utf-8')
        self.fixture_cmd = tmp / 'fixture-dws.cmd'
        self.fixture_cmd.write_text(
            f'@echo off\r\n"{sys.executable}" "{fixture_py}" %*\r\n', encoding='utf-8')

    def run_shim(self, *args):
        env = dict(os.environ, S36_DWS=str(self.fixture_cmd),
                   # Force the broken production condition: piped stdio in the
                   # locale codepage. The shim's reconfigure must override it.
                   PYTHONIOENCODING='gbk:replace')
        return subprocess.run([sys.executable, str(self.shim), *args],
                              capture_output=True, env=env, timeout=60)

    def test_cjk_survives_shim_stdout_as_utf8(self):
        result = self.run_shim('contact', 'user', 'get-self')
        self.assertEqual(result.returncode, 0, result.stderr)
        # Strict decode: GBK bytes for 老师 (\xc0\xcf\xca\xa6) would raise here.
        text = result.stdout.decode('utf-8')
        payload = json.loads(text)
        self.assertEqual(payload['name'], '老师')
        self.assertIn('老师', text)

    def test_dialect_translation_still_applies(self):
        result = self.run_shim('chat', 'message', 'send', '--open-dingtalk-id', 'DING_EMMA',
                               '--content', 'hello', '--idempotency-key', 'K1',
                               '--ai-tag=true', '--profile', 'fixture-profile', '--yes')
        self.assertEqual(result.returncode, 0, result.stderr)
        payload = json.loads(result.stdout.decode('utf-8'))
        argv = payload['argv']
        self.assertEqual(argv[:3], ['chat', 'message', 'send'])
        self.assertIn('--text', argv)
        self.assertEqual(argv[argv.index('--text') + 1], 'hello')
        self.assertNotIn('--content', argv)
        self.assertIn('--uuid', argv)
        self.assertEqual(argv[argv.index('--uuid') + 1], 'K1')
        self.assertNotIn('--idempotency-key', argv)
        self.assertFalse(any(a.startswith('--ai-tag') for a in argv))
        self.assertNotIn('--profile', argv)
        self.assertNotIn('fixture-profile', argv)
        self.assertIn('--yes', argv)
        self.assertEqual(argv[-2:], ['--format', 'json'])
        # CJK payload still intact in the same run.
        self.assertEqual(payload['name'], '老师')


if __name__ == '__main__':
    unittest.main()
