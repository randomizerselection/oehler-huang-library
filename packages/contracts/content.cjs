'use strict';

// The Library produces this contract; the Platform consumes it. No app imports.
const CONTENT_SCHEMA = 'oehler-huang-content/1.0.0';
const QUIZ_SCHEMA = 'oehler-huang-quiz-bank/1.0.0';
const CONTENT_FILES = Object.freeze({ manifest: 'generated/content-manifest.json', bank: 'generated/quiz-bank.json' });

function validateContentCatalog(manifest, bank) {
  const check = (condition, message) => {
    if (!condition) throw new Error(`Invalid content catalogue: ${message}. Run npm run build:content.`);
  };
  check(manifest?.schema_version === CONTENT_SCHEMA, 'unsupported manifest schema');
  check(bank?.schema_version === QUIZ_SCHEMA, 'unsupported quiz schema');
  check(/^[a-f0-9]{64}$/.test(manifest.source_hash), 'missing source hash');
  check(manifest.source_hash === bank.source_hash, 'manifest and quiz bank come from different builds');
  check(Array.isArray(manifest.items) && Array.isArray(bank.quizzes), 'missing items or quizzes');
  const items = new Map();
  const routes = new Set();
  for (const item of manifest.items) {
    check(typeof item.id === 'string' && item.id.length && !items.has(item.id), 'missing or duplicate content ID');
    check(typeof item.route === 'string' && item.route.startsWith('/') && !routes.has(item.route), `invalid or duplicate route for ${item.id}`);
    items.set(item.id, item);
    routes.add(item.route);
  }
  const quizzes = new Map();
  for (const quiz of bank.quizzes) {
    check(typeof quiz.id === 'string' && quiz.id.length && !quizzes.has(quiz.id), 'missing or duplicate quiz ID');
    check(typeof quiz.version === 'string' && /^\d+\.\d+\.\d+$/.test(quiz.version), `invalid version for ${quiz.id}`);
    check(Array.isArray(quiz.questions) && quiz.questions.length, `empty quiz ${quiz.id}`);
    const questionIds = new Set();
    for (const question of quiz.questions) {
      check(typeof question.id === 'string' && question.id.length && !questionIds.has(question.id), `duplicate or missing question ID in ${quiz.id}`);
      questionIds.add(question.id);
      check(Number.isFinite(question.points) && question.points > 0, `invalid points in ${quiz.id}`);
      if (question.type === 'multipleChoice') {
        check(Array.isArray(question.choices) && question.choices.length > 1 && Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.choices.length, `invalid choice answer in ${quiz.id}`);
      } else {
        check(question.type === 'fillBlank', `unsupported question type in ${quiz.id}`);
        const answers = question.acceptedAnswers || [question.answer];
        check(Array.isArray(answers) && answers.length && answers.every(answer => typeof answer === 'string' && answer.trim()), `missing accepted answers in ${quiz.id}`);
      }
    }
    quizzes.set(quiz.id, quiz);
  }
  for (const item of items.values()) {
    if (item.quiz_id != null) check(quizzes.get(item.quiz_id)?.route === item.route, `missing or misplaced quiz for ${item.id}`);
  }
  for (const quiz of quizzes.values()) {
    check(manifest.items.some(item => item.quiz_id === quiz.id && item.route === quiz.route), `orphan quiz ${quiz.id}`);
  }
}

module.exports = { CONTENT_SCHEMA, QUIZ_SCHEMA, CONTENT_FILES, validateContentCatalog };
