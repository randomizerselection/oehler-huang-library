BEGIN IMMEDIATE;

CREATE TABLE absence_followups (
  attendance_log_id TEXT PRIMARY KEY REFERENCES selector_attendance_log(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'dingtalk' CHECK (provider = 'dingtalk'),
  status TEXT NOT NULL CHECK (status IN ('pending', 'sent', 'responded', 'unreachable', 'failed')),
  recipient_external_id TEXT,
  outbound_message_id TEXT,
  conversation_id TEXT,
  message_text TEXT,
  lesson_pdf_name TEXT,
  lesson_pdf_sha256 TEXT,
  sent_at TEXT,
  response_message_id TEXT UNIQUE,
  reason_text TEXT,
  responded_at TEXT,
  updated_at TEXT NOT NULL
);

CREATE INDEX absence_followups_status_idx ON absence_followups(status, sent_at);
CREATE INDEX absence_followups_conversation_idx ON absence_followups(conversation_id, sent_at);

PRAGMA user_version = 17;
COMMIT;
