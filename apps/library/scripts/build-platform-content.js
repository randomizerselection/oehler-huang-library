const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const { CONTENT_SCHEMA, QUIZ_SCHEMA, CONTENT_FILES, validateContentCatalog } = require('@oehler-huang/contracts/content');
const { activeContentFiles } = require('./content-sources.js');

const root = path.resolve(__dirname, '..');
const generatedRoot = path.join(root, 'generated');

function routeFor(file) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  if (relative === 'index.html') return '/';
  const withoutIndex = relative.endsWith('/index.html') ? relative.slice(0, -10) : relative.replace(/\.html$/i, '');
  return `/${withoutIndex.replace(/^\/+|\/+$/g, '')}/`;
}

function contentId(route) {
  return route.replace(/^\/+|\/+$/g, '').replaceAll('/', ':') || 'library:home';
}

function htmlTitle(source, fallback) {
  const match = source.match(/<title>([^<]+)<\/title>/i);
  return (match?.[1] || fallback).replace(/\s+/g, ' ').trim();
}

function referencedScripts(htmlFile, source) {
  const base = path.dirname(htmlFile);
  return [...source.matchAll(/<script[^>]+src=["']([^"']+)["'][^>]*><\/script>/gi)]
    .map((match) => match[1].split(/[?#]/)[0])
    .filter((src) => !/^(?:https?:)?\/\//i.test(src))
    .map((src) => src.startsWith('/') ? path.join(root, src) : path.resolve(base, src))
    .filter((file) => {
      const relative = path.relative(root, file);
      return relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative) && fs.existsSync(file);
    });
}

function evaluateQuiz(file) {
  const window = { IGCSE: {}, INVEST: {} };
  const sandbox = { window, IGCSE: window.IGCSE, INVEST: window.INVEST, console };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file, timeout: 1000 });
  return window.IGCSE.quiz || window.INVEST.quiz || null;
}

function normalizeQuiz(raw, file, route) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const requiredText = (value, label) => {
    const text = String(value || '').normalize('NFKC').trim();
    if (!text) throw new Error(`${relative}: ${label} is required.`);
    return text;
  };
  const id = requiredText(raw?.id, 'quiz id');
  const version = requiredText(raw?.version, 'quiz version');
  const seen = new Set();
  const questions = (raw.questions || []).map((question, index) => {
    const questionId = requiredText(question.id, `question ${index + 1} id`);
    if (seen.has(questionId)) throw new Error(`Duplicate question id ${questionId} in ${file}`);
    seen.add(questionId);
    if (!['multipleChoice', 'fillBlank'].includes(question.type)) throw new Error(`Unsupported question type ${question.type} in ${file}`);
    if (question.type === 'multipleChoice' && (!Array.isArray(question.choices) || !Number.isInteger(question.answer))) throw new Error(`Invalid multiple-choice answer for ${questionId}`);
    if (question.type === 'fillBlank' && !Array.isArray(question.acceptedAnswers) && !question.answer) throw new Error(`Invalid fill-blank answer for ${questionId}`);
    return { ...question, id: questionId, points: Number.isFinite(question.points) ? question.points : 1 };
  });
  if (!questions.length) throw new Error(`Quiz ${id} has no questions.`);
  const investment = relative.startsWith('investment-analysis/');
  const lessonDirectory = path.basename(path.dirname(file));
  return {
    id,
    version,
    course_id: investment ? 'investment-analysis' : 'economics',
    course_title: investment ? 'Investment and Financial Decision-Making' : 'Cambridge IGCSE Economics 0455',
    lesson_id: investment ? lessonDirectory : id.replace(/-lesson-\d+$/, ''),
    lesson_title: String(raw.title || lessonDirectory).replace(/\s+quiz$/i, ''),
    title: String(raw.title || id),
    description: String(raw.description || ''),
    route,
    source: relative,
    questions
  };
}

function build({ write = true } = {}) {
  const htmlFiles = activeContentFiles(root).map(file => path.join(root, file));
  const contents = [];
  const quizzes = [];
  const quizIds = new Set();

  for (const htmlFile of htmlFiles) {
    const source = fs.readFileSync(htmlFile, 'utf8');
    const route = routeFor(htmlFile);
    const scripts = referencedScripts(htmlFile, source);
    const quizFile = scripts.find((file) => path.dirname(file) === path.dirname(htmlFile) && /(?:^|[\\/])quiz(?:-[^\\/]+)?\.js$/i.test(file));
    let quiz = null;
    if (quizFile) {
      quiz = normalizeQuiz(evaluateQuiz(quizFile), quizFile, route);
      if (quizIds.has(quiz.id)) throw new Error(`Duplicate quiz id ${quiz.id}`);
      quizIds.add(quiz.id);
      quizzes.push(quiz);
    }
    const id = contentId(route);
    contents.push({
      id,
      version: '1.0.0',
      kind: route.startsWith('/investment-analysis/') ? 'investment' : route.startsWith('/lessons/') ? 'lesson' : 'lesson',
      title: htmlTitle(source, id),
      route,
      quiz_id: quiz?.id || null,
      slide_id_pattern: `${id}:slide-{1-based-index}`
    });
  }

  contents.sort((left, right) => left.route.localeCompare(right.route));
  quizzes.sort((left, right) => left.id.localeCompare(right.id));
  const sourceHash = createHash('sha256').update(JSON.stringify({ contents, quizzes })).digest('hex');
  const manifest = { schema_version: CONTENT_SCHEMA, source_hash: sourceHash, items: contents };
  const bank = { schema_version: QUIZ_SCHEMA, source_hash: sourceHash, quizzes };
  validateContentCatalog(manifest, bank);
  if (write) {
    fs.mkdirSync(generatedRoot, { recursive: true });
    // Atomic replacement also breaks hard links used by overlay releases.
    for (const [file, value] of [[CONTENT_FILES.manifest, manifest], [CONTENT_FILES.bank, bank]]) {
      const destination = path.join(root, file);
      const temporary = `${destination}.${process.pid}.tmp`;
      try {
        fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`);
        fs.renameSync(temporary, destination);
      } finally {
        fs.rmSync(temporary, { force: true });
      }
    }
  }
  return { manifest, bank };
}

if (require.main === module) {
  const result = build();
  console.log(`Generated ${result.manifest.items.length} content items and ${result.bank.quizzes.length} quizzes.`);
}

module.exports = { build };
