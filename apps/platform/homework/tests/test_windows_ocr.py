"""Native fallback regression: a synthetic GIF has text only in its second frame."""
import json
import os
from pathlib import Path
import subprocess
import unittest

HOME = Path(__file__).resolve().parents[1]


@unittest.skipUnless(os.name == 'nt', 'Windows OCR is a Windows-only fallback')
class WindowsOcrTests(unittest.TestCase):
    def test_text_in_a_later_animation_frame_is_not_lost(self):
        shell = Path(os.environ.get('SystemRoot', 'C:/Windows')) / 'System32/WindowsPowerShell/v1.0/powershell.exe'
        result = subprocess.run([str(shell), '-NoProfile', '-NonInteractive', '-File',
                                 str(HOME / 'workflows/qq-ic3/windows_ocr.ps1'), '-ImagePath',
                                 str(HOME / 'tests/fixtures/ocr-later-frame.gif')],
                                capture_output=True, encoding='utf-8-sig', errors='replace', timeout=20)
        self.assertEqual(result.returncode, 0, result.stderr)
        data = json.loads(result.stdout)
        self.assertEqual(data['frameCount'], 2)
        self.assertTrue(data['allFrames'])
        self.assertIn('Homework 1', data['text'])
        self.assertEqual(data['decoderVersion'], 2)
