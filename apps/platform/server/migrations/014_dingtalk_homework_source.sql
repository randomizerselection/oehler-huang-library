BEGIN IMMEDIATE;

ALTER TABLE accounts ADD COLUMN legal_name TEXT;
ALTER TABLE accounts ADD COLUMN preferred_name TEXT;

UPDATE accounts
SET legal_name = CASE
      WHEN instr(display_name, ' ') > 0 THEN substr(display_name, 1, instr(display_name, ' ') - 1)
      ELSE display_name
    END,
    preferred_name = CASE
      WHEN instr(display_name, ' ') > 0 THEN trim(substr(display_name, instr(display_name, ' ') + 1))
      ELSE NULL
    END
WHERE role = 'student';

ALTER TABLE class_memberships ADD COLUMN roster_number INTEGER;
CREATE UNIQUE INDEX class_memberships_roster_number_idx
  ON class_memberships(class_id, roster_number)
  WHERE roster_number IS NOT NULL AND status = 'active';

ALTER TABLE homework_submissions RENAME TO homework_submissions_v12;

CREATE TABLE homework_submissions (
  id TEXT PRIMARY KEY,
  class_id TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_account_id TEXT REFERENCES accounts(id) ON DELETE SET NULL,
  assignment_title TEXT NOT NULL,
  assigned_on TEXT NOT NULL,
  due_at TEXT,
  status TEXT NOT NULL CHECK (status IN ('submitted', 'late', 'missing', 'exempt', 'awaiting_working')),
  completed_at TEXT,
  is_late INTEGER CHECK (is_late IS NULL OR is_late IN (0, 1)),
  teacher_accepted INTEGER NOT NULL DEFAULT 0 CHECK (teacher_accepted IN (0, 1)),
  source TEXT NOT NULL DEFAULT 'manual',
  source_message_id TEXT,
  evidence_json TEXT,
  note TEXT,
  confirmation_sent_at TEXT,
  last_activity_at TEXT,
  recorded_by_account_id TEXT REFERENCES accounts(id) ON DELETE SET NULL,
  recorded_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(class_id, student_account_id, assignment_title, assigned_on)
);

INSERT INTO homework_submissions (
  id, class_id, student_account_id, assignment_title, assigned_on, status,
  completed_at, is_late, teacher_accepted, source, note, last_activity_at,
  recorded_by_account_id, recorded_at, updated_at
)
SELECT
  id, class_id, student_account_id, assignment_title, assigned_on,
  CASE WHEN status = 'submitted' AND note = 'Awaiting working' THEN 'awaiting_working' ELSE status END,
  CASE WHEN status IN ('submitted', 'late') AND COALESCE(note, '') <> 'Awaiting working' THEN updated_at ELSE NULL END,
  CASE WHEN status = 'late' THEN 1 WHEN status = 'submitted' AND COALESCE(note, '') <> 'Awaiting working' THEN 0 ELSE NULL END,
  0, source, CASE WHEN note = 'Awaiting working' THEN NULL ELSE note END, updated_at,
  recorded_by_account_id, recorded_at, updated_at
FROM homework_submissions_v12;

DROP TABLE homework_submissions_v12;
CREATE INDEX homework_submissions_class_idx ON homework_submissions(class_id, assigned_on DESC);
CREATE INDEX homework_submissions_student_idx ON homework_submissions(student_account_id, assigned_on DESC);
CREATE UNIQUE INDEX homework_submissions_source_message_idx
  ON homework_submissions(source, source_message_id)
  WHERE source_message_id IS NOT NULL;

CREATE TABLE student_integrations (
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  external_id TEXT NOT NULL,
  verified_at TEXT NOT NULL,
  metadata_json TEXT,
  PRIMARY KEY (account_id, provider),
  UNIQUE (provider, external_id)
);
CREATE INDEX student_integrations_external_idx ON student_integrations(provider, external_id);

CREATE TABLE homework_submission_events (
  id TEXT PRIMARY KEY,
  homework_submission_id TEXT NOT NULL REFERENCES homework_submissions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('submitted', 'awaiting_working', 'working_received', 'teacher_accepted', 'confirmation_sent')),
  provider TEXT NOT NULL DEFAULT 'manual',
  external_message_id TEXT,
  occurred_at TEXT NOT NULL,
  evidence_json TEXT,
  recorded_at TEXT NOT NULL,
  UNIQUE(provider, external_message_id, event_type)
);
CREATE INDEX homework_submission_events_submission_idx
  ON homework_submission_events(homework_submission_id, occurred_at);

PRAGMA user_version = 14;
COMMIT;
