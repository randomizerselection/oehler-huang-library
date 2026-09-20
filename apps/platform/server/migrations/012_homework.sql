BEGIN IMMEDIATE;

CREATE TABLE homework_submissions (
  id TEXT PRIMARY KEY,
  class_id TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_account_id TEXT REFERENCES accounts(id) ON DELETE SET NULL,
  assignment_title TEXT NOT NULL,
  assigned_on TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('submitted', 'late', 'missing', 'exempt')),
  source TEXT NOT NULL DEFAULT 'manual',
  note TEXT,
  recorded_by_account_id TEXT REFERENCES accounts(id) ON DELETE SET NULL,
  recorded_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(class_id, student_account_id, assignment_title, assigned_on)
);
CREATE INDEX homework_submissions_class_idx ON homework_submissions(class_id, assigned_on DESC);
CREATE INDEX homework_submissions_student_idx ON homework_submissions(student_account_id, assigned_on DESC);

PRAGMA user_version = 12;
COMMIT;
