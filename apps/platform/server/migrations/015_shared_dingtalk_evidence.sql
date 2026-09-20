BEGIN IMMEDIATE;

DROP INDEX homework_submissions_source_message_idx;
CREATE INDEX homework_submissions_source_message_idx
  ON homework_submissions(source, source_message_id)
  WHERE source_message_id IS NOT NULL;

ALTER TABLE homework_submission_events RENAME TO homework_submission_events_v14;

CREATE TABLE homework_submission_events (
  id TEXT PRIMARY KEY,
  homework_submission_id TEXT NOT NULL REFERENCES homework_submissions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('submitted', 'awaiting_working', 'working_received', 'teacher_accepted', 'confirmation_sent')),
  provider TEXT NOT NULL DEFAULT 'manual',
  external_message_id TEXT,
  occurred_at TEXT NOT NULL,
  evidence_json TEXT,
  recorded_at TEXT NOT NULL,
  UNIQUE(homework_submission_id, provider, external_message_id, event_type)
);

INSERT INTO homework_submission_events (
  id, homework_submission_id, event_type, provider, external_message_id,
  occurred_at, evidence_json, recorded_at
)
SELECT
  id, homework_submission_id, event_type, provider, external_message_id,
  occurred_at, evidence_json, recorded_at
FROM homework_submission_events_v14;

DROP TABLE homework_submission_events_v14;
CREATE INDEX homework_submission_events_submission_idx
  ON homework_submission_events(homework_submission_id, occurred_at);

PRAGMA user_version = 15;
COMMIT;
