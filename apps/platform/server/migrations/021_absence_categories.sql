BEGIN IMMEDIATE;

ALTER TABLE absence_followups ADD COLUMN reason_category TEXT;

CREATE INDEX absence_followups_category_idx
  ON absence_followups(reason_category);

PRAGMA user_version = 21;

COMMIT;
