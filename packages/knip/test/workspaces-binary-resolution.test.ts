import { test } from 'bun:test';
import assert from 'node:assert/strict';
import { main } from '../src/index.js';
import { resolve } from '../src/util/path.js';
import baseArguments from './helpers/baseArguments.js';
import baseCounters from './helpers/baseCounters.js';

const cwd = resolve('fixtures/workspaces-binary-resolution');

test('Find unused dependencies and binaries in a single workspace fixture (default)', async () => {
  const { issues, counters } = await main({
    ...baseArguments,
    cwd,
  });

  assert(!issues.binaries?.['apps/backend/package.json']?.['nest']);
  assert(!issues.devDependencies?.['apps/backend/package.json']?.['@nestjs/cli']);

  assert.deepEqual(counters, {
    ...baseCounters,
    files: 1,
    processed: 2,
    total: 2,
  });
});

test('Find unused dependencies and binaries in a single workspace fixture (production)', async () => {
  const { issues, counters } = await main({
    ...baseArguments,
    cwd,
    isProduction: true,
  });

  assert.equal(Object.keys(issues.devDependencies).length, 0);
  assert.equal(Object.keys(issues.binaries).length, 0);

  assert.deepEqual(counters, {
    ...baseCounters,
    files: 1,
    processed: 2,
    total: 2,
  });
});

test('Find unused dependencies and binaries in a single workspace fixture (strict)', async () => {
  const { issues, counters } = await main({
    ...baseArguments,
    cwd,
    isStrict: true,
  });

  assert(!issues.binaries?.['apps/backend/package.json']?.['nest']);
  assert(!issues.devDependencies?.['apps/backend/package.json']?.['@nestjs/cli']);

  assert.deepEqual(counters, {
    ...baseCounters,
    files: 1,
    processed: 2,
    total: 2,
  });
});