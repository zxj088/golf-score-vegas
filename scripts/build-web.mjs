import { cp, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const outDir = join(root, 'www');
const files = [
  'index.html',
  'styles.css',
  'app.js',
  'sw.js',
  'manifest.webmanifest',
  'supabase-config.js',
  'assets'
];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const file of files) {
  await cp(join(root, file), join(outDir, file), { recursive: true });
}
