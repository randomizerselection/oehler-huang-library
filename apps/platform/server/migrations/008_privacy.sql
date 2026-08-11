BEGIN IMMEDIATE;

CREATE TABLE privacy_requests (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  request_type TEXT NOT NULL CHECK (request_type IN ('export', 'correction', 'deletion')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected')),
  details_json TEXT NOT NULL DEFAULT '{}',
  requested_at TEXT NOT NULL,
  completed_at TEXT,
  handled_by_account_id TEXT REFERENCES accounts(id) ON DELETE SET NULL
);
CREATE INDEX privacy_requests_status_idx ON privacy_requests(status, requested_at);

CREATE TABLE platform_settings (
  key TEXT PRIMARY KEY,
  value_json TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  updated_by_account_id TEXT REFERENCES accounts(id) ON DELETE SET NULL
);

PRAGMA user_version = 8;
COMMIT;
