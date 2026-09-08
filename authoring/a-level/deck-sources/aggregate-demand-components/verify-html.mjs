// Content, arithmetic, diagram and offline-packaging checks.
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const here = import.meta.dirname;
const root = path.resolve(here, '../..');
const source = path.resolve(here, '../../../../apps/library/a-level/lessons/9-1-2-aggregate-demand');
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ['html/slides.js', 'html/diagram-scenes.js', '../shared-html/diagrams.js']) {
  vm.runInContext(await fs.readFile((file.startsWith('html/') ? path.join(source, file.slice(5)) : path.resolve(source, '../../shared-html/diagrams.js')), 'utf8'), sandbox, { filename: file });
}

const { slides, meta } = sandbox.window.ALEVEL_LESSON;
const lessonCss = await fs.readFile(path.join(source, 'lesson.css'), 'utf8');
const fullSlideKinds = new Set(['hero', 'hook', 'section']);
const classroomLabels = new Set([
  'STARTER', 'LESSON OVERVIEW', 'RETRIEVAL', 'CONCEPT', 'DIAGRAM',
  'WORKED EXAMPLE', 'QUICK CHECK', 'FEEDBACK', 'EVALUATION', 'SYNTHESIS',
  'EXAM PRACTICE', 'MODEL ANSWER', 'SUMMARY', 'PHOTO CASE', 'KEY DEFINITION',
  'CAUSAL CHAIN'
]);
assert.equal(slides.length, 56);
assert.equal(new Set(slides.map(slide => slide.id)).size, slides.length);
assert.equal(slides.findIndex(slide => slide.id === meta.coreEnd), slides.length - 1);
assert.equal(meta.syllabus, '9708 · 9.1.2');
assert.equal(meta.plannedLessons, 1.5);
assert.ok(!/\bYd\b/.test(JSON.stringify(slides)), 'Disposable income must use subscript notation');
assert.match(lessonCss, /\.slide \.definition-formula\{font-family:var\(--sans\);font-style:normal;font-weight:500\}/, 'Lesson formulae must follow the upright sans-serif convention');
for (const id of ['ad-identity', 'consumption-function', 'saving-function']) {
  assert.equal(slides.find(slide => slide.id === id).math, true, `${id}: display equation is not marked for mathematical typesetting`);
}

function checkMathDelimiters(value, location = 'slides') {
  if (typeof value === 'string') {
    value = value.replaceAll('$ billion', 'dollars billion'); // Literal currency in the original exam table.
    assert.equal((value.match(/\$/g) || []).length % 2, 0, `${location}: unmatched inline-math delimiter`);
    for (const match of value.matchAll(/\$([^$]*)\$/g)) {
      assert.ok(!/\s\/\s/.test(match[1]), `${location}: displayed ratios must use the division sign`);
    }
    return;
  }
  if (Array.isArray(value)) value.forEach((item, index) => checkMathDelimiters(item, `${location}[${index}]`));
  else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) checkMathDelimiters(item, `${location}.${key}`);
  }
}
checkMathDelimiters(slides);

let diagramStates = 0;
for (const slide of slides) {
  assert.ok(slide.title, `${slide.id}: missing title`);
  assert.ok(slide.title.split(/\s+/).length <= 10, `${slide.id}: title exceeds 10 words`);
  assert.ok(!Object.hasOwn(slide, 'takeaway'), `${slide.id}: footer takeaway should be removed or promoted`);
  if (!fullSlideKinds.has(slide.kind)) {
    assert.ok(classroomLabels.has(slide.label), `${slide.id}: missing or invalid classroom label`);
  }
  assert.ok(slide.notes, `${slide.id}: missing teacher notes`);
  assert.ok(Array.isArray(slide.sources) && slide.sources.length, `${slide.id}: missing sources`);
  if (slide.kind === 'mcq') {
    assert.ok(Number.isInteger(slide.answer));
    assert.ok(slide.answer >= 0 && slide.answer < slide.options.length);
  }
  if (slide.kind === 'diagram') {
    assert.ok(slide.scene && slide.scene.steps.length >= 3, `${slide.id}: incomplete diagram scene`);
    diagramStates += slide.scene.steps.length;
    const svg = sandbox.window.EconDiagrams.markup(slide.scene, slide.id);
    assert.ok(!/NaN|undefined/.test(svg), `${slide.id}: invalid SVG value`);
    assert.equal((svg.match(/<svg /g) || []).length, 1);
    assert.ok(svg.includes('preserveAspectRatio="xMinYMid meet"'));
  }
}

const table = slides.find(slide => slide.id === 'function-table').table.slice(1);
for (const row of table) {
  const income = Number(row[0].replaceAll(',', ''));
  const consumption = Number(row[3].replaceAll(',', ''));
  const saving = Number(row[4].replaceAll(',', '').replace('−', '-'));
  assert.equal(consumption, 100 + 0.8 * income);
  assert.equal(saving, income - consumption);
}
const accelerator = slides.find(slide => slide.id === 'accelerator-data').table.slice(2);
for (const row of accelerator) {
  const change = Number(row[2].replace('+', ''));
  assert.equal(Number(row[3]), 2 * change);
}
assert.equal(slides.find(slide => slide.id === 'accelerator-data').table[1][3], '—', 'Initial investment is unknown without earlier income');
const paperKeys = {
  'accelerator-paper-definition': 2,
  'accelerator-paper-fall': 1,
  'accelerator-paper-smaller-rise': 3,
  'accelerator-paper-income-table': 2,
  'accelerator-paper-multiplier': 2
};
for (const [id, answer] of Object.entries(paperKeys)) {
  const question = slides.find(slide => slide.id === id);
  assert.equal(question.answer, answer, `${id}: published answer key mismatch`);
  assert.ok(question.paper && question.sources.some(ref => /mark scheme/i.test(ref)));
}
const incomeQuestion = slides.find(slide => slide.id === 'accelerator-paper-income-table');
const income = incomeQuestion.table.slice(1).map(row => Number(row[1]));
const additions = income.slice(1).map((value, index) => value - income[index]);
assert.deepEqual(Array.from(additions), [40, 20, 20, 30, 40]);
assert.equal(additions.findIndex((value, index) => index > 0 && value > additions[index - 1]) + 2, 5);
const factory = slides.find(slide => slide.id === 'accelerator-factory').table.slice(1);
for (const row of factory) {
  assert.equal(Number(row[1].replaceAll(',', '')) / 100, Number(row[2]));
  assert.equal(Number(row[3]) + Number(row[4]), Number(row[5]));
}

const directImageSlides = slides.filter(slide => slide.image);
const imageEntries = slides.flatMap(slide => [
  ...(slide.image ? [{ id: slide.id, image: slide.image, imageAlt: slide.imageAlt }] : []),
  ...(slide.items || []).filter(item => item.image).map((item, index) => ({
    id: `${slide.id}.items[${index}]`, image: item.image, imageAlt: item.imageAlt
  }))
]);
assert.equal(imageEntries.length, 6);
assert.equal(directImageSlides.filter(slide => slide.kind === 'hook').length, 3);
assert.equal(directImageSlides.filter(slide => slide.kind === 'scenario').length, 2);
for (const entry of imageEntries) {
  assert.ok(entry.imageAlt, `${entry.id}: missing image alternative text`);
  const asset = path.join(source, entry.image);
  assert.ok((await fs.stat(asset)).size > 40000, `${entry.id}: image asset is unexpectedly small`);
}
const output = path.join(root, 'outputs/aggregate-demand-html/A-Level_Aggregate_Demand_Components.html');
const html = await fs.readFile(output, 'utf8');
assert.ok(!/<script src=|<link rel="stylesheet"/.test(html), 'External code dependency');
assert.ok(!html.includes('image: "assets/'), 'External image dependency');
assert.ok(html.includes('id="studentSelectorButton"'), 'Student selector control missing');
assert.ok(html.includes('https://randomizerselection.github.io/studentselector/'), 'Student selector runtime missing');
assert.ok(html.includes('StudentSelector.mount'), 'In-deck student selector integration missing');
assert.ok(html.includes("k==='s'"), 'Student selector keyboard shortcut missing');
assert.ok(html.includes('.studentSelectorSidePanel'), 'Student selector side-panel styles missing');
assert.ok(html.includes('body.is-student-selector-open .stage'), 'Slide resizing rule missing');
assert.ok(html.lastIndexOf('font-family:var(--sans);font-style:normal;font-weight:500') > html.lastIndexOf('Cambria Math'), 'Lesson formula override must follow the shared stylesheet');
assert.ok(html.includes('<sub>d</sub>'), 'Semantic disposable-income subscript missing');
assert.equal((html.match(/data:image\/(?:png|jpeg);base64,/g) || []).length, imageEntries.length);
for (const [i, script] of [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].entries()) {
  new vm.Script(script[1], { filename: `offline-script-${i}` });
}

console.log(JSON.stringify({
  status: 'pass',
  slides: slides.length,
  mcqs: slides.filter(slide => slide.kind === 'mcq').length,
  diagrams: slides.filter(slide => slide.kind === 'diagram').length,
  diagramStates,
  portableHtmlBytes: Buffer.byteLength(html)
}, null, 2));
