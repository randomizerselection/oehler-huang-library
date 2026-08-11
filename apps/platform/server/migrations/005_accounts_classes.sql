PRAGMA foreign_keys = OFF;
BEGIN IMMEDIATE;

CREATE TABLE accounts_next (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL COLLATE NOCASE UNIQUE,
  display_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_login_at TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled', 'deleted')),
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  deleted_at TEXT
);
INSERT INTO accounts_next (id, username, display_name, password_hash, created_at, updated_at, last_login_at, status, role)
SELECT id, username, display_name, password_hash, created_at, updated_at, last_login_at, status,
       CASE WHEN role IN ('student', 'teacher') THEN role ELSE 'teacher' END
FROM accounts;
DROP TABLE accounts;
ALTER TABLE accounts_next RENAME TO accounts;

CREATE TABLE recovery_codes (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE,
  code_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  used_at TEXT
);
CREATE INDEX recovery_codes_hash_idx ON recovery_codes(code_hash);

CREATE TABLE teacher_invitations (
  id TEXT PRIMARY KEY,
  token_hash TEXT NOT NULL UNIQUE,
  created_by_account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  used_by_account_id TEXT REFERENCES accounts(id) ON DELETE SET NULL
);

CREATE TABLE classes (
  id TEXT PRIMARY KEY,
  owner_account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  join_code_hash TEXT UNIQUE,
  join_code_rotated_at TEXT,
  consent_attested_at TEXT,
  consent_attested_by_account_id TEXT REFERENCES accounts(id) ON DELETE RESTRICT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(owner_account_id, name)
);
CREATE INDEX classes_owner_idx ON classes(owner_account_id, status, updated_at DESC);

CREATE TABLE class_memberships (
  class_id TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'removed')),
  joined_at TEXT NOT NULL,
  removed_at TEXT,
  PRIMARY KEY (class_id, account_id)
);
CREATE INDEX class_memberships_account_idx ON class_memberships(account_id, status, joined_at DESC);

CREATE TABLE class_consent_attestations (
  id TEXT PRIMARY KEY,
  class_id TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  teacher_account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
  statement_version TEXT NOT NULL,
  attested_at TEXT NOT NULL,
  withdrawn_at TEXT
);
CREATE INDEX class_consent_class_idx ON class_consent_attestations(class_id, attested_at DESC);

CREATE TABLE audit_events (
  id TEXT PRIMARY KEY,
  actor_account_id TEXT REFERENCES accounts(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT,
  details_json TEXT NOT NULL DEFAULT '{}',
  occurred_at TEXT NOT NULL
);
CREATE INDEX audit_events_actor_idx ON audit_events(actor_account_id, occurred_at DESC);
CREATE INDEX audit_events_target_idx ON audit_events(target_type, target_id, occurred_at DESC);

PRAGMA user_version = 5;
COMMIT;
PRAGMA foreign_keys = ON;
