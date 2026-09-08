const fs = require('node:fs');
const path = require('node:path');

const COURSES = Object.freeze([
  { id: 'economics', landing: 'economics/index.html', lessons: 'lessons/' },
  { id: 'investment-analysis', landing: 'investment-analysis/index.html', lessons: 'investment-analysis/lessons/' },
  { id: 'a-level', landing: 'a-level/index.html', lessons: 'a-level/lessons/' },
]);

function localHtmlLinks(root, page) {
  const html = fs.readFileSync(path.join(root, page), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const base = new URL(page, 'https://library.local/');
  const links = new Set();
  for (const match of html.matchAll(/\bhref\s*=\s*["']([^"']+)["']/gi)) {
    const url = new URL(match[1].replaceAll('&amp;', '&'), base);
    if (url.origin !== base.origin) continue;
    const file = decodeURIComponent(url.pathname).slice(1);
    if (!file.endsWith('.html')) continue;
    const relative = path.relative(root, path.resolve(root, file));
    if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error(`Link escapes Library: ${page}: ${file}`);
    links.add(file);
  }
  return [...links].sort();
}

function activeContentFiles(root) {
  const files = new Set(['index.html']);
  for (const course of COURSES) {
    files.add(course.landing);
    const links = localHtmlLinks(root, course.landing);
    const lessons = links.filter(file => file.startsWith(course.lessons));
    if (!lessons.length) throw new Error(`${course.landing}: no active lessons linked`);
    // Include linked course resources, but never recursively promote old directories.
    const coursePrefix = `${course.id}/`;
    for (const file of links.filter(file => file.startsWith(coursePrefix) || file.startsWith(course.lessons))) {
      if (!fs.statSync(path.join(root, file)).isFile()) throw new Error(`Missing active content: ${file}`);
      files.add(file);
    }
  }
  return [...files].sort();
}

module.exports = { COURSES, localHtmlLinks, activeContentFiles };
