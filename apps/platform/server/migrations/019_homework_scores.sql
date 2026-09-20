BEGIN IMMEDIATE;

ALTER TABLE homework_submissions ADD COLUMN score INTEGER;
ALTER TABLE homework_submissions ADD COLUMN score_max INTEGER;
ALTER TABLE homework_submissions ADD COLUMN feedback TEXT;
ALTER TABLE homework_submissions ADD COLUMN graded_at TEXT;

PRAGMA user_version = 19;

COMMIT;