BEGIN IMMEDIATE;

CREATE TABLE learning_assignments (
  id TEXT PRIMARY KEY,
  class_id TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  teacher_account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
  content_id TEXT NOT NULL,
  content_version TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('lesson', 'quiz', 'flashcards', 'investment', 'econmark')),
  title TEXT NOT NULL,
  instructions TEXT NOT NULL DEFAULT '',
  available_at TEXT,
  due_at TEXT,
  completion_rule_json TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX learning_assignments_class_idx ON learning_assignments(class_id, status, due_at);
CREATE INDEX learning_assignments_teacher_idx ON learning_assignments(teacher_account_id, updated_at DESC);

CREATE TABLE quiz_attempts (
  id TEXT PRIMARY KEY,
  quiz_id TEXT NOT NULL,
  quiz_version TEXT NOT NULL,
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  class_id TEXT REFERENCES classes(id) ON DELETE SET NULL,
  learning_assignment_id TEXT REFERENCES learning_assignments(id) ON DELETE SET NULL,
  mode TEXT NOT NULL CHECK (mode IN ('practice', 'assigned')),
  answers_json TEXT NOT NULL,
  result_json TEXT NOT NULL,
  score REAL NOT NULL,
  max_score REAL NOT NULL,
  percentage INTEGER NOT NULL,
  submitted_at TEXT NOT NULL,
  idempotency_key TEXT NOT NULL,
  UNIQUE(account_id, idempotency_key)
);
CREATE INDEX quiz_attempts_account_idx ON quiz_attempts(account_id, submitted_at DESC);
CREATE INDEX quiz_attempts_assignment_idx ON quiz_attempts(learning_assignment_id, submitted_at DESC);

CREATE TABLE learning_events (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL UNIQUE,
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  class_id TEXT REFERENCES classes(id) ON DELETE SET NULL,
  learning_assignment_id TEXT REFERENCES learning_assignments(id) ON DELETE SET NULL,
  content_id TEXT NOT NULL,
  content_version TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_json TEXT NOT NULL DEFAULT '{}',
  occurred_at TEXT NOT NULL,
  received_at TEXT NOT NULL
);
CREATE INDEX learning_events_account_idx ON learning_events(account_id, occurred_at DESC);
CREATE INDEX learning_events_content_idx ON learning_events(content_id, content_version, occurred_at DESC);

CREATE TABLE learning_active_time (
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  content_id TEXT NOT NULL,
  content_version TEXT NOT NULL,
  activity_date TEXT NOT NULL,
  seconds INTEGER NOT NULL DEFAULT 0 CHECK (seconds >= 0),
  last_event_at TEXT NOT NULL,
  PRIMARY KEY (account_id, content_id, content_version, activity_date)
);

CREATE TABLE lesson_progress (
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  content_id TEXT NOT NULL,
  content_version TEXT NOT NULL,
  class_id TEXT REFERENCES classes(id) ON DELETE SET NULL,
  learning_assignment_id TEXT REFERENCES learning_assignments(id) ON DELETE SET NULL,
  last_slide_id TEXT,
  completed_slide_ids_json TEXT NOT NULL DEFAULT '[]',
  completed_at TEXT,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (account_id, content_id, content_version)
);
CREATE INDEX lesson_progress_assignment_idx ON lesson_progress(learning_assignment_id, updated_at DESC);

PRAGMA user_version = 6;
COMMIT;
