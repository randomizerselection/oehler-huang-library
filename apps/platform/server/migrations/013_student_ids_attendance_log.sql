BEGIN IMMEDIATE;

ALTER TABLE accounts ADD COLUMN student_id TEXT;

UPDATE accounts SET student_id = (
  SELECT 'STU-' || printf('%04d', seq.rn)
  FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY created_at, username COLLATE NOCASE) AS rn FROM accounts WHERE role='student') seq
  WHERE seq.id = accounts.id
) WHERE role = 'student' AND student_id IS NULL;

CREATE UNIQUE INDEX accounts_student_id_idx ON accounts(student_id) WHERE student_id IS NOT NULL;

CREATE TABLE selector_attendance_log (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES selector_sessions(id) ON DELETE CASCADE,
  class_id TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_account_id TEXT REFERENCES accounts(id) ON DELETE SET NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent')),
  lesson_content_id TEXT,
  marked_at TEXT NOT NULL,
  recorded_at TEXT NOT NULL
);
CREATE INDEX selector_attendance_log_class_idx ON selector_attendance_log(class_id, marked_at DESC);
CREATE INDEX selector_attendance_log_student_idx ON selector_attendance_log(student_account_id, marked_at DESC);

INSERT INTO selector_attendance_log (id, session_id, class_id, student_account_id, status, lesson_content_id, marked_at, recorded_at)
SELECT 'attlog_' || lower(hex(randomblob(16))), sa.session_id, se.class_id, sa.student_account_id, sa.status, se.lesson_content_id, sa.marked_at, sa.marked_at
FROM selector_attendance sa JOIN selector_sessions se ON se.id = sa.session_id;

PRAGMA user_version = 13;
COMMIT;
