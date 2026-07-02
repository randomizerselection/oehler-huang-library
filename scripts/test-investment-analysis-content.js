const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const courseRoot = path.join(root, 'investment-analysis');

const vagueRevealTitlePattern = /^(?:answer|possible answer|sample answer|model answer|model sentence|model direction|teacher cue|course rule|analysis boundary|bridge(?: to lesson \d+)?)$/i;

function deepProxy() {
  return new Proxy(function noop() {}, {
    get(_target, property) {
      if (property === Symbol.toPrimitive) return () => '';
      return deepProxy();
    },
    apply() {
      return deepProxy();
    }
  });
}

function findInvestmentSlideFiles(dir, base = root) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'test-results' || entry.name === 'output') return [];

    const absolutePath = path.join(dir, entry.name);
    const relativePath = path.relative(base, absolutePath).replace(/\\/g, '/');
    if (relativePath.includes('/archive') || relativePath.includes('-archive-')) return [];
    if (entry.isDirectory()) return findInvestmentSlideFiles(absolutePath, base);
    if (!/^slides.*\.js$/.test(entry.name)) return [];

    return [relativePath];
  });
}

function readInvestmentLesson(relativePath) {
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
  const INVEST = {
    photos: deepProxy(),
    marketData: deepProxy(),
  };
  const context = {
    window: { INVEST },
    INVEST,
    console,
  };
  context.window.window = context.window;
  vm.runInNewContext(source, context, { filename: relativePath });
  return context.window.INVEST.lesson;
}

function hasTemplateGuidance() {
  const readmePath = path.join(courseRoot, '_template', 'README.md');
  const source = fs.readFileSync(readmePath, 'utf8');
  return /discussion\.revealTitle.+concise answer statement/i.test(source);
}

function validateDiscussionRevealTitles() {
  const failures = [];
  const slideFiles = findInvestmentSlideFiles(courseRoot);

  for (const slideFile of slideFiles) {
    const lesson = readInvestmentLesson(slideFile);
    for (const [index, slide] of (lesson.slides || []).entries()) {
      if (slide.type !== 'discussion') continue;
      const revealTitle = String(slide.revealTitle || '').trim();
      if (revealTitle && vagueRevealTitlePattern.test(revealTitle)) {
        failures.push(`${slideFile} slide ${index + 1}: revealTitle "${revealTitle}" is a label, not an answer statement`);
      }
    }
  }

  if (!hasTemplateGuidance()) {
    failures.push('investment-analysis/_template/README.md: missing discussion.revealTitle answer-statement guidance');
  }

  return failures;
}

const failures = validateDiscussionRevealTitles();

if (failures.length > 0) {
  console.error('Investment Analysis content validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Investment Analysis content validation passed.');
