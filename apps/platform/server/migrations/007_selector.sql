BEGIN IMMEDIATE;

CREATE TABLE selector_sessions (
  id TEXT PRIMARY KEY,
  teacher_account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
  class_id TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  lesson_content_id TEXT,
  learning_assignment_id TEXT REFERENCES learning_assignments(id) ON DELETE SET NULL,
  selection_policy TEXT NOT NULL DEFAULT 'session_random' CHECK (selection_policy = 'session_random'),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'reset', 'stale')),
  version INTEGER NOT NULL DEFAULT 1,
  started_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  completed_at TEXT
);
CREATE UNIQUE INDEX selector_one_active_idx ON selector_sessions(teacher_account_id, class_id) WHERE status = 'active';
CREATE INDEX selector_sessions_class_idx ON selector_sessions(class_id, started_at DESC);

CREATE TABLE selector_session_roster (
  session_id TEXT NOT NULL REFERENCES selector_sessions(id) ON DELETE CASCADE,
  student_account_id TEXT REFERENCES accounts(id) ON DELETE SET NULL,
  student_display_name TEXT NOT NULL,
  roster_position INTEGER NOT NULL,
  PRIMARY KEY (session_id, student_account_id)
);

CREATE TABLE selector_attendance (
  session_id TEXT NOT NULL REFERENCES selector_sessions(id) ON DELETE CASCADE,
  student_account_id TEXT REFERENCES accounts(id) ON DELETE SET NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent')),
  marked_at TEXT NOT NULL,
  PRIMARY KEY (session_id, student_account_id)
);

CREATE TABLE selector_selections (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL UNIQUE,
  session_id TEXT NOT NULL REFERENCES selector_sessions(id) ON DELETE CASCADE,
  student_account_id TEXT REFERENCES accounts(id) ON DELETE SET NULL,
  sequence_number INTEGER NOT NULL,
  selected_at TEXT NOT NULL,
  outcome TEXT CHECK (outcome IN ('A*', 'A', 'B', 'C', 'No Grade', 'Absent')),
  outcome_at TEXT,
  UNIQUE(session_id, sequence_number)
);
CREATE INDEX selector_selections_student_idx ON selector_selections(student_account_id, selected_at DESC);

PRAGMA user_version = 7;
COMMIT;
