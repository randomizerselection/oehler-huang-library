'use strict';

// Shared by the HTTP server and release planner: deployment must not widen HTTP access.
const PRIVATE_SEGMENTS = /^(?:node_modules|server|config|scripts|tests?|docs?|archive|authoring|planning|references|grading|android-definitions|deploy|coze|evals|prompts|spec|tmp|temp|outputs?|backups?|uploads?|reports?|test-results|playwright-report|coverage|dist|__pycache__)$/i;
const PUBLIC_EXTENSIONS = /\.(?:html|css|js|mjs|json|svg|png|jpe?g|webp|gif|avif|ico|woff2?|ttf|mp3|wav|ogg|mp4|webm|pdf)$/i;

function isSafeRelativePath(file) {
  return typeof file === 'string' && file.length > 0 && !/[\\:\x00-\x1f]/.test(file)
    && file.split('/').every(part => part && part !== '.' && part !== '..');
}

function isPublicFile(app, file) {
  if (!isSafeRelativePath(file)) return false;
  const parts = file.split('/');
  if (parts.some(part => part.startsWith('.') || PRIVATE_SEGMENTS.test(part))) return false;
  if (/(?:^|\/)(?:package(?:-lock)?\.json|[^/]*\.config\.[^/]+|students\.csv|quiz-submissions\.csv|quiz-bank\.json|student-performance-report\.html)$/i.test(file)) return false;
  const extensionAllowed = PUBLIC_EXTENSIONS.test(file) || /(?:^|\/)SOURCE-NOTES\.md$/i.test(file);
  if (!extensionAllowed) return false;
  if (app === 'library') return true;
  if (app === 'platform') return /^(?:(?:index|student|teacher|batch)\.html|(?:src|assets)\/.*)$/.test(file);
  if (app === 'student-selector') return /^(?:index\.html|selector\.(?:js|css)|assets\/.*)$/.test(file);
  return false;
}

// Selector feedback is public text; rosters never are.
function isPublicAsset(app, file) {
  return (app === 'student-selector' && file === 'assets/messages.csv') || isPublicFile(app, file);
}

module.exports = { isPublicAsset, isSafeRelativePath };
