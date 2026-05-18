'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { parseDefinitions, buildAndroidDefinitions } = require('./export-definitions-android');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'references', 'igcse-economics-definitions-2026.md');
const dataPath = path.join(root, 'android-definitions', 'app', 'src', 'main', 'assets', 'definitions.json');

function markdownRows(markdown) {
  return [...markdown.matchAll(/^\|\s*([^|]*?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*$/gm)]
    .map((match) => ({
      ref: match[1].trim(),
      term: match[2].trim(),
      definition: match[3].trim(),
    }))
    .filter((row) => row.term && row.term !== 'Term' && !/^---+$/.test(row.ref) && !/^---+$/.test(row.term));
}

function main() {
  const markdown = fs.readFileSync(sourcePath, 'utf8');
  const expectedRows = markdownRows(markdown);
  const expectedDefinitions = buildAndroidDefinitions(parseDefinitions(markdown));

  assert.ok(fs.existsSync(dataPath), 'definitions.json has not been generated');
  const actualDefinitions = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  assert.strictEqual(actualDefinitions.length, expectedRows.length, 'generated JSON row count must match Markdown rows');
  assert.deepStrictEqual(actualDefinitions, expectedDefinitions, 'definitions.json is stale; run npm run build:android-data');

  const ids = new Set();
  for (const definition of actualDefinitions) {
    assert.ok(definition.id, 'definition id is required');
    assert.ok(!ids.has(definition.id), `duplicate id: ${definition.id}`);
    ids.add(definition.id);

    for (const key of ['ref', 'term', 'termZh', 'definition', 'definitionZh', 'unitId', 'unitTitle', 'unitTitleZh', 'topicId', 'topicTitle']) {
      assert.strictEqual(typeof definition[key], 'string', `${definition.id}.${key} must be a string`);
      assert.ok(definition[key].trim(), `${definition.id}.${key} must not be blank`);
    }
    assert.strictEqual(typeof definition.isFormula, 'boolean', `${definition.id}.isFormula must be boolean`);
  }

  console.log(`Android definitions data OK: ${actualDefinitions.length} offline entries`);
}

main();
