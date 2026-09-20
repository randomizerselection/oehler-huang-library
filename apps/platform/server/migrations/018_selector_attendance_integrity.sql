BEGIN IMMEDIATE;

ALTER TABLE selector_sessions ADD COLUMN attendance_finalized_at TEXT;

DELETE FROM selector_attendance_log
WHERE id IN (
  SELECT id FROM (
    SELECT l.id,
      ROW_NUMBER() OVER (
        PARTITION BY l.session_id, l.student_account_id
        ORDER BY EXISTS(SELECT 1 FROM absence_followups f WHERE f.attendance_log_id=l.id) DESC,
          l.recorded_at DESC, l.rowid DESC
      ) AS duplicate_rank
    FROM selector_attendance_log l
  ) ranked
  WHERE duplicate_rank > 1
);

CREATE UNIQUE INDEX selector_attendance_log_session_student_idx
  ON selector_attendance_log(session_id, student_account_id);

UPDATE selector_attendance_log
SET status = (SELECT sa.status FROM selector_attendance sa
      WHERE sa.session_id=selector_attendance_log.session_id
        AND sa.student_account_id=selector_attendance_log.student_account_id),
    marked_at = (SELECT sa.marked_at FROM selector_attendance sa
      WHERE sa.session_id=selector_attendance_log.session_id
        AND sa.student_account_id=selector_attendance_log.student_account_id),
    lesson_content_id = (SELECT se.lesson_content_id FROM selector_sessions se
      WHERE se.id=selector_attendance_log.session_id)
WHERE EXISTS (SELECT 1 FROM selector_attendance sa
  WHERE sa.session_id=selector_attendance_log.session_id
    AND sa.student_account_id=selector_attendance_log.student_account_id);

UPDATE selector_sessions
SET attendance_finalized_at = (
  SELECT MAX(sa.marked_at) FROM selector_attendance sa WHERE sa.session_id=selector_sessions.id
)
WHERE (SELECT COUNT(*) FROM selector_session_roster r WHERE r.session_id=selector_sessions.id) > 0
  AND (SELECT COUNT(*) FROM selector_attendance sa WHERE sa.session_id=selector_sessions.id)
    = (SELECT COUNT(*) FROM selector_session_roster r WHERE r.session_id=selector_sessions.id);

PRAGMA user_version = 18;
COMMIT;
