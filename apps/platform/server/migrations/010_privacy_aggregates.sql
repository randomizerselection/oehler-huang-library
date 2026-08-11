BEGIN IMMEDIATE;

CREATE TABLE privacy_anonymous_aggregates (
  metric TEXT NOT NULL,
  period TEXT NOT NULL,
  value REAL NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (metric, period)
);

PRAGMA user_version = 10;

COMMIT;
