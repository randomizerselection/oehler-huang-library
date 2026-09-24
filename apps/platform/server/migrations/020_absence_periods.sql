BEGIN IMMEDIATE;

ALTER TABLE absence_followups ADD COLUMN absence_start_date TEXT;
ALTER TABLE absence_followups ADD COLUMN absence_end_date TEXT;

CREATE INDEX absence_followups_period_idx
  ON absence_followups(absence_start_date, absence_end_date);

PRAGMA user_version = 20;

COMMIT;
