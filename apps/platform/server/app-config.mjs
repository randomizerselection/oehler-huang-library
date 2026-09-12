import { resolve } from "node:path";

const DEFAULT_STUDENT_CLASSES = Object.freeze([
  "IC 1.1", "IC 1.2", "IC 1.3", "IC 2.1", "IC 2.2", "IC 3.1", "IC 3.2"
]);

function boundedInteger(value, fallback, minimum, maximum) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return fallback;
  return Math.max(minimum, Math.min(parsed, maximum));
}

function booleanValue(value, fallback = false) {
  if (value == null || value === "") return fallback;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

function commaSeparated(value, fallback) {
  const values = String(value ?? "")
    .split(",")
    .map((item) => item.normalize("NFKC").trim())
    .filter(Boolean);
  return Object.freeze(values.length ? [...new Set(values)] : [...fallback]);
}

export function resolveAppConfig(env = process.env, root = process.cwd()) {
  const teacherMaxFileMb = boundedInteger(env.OH_TEACHER_MAX_FILE_MB ?? env.ECONMARK_MAX_FILE_MB, 32, 1, 250);
  const studentMaxFileMb = boundedInteger(env.OH_STUDENT_MAX_FILE_MB, 16, 1, teacherMaxFileMb);
  const maxBatchSize = boundedInteger(env.ECONMARK_MAX_BATCH_SIZE, 100, 1, 500);
  const maxBatchTotalMb = boundedInteger(env.OH_BATCH_TOTAL_MB ?? env.ECONMARK_MAX_BATCH_TOTAL_MB, 512, teacherMaxFileMb, 4096);
  const batchConcurrency = boundedInteger(env.ECONMARK_BATCH_CONCURRENCY, 4, 1, 12);
  const studentStorageMb = boundedInteger(env.OH_STUDENT_STORAGE_MB, 100, 16, 102400);
  const teacherStorageMb = boundedInteger(env.OH_TEACHER_STORAGE_MB, 2048, 64, 1024000);
  const sessionDays = boundedInteger(env.ECONMARK_SESSION_DAYS, 30, 1, 365);
  const loginAttemptsPer15Minutes = boundedInteger(env.ECONMARK_LOGIN_ATTEMPTS_PER_15_MINUTES, 12, 3, 100);
  const gradingRequestsPerHour = boundedInteger(env.ECONMARK_GRADING_REQUESTS_PER_HOUR, 150, 1, 5000);
  const maxRequestMb = boundedInteger(
    env.ECONMARK_MAX_REQUEST_MB,
    Math.max(48, Math.ceil(teacherMaxFileMb * 1.5)),
    teacherMaxFileMb,
    512
  );
  const teacherInviteCode = String(env.ECONMARK_TEACHER_INVITE_CODE ?? "").trim();
  const studentClasses = commaSeparated(env.ECONMARK_STUDENT_CLASSES, DEFAULT_STUDENT_CLASSES);
  const econmarkPrivate = booleanValue(env.OH_ECONMARK_PRIVATE, true);
  return Object.freeze({
    econmarkPrivate,
    classJoinRequired: econmarkPrivate,
    dataDir: resolve(root, env.OH_DATA_DIR || env.ECONMARK_DATA_DIR || "../../.platform-data"),
    libraryRoot: resolve(root, env.OH_LIBRARY_ROOT || "../library"),
    selectorRoot: resolve(root, env.OH_SELECTOR_ROOT || "../student-selector"),
    maxFileMb: teacherMaxFileMb,
    maxFileBytes: teacherMaxFileMb * 1024 * 1024,
    studentMaxFileBytes: studentMaxFileMb * 1024 * 1024,
    teacherMaxFileBytes: teacherMaxFileMb * 1024 * 1024,
    maxBatchSize,
    maxBatchTotalMb,
    maxBatchTotalBytes: maxBatchTotalMb * 1024 * 1024,
    batchConcurrency,
    maxAccountStorageGb: teacherStorageMb / 1024,
    maxAccountStorageBytes: teacherStorageMb * 1024 * 1024,
    studentStorageBytes: studentStorageMb * 1024 * 1024,
    teacherStorageBytes: teacherStorageMb * 1024 * 1024,
    maxRequestBytes: maxRequestMb * 1024 * 1024,
    teacherInviteCode,
    studentClasses,
    sessionDays,
    sessionTtlMs: sessionDays * 24 * 60 * 60 * 1000,
    loginAttemptsPer15Minutes,
    gradingRequestsPerHour,
    cookieSecure: booleanValue(env.ECONMARK_COOKIE_SECURE, false),
    cookieName: "oh_session",
    allowLegacyRegistration: !econmarkPrivate && booleanValue(env.OH_ALLOW_LEGACY_REGISTRATION, false),
    diskWarnPercent: boundedInteger(env.OH_DISK_WARN_PERCENT, 60, 1, 99),
    diskCriticalPercent: boundedInteger(env.OH_DISK_CRITICAL_PERCENT, 70, 1, 99),
    diskUploadStopPercent: boundedInteger(env.OH_DISK_UPLOAD_STOP_PERCENT, 80, 1, 99),
    public: Object.freeze({
      max_file_mb: teacherMaxFileMb,
      student_max_file_mb: studentMaxFileMb,
      teacher_max_file_mb: teacherMaxFileMb,
      max_batch_size: maxBatchSize,
      max_batch_total_mb: maxBatchTotalMb,
      batch_concurrency: batchConcurrency,
      student_storage_mb: studentStorageMb,
      teacher_storage_mb: teacherStorageMb,
      permanent_storage: true,
      account_required_for_uploads: true,
      econmark_private: econmarkPrivate,
      public_samples_enabled: !econmarkPrivate,
      teacher_registration_enabled: true,
      class_join_required: econmarkPrivate,
      student_classes: studentClasses,
      platform_base_path: "/econmark",
      disk_warn_percent: boundedInteger(env.OH_DISK_WARN_PERCENT, 60, 1, 99),
      disk_critical_percent: boundedInteger(env.OH_DISK_CRITICAL_PERCENT, 70, 1, 99),
      disk_upload_stop_percent: boundedInteger(env.OH_DISK_UPLOAD_STOP_PERCENT, 80, 1, 99)
    })
  });
}

export { DEFAULT_STUDENT_CLASSES };
