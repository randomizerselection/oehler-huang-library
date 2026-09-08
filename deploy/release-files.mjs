import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { isPublicAsset, isSafeRelativePath } from '@oehler-huang/contracts/public-files';
import { CONTENT_FILES } from '@oehler-huang/contracts/content';

export const repositoryRoot = fileURLToPath(new URL('../', import.meta.url));
const rootFiles = new Set(['package.json', 'package-lock.json', '.env.example', 'README.md', 'AGENTS.md']);
const libraryBuildFiles = new Set(['scripts/build-platform-content.js', 'scripts/content-sources.js', ...Object.values(CONTENT_FILES)]);
const skipDirectories = /^(?:\..*|node_modules|tests?|test-results|playwright-report|tmp|temp|outputs?|reports?|backups?|uploads?|coverage|dist|__pycache__|archive|android-definitions)$/i;

export function isReleaseFile(file) {
  if (!isSafeRelativePath(file)) return false;
  if (rootFiles.has(file)) return true;
  const parts = file.split('/');
  if (parts.some(part => skipDirectories.test(part))) return false;
  if (file.startsWith('deploy/')) return /\.(?:mjs|ps1|sh|conf|service|timer)$/.test(file) || file === 'deploy/platform.env.example';
  if (file.startsWith('packages/contracts/')) return /\.(?:cjs|json)$/.test(file);
  const [, app, ...rest] = parts;
  if (parts[0] !== 'apps') return false;
  const relative = rest.join('/');
  if (['library', 'platform', 'student-selector'].includes(app) && relative === 'package.json') return true;
  if (app === 'library') return libraryBuildFiles.has(relative) || isPublicAsset(app, relative);
  if (app === 'platform') {
    return /^(?:server|scripts)\/.*\.(?:mjs|js|sql)$/.test(relative)
      || /^spec\/[^/]+\.schema\.json$/.test(relative)
      || /^prompts\/[^/]+\.md$/.test(relative)
      || isPublicAsset(app, relative);
  }
  return isPublicAsset(app, relative);
}

export function collectReleaseFiles(root = repositoryRoot) {
  const files = [];
  function visit(relative) {
    const absolute = path.join(root, relative);
    const info = fs.lstatSync(absolute);
    if (info.isSymbolicLink()) throw new Error(`Release inputs cannot be symbolic links: ${relative}`);
    if (info.isDirectory()) {
      if (skipDirectories.test(path.basename(relative))) return;
      for (const name of fs.readdirSync(absolute).sort()) visit(`${relative}/${name}`);
    } else if (info.isFile() && isReleaseFile(relative)) {
      files.push(relative);
    }
  }
  for (const file of rootFiles) visit(file);
  for (const directory of ['apps', 'packages', 'deploy']) visit(directory);
  return files.sort();
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const files = collectReleaseFiles();
  const outputIndex = process.argv.indexOf('--output');
  if (outputIndex !== -1) {
    if (!process.argv[outputIndex + 1]) throw new Error('--output requires a filename');
    // Prefix paths to keep tar list entries from being interpreted as options.
    fs.writeFileSync(path.resolve(process.argv[outputIndex + 1]), files.map(file => `./${file}`).join('\n') + '\n');
  }
  const groups = new Map();
  let bytes = 0;
  for (const file of files) {
    const size = fs.statSync(path.join(repositoryRoot, file)).size;
    bytes += size;
    const key = file.startsWith('apps/') || file.startsWith('packages/') ? file.split('/').slice(0, 2).join('/') : file.split('/')[0];
    const group = groups.get(key) || { files: 0, bytes: 0 };
    group.files++;
    group.bytes += size;
    groups.set(key, group);
  }
  console.log(JSON.stringify({ files: files.length, bytes, groups: Object.fromEntries(groups) }, null, 2));
}
