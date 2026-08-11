BEGIN IMMEDIATE;

CREATE TABLE selector_event_log (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL UNIQUE,
  session_id TEXT NOT NULL REFERENCES selector_sessions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  recorded_at TEXT NOT NULL
);

CREATE INDEX idx_selector_event_log_session ON selector_event_log(session_id, recorded_at);
CREATE UNIQUE INDEX selector_one_selection_per_student_idx ON selector_selections(session_id, student_account_id);

PRAGMA user_version = 9;

COMMIT;
