const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');

async function main() {
  const root = path.resolve(__dirname, '..');
  const planning = path.resolve(root, '../../authoring/a-level/planning');
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'a-level/syllabus-data.js'), 'utf8'), sandbox);
  const data = JSON.parse(JSON.stringify(sandbox.window.ALEVEL_SYLLABUS));
  const source = JSON.parse(fs.readFileSync(path.join(planning, 'syllabus-workbook-source.json'), 'utf8'));
  for (const workbook of source.sources) {
    assert.equal(createHash('sha256').update(fs.readFileSync(path.join(planning, workbook.name))).digest('hex'), workbook.sha256, `${workbook.name}: refresh the source snapshot with extract-syllabus.py after workbook edits`);
  }
  const imported = new Map(data.sections.flatMap(section => section.points.map(point => [point.code, point])));
  let sourceCount = 0;
  for (const section of source.sections) {
    for (const original of section.points) {
      sourceCount++;
      const code = original.code;
      const point = imported.get(code);
      assert.ok(point, `Missing syllabus point ${code}`);
      assert.equal(point.wording, original.wording, `${code}: wording must match workbook`);
      assert.equal(point.bullets, original.bullets, `${code}: bullet points must match workbook`);
      assert.equal(point.sourceAllocation, original.sourceAllocation, `${code}: preserve missing source allocations`);
      assert.equal(point.allocation, original.allocation, `${code}: use original allocation or labelled provisional estimate`);
      assert.equal(point.provisional, original.provisional, `${code}: provisional status`);
    }
  }
  assert.equal(imported.size, sourceCount);
  assert.equal(sourceCount, 58);
  assert.equal(data.lessons.length, 48);
  assert.equal(new Set(data.lessons.map(lesson => lesson.id)).size, data.lessons.length);
  const allocated = new Map();
  const courseHome = fs.readFileSync(path.join(root, 'a-level/index.html'), 'utf8');
  data.lessons.forEach((lesson, index) => {
    assert.equal(lesson.number, index + 1);
    assert.equal(lesson.allocations.reduce((total, item) => total + item.lessons, 0) + (lesson.consolidation || 0), 1, `Lesson ${lesson.number} must fill one slot`);
    for (const item of lesson.allocations) {
      assert.ok(imported.has(item.code), `Unmapped code ${item.code}`);
      assert.ok(item.lessons > 0);
      allocated.set(item.code, (allocated.get(item.code) || 0) + item.lessons);
    }
    for (const key of ['title', 'outcome', 'retrieve', 'teach', 'practice', 'check', 'followUp']) assert.ok(lesson[key]?.trim(), `Lesson ${lesson.number}: missing ${key}`);
    if (lesson.resource) {
      assert.ok(courseHome.includes(`href="${lesson.resource.href}"`), 'Only active course lessons may be linked');
      assert.ok(fs.existsSync(path.resolve(root, 'a-level', lesson.resource.href)));
    }
  });
  for (const [code, point] of imported) assert.equal(allocated.get(code), point.allocation, `${code}: preserve fractional lesson allocation across all sessions`);
  assert.equal(data.lessons.reduce((sum, lesson) => sum + (lesson.consolidation || 0), 0), .25);
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'generated/content-manifest.json'), 'utf8'));
  assert.ok(manifest.items.some(item => item.route === '/a-level/syllabus/'), 'Planner must be registered in the platform content manifest');
  assert.match(courseHome, /href="syllabus\/index.html"/);
  console.log('A Level syllabus verified against both workbooks: 58 exact statements; 48 complete lesson slots; fractional allocations preserved.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
