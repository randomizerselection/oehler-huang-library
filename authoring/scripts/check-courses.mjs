// Verify the maintained lesson routes from the course landing pages, not archives.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const repo = path.resolve(import.meta.dirname, '../..');
const library = path.join(repo, 'apps/library');
const summaries = [];

function checkAsset(base, reference) {
  if (!reference || /^(?:[a-z]+:|\/\/|#)/i.test(reference)) return;
  const clean = decodeURIComponent(reference.split(/[?#]/)[0]);
  const file = clean.startsWith('/') ? path.join(library, clean) : path.resolve(base, clean);
  const relative = path.relative(library, file);
  assert.ok(relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative), `Asset outside the public library: ${reference}`);
  assert.ok(fs.statSync(file).isFile(), `Missing asset: ${file}`);
}

function checkImages(base, value) {
  if (!value || typeof value !== 'object') return;
  for (const [key, item] of Object.entries(value)) {
    if ((key === 'src' || key === 'image') && typeof item === 'string') checkAsset(base, item);
    else if (item && typeof item === 'object') checkImages(base, item);
  }
}

for (const course of ['investment-analysis', 'a-level']) {
  const courseRoot = path.join(library, course);
  const landing = fs.readFileSync(path.join(courseRoot, 'index.html'), 'utf8');
  const routes = [...new Set([...landing.matchAll(/href=["'](lessons\/[^"'#?]+\/index\.html)["']/g)].map(match => match[1]))];
  assert.ok(routes.length, `${course}: no linked classroom lessons`);
  const kinds = new Set();
  for (const route of routes) {
    const htmlFile = path.resolve(courseRoot, route);
    const base = path.dirname(htmlFile);
    const html = fs.readFileSync(htmlFile, 'utf8');
    for (const tag of html.matchAll(/<(?:script|link|img)\b[^>]*>/gi)) {
      const ref = tag[0].match(/(?:src|href)=["']([^"']+)["']/i)?.[1];
      checkAsset(base, ref);
    }
    const sandbox = {window: {}};
    vm.runInNewContext(fs.readFileSync(path.join(base, 'slides.js'), 'utf8'), sandbox, {timeout: 1000});
    const lesson = course === 'a-level' ? sandbox.window.ALEVEL_LESSON : sandbox.window.INVESTMENT_COURSE?.lesson;
    assert.ok(lesson?.slides?.length, `${route}: lesson content is missing`);
    assert.ok(lesson.slides.every(slide => slide.id), `${route}: missing semantic slide ID`);
    assert.equal(new Set(lesson.slides.map(slide => slide.id)).size, lesson.slides.length, `${route}: duplicate semantic slide ID`);
    checkImages(base, lesson);
    for (const slide of lesson.slides) kinds.add(slide.kind);
    summaries.push({course, route, slides: lesson.slides.length});
  }
  console.log(`${course}: ${routes.length} linked lessons; current slide kinds: ${[...kinds].sort().join(', ')}`);
}
console.log(JSON.stringify(summaries, null, 2));
