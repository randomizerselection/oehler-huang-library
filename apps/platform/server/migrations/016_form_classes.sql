BEGIN IMMEDIATE;

ALTER TABLE accounts ADD COLUMN form_class INTEGER
  CHECK (form_class IS NULL OR form_class BETWEEN 1 AND 6);

UPDATE accounts
SET form_class = CAST(substr(student_id, 5, 1) AS INTEGER)
WHERE role = 'student'
  AND length(student_id) = 8
  AND student_id NOT GLOB '*[^0-9]*'
  AND substr(student_id, 5, 1) IN ('1', '2', '3', '4', '5', '6');

CREATE INDEX accounts_form_class_idx
  ON accounts(form_class, student_id)
  WHERE role = 'student' AND status = 'active' AND form_class IS NOT NULL;

PRAGMA user_version = 16;
COMMIT;
