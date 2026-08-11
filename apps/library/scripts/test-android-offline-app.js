'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const androidRoot = path.join(root, 'android-definitions');

function read(relativePath) {
  return fs.readFileSync(path.join(androidRoot, relativePath), 'utf8');
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['build', '.gradle'].includes(entry.name)) return [];
      return walk(absolute);
    }
    return [absolute];
  });
}

const manifest = read('app/src/main/AndroidManifest.xml');
assert.ok(!manifest.includes('android.permission.INTERNET'), 'Android app must not request INTERNET permission');
assert.ok(!manifest.includes('networkSecurityConfig'), 'Android app must not depend on network security config');

const sourceFiles = walk(path.join(androidRoot, 'app', 'src'))
  .filter((file) => /\.(kt|xml|json)$/.test(file));
for (const file of sourceFiles) {
  const source = fs.readFileSync(file, 'utf8');
  const nonSchemaUrls = [...source.matchAll(/https?:\/\/[^\s"')<>]+/gi)]
    .map((match) => match[0])
    .filter((url) => url !== 'http://schemas.android.com/apk/res/android');
  assert.deepStrictEqual(nonSchemaUrls, [], `${path.relative(root, file)} must not contain runtime remote URLs`);
  assert.ok(!/firebase|googleapis|gstatic|baidu|analytics/i.test(source), `${path.relative(root, file)} must not include remote service dependencies`);
}

console.log('Android offline app checks OK: no internet permission or runtime remote URLs');
