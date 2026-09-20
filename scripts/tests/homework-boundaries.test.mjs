import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import { isReleaseFile } from '../../deploy/release-files.mjs';

const require = createRequire(import.meta.url);
const { isPublicAsset } = require('../../packages/contracts/public-files.cjs');

test('homework source, review instructions and runtime artifacts stay private', () => {
  for (const path of [
    'homework/runner.py', 'homework/REVIEW.md',
    'homework/workflows/qq-ic3/config.json',
    'homework/workflows/qq-ic3/assignments.json',
    'homework/workflows/qq-ic3/state/review-packet.json',
    'homework/workflows/qq-ic3/state/media/answer.jpg',
  ]) {
    assert.equal(isPublicAsset('platform', path), false, path);
    assert.equal(isReleaseFile(`apps/platform/${path}`), false, path);
  }
  assert.equal(isReleaseFile('.platform-data/homework/runtime.json'), false);
});
