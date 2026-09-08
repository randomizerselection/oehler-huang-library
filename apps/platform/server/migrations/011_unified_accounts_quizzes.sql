BEGIN IMMEDIATE;

ALTER TABLE accounts ADD COLUMN class_name TEXT;

ALTER TABLE quiz_attempts ADD COLUMN class_name_snapshot TEXT;
ALTER TABLE quiz_attempts ADD COLUMN course_id TEXT;
ALTER TABLE quiz_attempts ADD COLUMN course_title TEXT;
ALTER TABLE quiz_attempts ADD COLUMN lesson_id TEXT;
ALTER TABLE quiz_attempts ADD COLUMN lesson_title TEXT;

CREATE INDEX quiz_attempts_school_idx
  ON quiz_attempts(class_name_snapshot, course_id, lesson_id, quiz_id, submitted_at DESC);
CREATE INDEX quiz_attempts_student_quiz_idx
  ON quiz_attempts(account_id, quiz_id, submitted_at DESC);

PRAGMA user_version = 11;
COMMIT;
