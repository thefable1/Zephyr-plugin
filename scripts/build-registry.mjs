import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TYPES = ['themes', 'games', 'mods'];

async function collect(type) {
	const dir = join(ROOT, type);
	const entries = await readdir(dir);
	const plugins = [];
	for (const slug of entries) {
		if (slug.startsWith('.')) continue;
		const folder = join(dir, slug);
		if (!(await stat(folder)).isDirectory()) continue;
		try {
			const manifest = JSON.parse(await readFile(join(folder, 'manifest.json'), 'utf-8'));
			plugins.push({ ...manifest, path: `${type}/${slug}` });
		} catch (err) {
			console.warn(`skip ${type}/${slug}: ${err.message}`);
		}
	}
	return plugins;
}

const plugins = (await Promise.all(TYPES.map(collect))).flat();
const registry = { version: 1, generated: new Date().toISOString(), plugins };
await writeFile(join(ROOT, 'registry.json'), JSON.stringify(registry, null, 2) + '\n');
console.log(`wrote ${plugins.length} plugins to registry.json`);
