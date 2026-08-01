import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcRoot = path.join(root, 'src');
const imgRoot = path.join(root, 'static', 'img');

const walk = async (dir) => {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) return walk(full);
			return full;
		})
	);
	return files.flat();
};

const toPosix = (p) => p.split(path.sep).join('/');

const main = async () => {
	const srcFiles = (await walk(srcRoot)).filter((file) => /\.(svelte|js|ts|css)$/i.test(file));
	const contents = await Promise.all(srcFiles.map((file) => fs.readFile(file, 'utf8')));
	const joined = contents.join('\n');

	const refRegex = /\/img\/[^"'\s)]+\.jpg/gi;
	const referenced = new Set(joined.match(refRegex) ?? []);

	const jpgFiles = (await walk(imgRoot)).filter((file) => /\.jpg$/i.test(file));
	const unused = jpgFiles.filter((file) => {
		const webPath = toPosix('/' + path.relative(path.join(root, 'static'), file));
		return !referenced.has(webPath);
	});

	for (const file of unused) {
		await fs.unlink(file);
	}

	console.log(`Referenced JPG: ${referenced.size}`);
	console.log(`Total JPG: ${jpgFiles.length}`);
	console.log(`Deleted unused JPG: ${unused.length}`);
};

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
