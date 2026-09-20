"""Scenario group 12 (static part): entry-point source safety scan."""
import unittest

from fixtures import REAL_DIR

SCANNED = ['fetch.py', 'update.py', 'receipts.py', 'working_followups.py',
           'english_name_ack.py', 'run_guard.py', 'personal_requests.py']
FORBIDDEN = ['auth login', 'reminders', 'daily_campaign', 'category']


class StaticSafetyTests(unittest.TestCase):
    def test_no_forbidden_commands_in_entry_points(self):
        for name in SCANNED:
            source = (REAL_DIR / name).read_text(encoding='utf-8').lower()
            for token in FORBIDDEN:
                self.assertNotIn(token, source, f'{name} references {token!r}')


if __name__ == '__main__':
    unittest.main()
