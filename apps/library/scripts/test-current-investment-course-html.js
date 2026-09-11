const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const courseRoot = path.join(root, 'investment-analysis');
const indexPath = path.join(courseRoot, 'index.html');
const syllabusPath = path.join(courseRoot, 'syllabus-2026-27.html');
const expectedLessons = [
  {
    route: 'lessons/stock-market-game-launch/index.html',
    directory: 'stock-market-game-launch',
    number: 4,
    title: 'Stock Market Game: weekend launch',
  },
  {
    route: 'lessons/1-1-2-measuring-investment-return/index.html',
    directory: '1-1-2-measuring-investment-return',
    number: 2,
    title: 'Measuring investment return',
  },
  {
    route: 'lessons/1-1-3-compound-growth/index.html',
    directory: '1-1-3-compound-growth',
    number: 3,
    title: 'Compound growth',
  },
  {
    route: 'lessons/1-1-3-assumed-return/index.html',
    directory: '1-1-3-assumed-return',
    number: 4,
    title: 'Assumed return',
  },
  {
    route: 'lessons/1-1-4-nominal-real-return/index.html',
    directory: '1-1-4-nominal-real-return',
    number: 5,
    title: 'Nominal and real return',
  },
];

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const indexSource = fs.readFileSync(indexPath, 'utf8');
const publishedRoutes = [...new Set(
  [...indexSource.matchAll(/href=["'](lessons\/[^"']+\/index\.html)["']/g)].map((match) => match[1]),
)];

check(
  JSON.stringify(publishedRoutes.sort()) === JSON.stringify(expectedLessons.map((lesson) => lesson.route).sort()),
  `investment-analysis/index.html must publish the current HTML lessons; found ${publishedRoutes.join(', ') || 'none'}`,
);
check(!/unit-1\/lesson-\d+\/index\.html/.test(indexSource), 'investment-analysis/index.html must not link older platform-native lessons');
check(indexSource.includes('syllabus-2026-27.html'), 'investment-analysis/index.html must link the current 2026/27 syllabus');

for (const expected of expectedLessons) {
  const lessonRoot = path.join(courseRoot, 'lessons', expected.directory);
  const htmlPath = path.join(lessonRoot, 'index.html');
  const slidesPath = path.join(lessonRoot, 'slides.js');
  const notesPath = path.join(lessonRoot, 'SOURCE-NOTES.md');
  check(fs.existsSync(htmlPath), `${expected.route}: index.html is missing`);
  check(fs.existsSync(slidesPath), `${expected.route}: slides.js is missing`);
  check(fs.existsSync(notesPath), `${expected.route}: SOURCE-NOTES.md is missing`);
  if (!fs.existsSync(htmlPath) || !fs.existsSync(slidesPath)) continue;

  const html = fs.readFileSync(htmlPath, 'utf8');
  check(html.includes('../../course-assets/css/presentation.css'), `${expected.route}: shared Investment Course stylesheet is not loaded`);
  check(html.includes('../../course-assets/js/presentation.js'), `${expected.route}: shared Investment Course renderer is not loaded`);
  check(html.includes('window.InvestmentPresentation.mount(window.INVESTMENT_COURSE.lesson)'), `${expected.route}: current lesson data is not mounted`);
  check(html.includes('href="../../index.html"'), `${expected.route}: course-home link is missing`);

  const context = { window: { INVESTMENT_COURSE: {} }, console };
  context.window.window = context.window;
  vm.runInNewContext(fs.readFileSync(slidesPath, 'utf8'), context, { filename: slidesPath });
  const lesson = context.window.INVESTMENT_COURSE.lesson;
  check(lesson?.meta?.lesson === expected.number, `${expected.route}: lesson number must be ${expected.number}`);
  check(lesson?.meta?.title === expected.title, `${expected.route}: title must be "${expected.title}"`);
  check(Array.isArray(lesson?.slides) && lesson.slides.length > 0, `${expected.route}: lesson slides are missing`);
  const slideIds = (lesson?.slides || []).map(slide => slide.id);
  check(slideIds.every(Boolean) && new Set(slideIds).size === slideIds.length, `${expected.route}: slide IDs must be present and unique`);

  for (const photo of Object.values(lesson?.photos || {})) {
    check(typeof photo.src === 'string' && photo.src.startsWith('../../course-assets/images/'), `${expected.route}: photo must use the published local course-assets directory`);
    if (typeof photo.src === 'string') {
      check(fs.existsSync(path.resolve(lessonRoot, photo.src)), `${expected.route}: missing local image ${photo.src}`);
    }
  }
}

const syllabusSource = fs.readFileSync(syllabusPath, 'utf8');
const courseDataMatch = syllabusSource.match(/<script id="course-data" type="application\/json">\s*([\s\S]*?)\s*<\/script>/);
check(Boolean(courseDataMatch), 'syllabus-2026-27.html: embedded course data is missing');
if (courseDataMatch) {
  const courseData = JSON.parse(courseDataMatch[1]);
  check(courseData.lessons?.length === 33, 'syllabus-2026-27.html: expected 33 teaching periods after the pacing revision');
  check(courseData.lessons?.find((lesson) => lesson.number === 2)?.focus === 'Measuring investment return', 'syllabus-2026-27.html: Lesson 2 does not match the published HTML lesson');
  check(courseData.lessons?.find((lesson) => lesson.number === 3)?.focus === 'Compound growth', 'syllabus-2026-27.html: Lesson 3 does not match the published HTML lesson');
  check(courseData.lessons?.find((lesson) => lesson.number === 3)?.coverage?.firstUntaughtSlideId === 'section-projections', 'The teacher-reported stopping point must be preserved');
  check(courseData.lessons?.find((lesson) => lesson.number === 4)?.focus === 'Assumed return', 'Lesson 4 must teach the untaught continuation');
  check(courseData.lessons?.find((lesson) => lesson.number === 5)?.focus === 'Nominal and real return', 'Nominal and real return must follow the continuation');
  check(courseData.lessons?.find((lesson) => lesson.number === 5)?.date === 'Wed Sep 16', 'Nominal and real return must use the next existing teaching slot');
  check(courseData.lessons?.at(-1)?.date === 'TBC', 'The additional final session must not invent an unconfirmed date');
  check(new Set(courseData.lessons.map(lesson => lesson.id)).size === 33, 'Syllabus lesson IDs must remain unique');
}

check(fs.existsSync(path.join(courseRoot, 'course-assets', 'css', 'presentation.css')), 'Investment Course shared stylesheet is missing');
check(fs.existsSync(path.join(courseRoot, 'course-assets', 'js', 'presentation.js')), 'Investment Course shared renderer is missing');

if (failures.length) {
  console.error('Current Investment Course HTML validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Current Investment Course HTML validation passed.');
