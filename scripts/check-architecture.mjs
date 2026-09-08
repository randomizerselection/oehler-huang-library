import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const root = fileURLToPath(new URL('../', import.meta.url));
const workspacePaths = ['apps/library', 'apps/platform', 'apps/student-selector', 'packages/contracts'];

export function checkArchitecture(repo = root) {
  const failures = [];
  const workspaceNames = new Map();
  const rootPackage = JSON.parse(fs.readFileSync(path.join(repo, 'package.json'), 'utf8'));
  for (const pattern of ['apps/*', 'packages/*']) {
    if (!rootPackage.workspaces.includes(pattern)) failures.push(`Missing npm workspace pattern: ${pattern}`);
  }
  for (const directory of workspacePaths) {
    const pkg = JSON.parse(fs.readFileSync(path.join(repo, directory, 'package.json'), 'utf8'));
    workspaceNames.set(pkg.name, directory);
    if (!pkg.private) failures.push(`${directory} must be private`);
    if (fs.existsSync(path.join(repo, directory, 'package-lock.json'))) failures.push(`${directory}: use the root lockfile`);
    for (const dependency of Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })) {
      if (dependency.startsWith('@oehler-huang/') && dependency !== '@oehler-huang/contracts') failures.push(`${directory} depends on an app: ${dependency}`);
    }
    if (directory.startsWith('packages/') && Object.keys(pkg.dependencies || {}).length) failures.push(`${directory}: contracts must have no runtime dependencies`);
  }
  const skip = /^(?:\..*|node_modules|tests?|tmp|test-results|playwright-report|archive|android-definitions|references|outputs?)$/i;
  function scan(directory, owner) {
    for (const entry of fs.readdirSync(path.join(repo, directory), { withFileTypes: true })) {
      if (skip.test(entry.name)) continue;
      const relative = `${directory}/${entry.name}`;
      if (entry.isDirectory()) { scan(relative, owner); continue; }
      if (!entry.isFile() || !/\.(?:js|mjs|cjs)$/.test(entry.name)) continue;
      const code = fs.readFileSync(path.join(repo, relative), 'utf8');
      // Inspect literal module edges, including require and dynamic import.
      const imports = /(?:\bfrom\s*|\brequire\s*\(\s*|\bimport\s*\(\s*|\bimport\s*)["']([^"']+)["']/g;
      for (const [, specifier] of code.matchAll(imports)) {
        if (specifier.startsWith('@oehler-huang/')) {
          const name = specifier.split('/').slice(0, 2).join('/');
          const pkg = JSON.parse(fs.readFileSync(path.join(repo, owner, 'package.json'), 'utf8'));
          if (!workspaceNames.has(name) || !pkg.dependencies?.[name]) failures.push(`${relative}: undeclared runtime dependency ${name}`);
        }
        if (!specifier.startsWith('.')) continue;
        const resolved = path.relative(repo, path.resolve(repo, path.dirname(relative), specifier)).replaceAll('\\', '/');
        if (resolved.startsWith(`${owner}/`)) continue;
        failures.push(`${relative}: cross-boundary import ${specifier}; use a declared shared package or public API`);
      }
    }
  }
  for (const directory of workspacePaths) scan(directory, directory);
  return failures;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const failures = checkArchitecture();
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exitCode = 1;
  } else console.log('Architecture checks passed: four private workspaces, one lockfile, no cross-app module imports.');
}
