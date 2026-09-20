import importlib.util
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import install_compat
from runner import digest, save


class CompatibilityTests(unittest.TestCase):
    def test_wrapper_executes_source_and_preserves_import_patchability(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / 'source/module.py'
            source.parent.mkdir()
            source.write_text('VALUE = 1\ndef value(): return VALUE\n', encoding='utf-8')
            target = root / 'module.py'
            target.write_text(install_compat.wrapper(source), encoding='utf-8')
            spec = importlib.util.spec_from_file_location('fixture_compat', target)
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            module.VALUE = 2
            self.assertEqual(module.value(), 2)
            self.assertEqual(module.__file__, str(source))

    def test_rollback_restores_exact_bytes_and_rejects_intervening_edit(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            target, backup = root / 'fetch.py', root / 'backup.py'
            backup.write_bytes(b'original\r\n')
            target.write_bytes(b'wrapper\n')
            manifest = root / 'manifest.json'
            entry = {'path': str(target), 'backup': str(backup), 'before': digest(backup), 'after': digest(target)}
            save(manifest, {'entries': [entry]})
            with patch.object(install_compat, 'runtime_root', return_value=root):
                target.write_bytes(b'new independent edit')
                with self.assertRaises(RuntimeError):
                    install_compat.rollback(manifest, check_busy=False)
                target.write_bytes(b'wrapper\n')
                install_compat.rollback(manifest, check_busy=False)
                self.assertEqual(target.read_bytes(), b'original\r\n')

    def test_rollback_rejects_targets_outside_registered_roots(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            manifest = root / 'manifest.json'
            save(manifest, {'entries': [{'path': str(root / 'outside.py'), 'backup': None, 'before': None, 'after': None}]})
            with patch.object(install_compat, 'runtime_root', return_value=root / 'runtime'):
                with self.assertRaises(ValueError):
                    install_compat.rollback(manifest, check_busy=False)


if __name__ == '__main__':
    unittest.main()
