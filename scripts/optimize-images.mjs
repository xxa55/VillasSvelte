import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const imageRoot = path.join(root, 'static', 'img');
const sizes = [640, 1200, 1600];
const quality = 78;

const isRaster = (file) => /\.(jpe?g|png)$/i.test(file);

const walk = async (dir) => {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) return walk(fullPath);
			return fullPath;
		})
	);
	return files.flat();
};

const ensureMax1600Jpg = async (inputPath, meta) => {
	if (!meta.width || meta.width <= 1600) return;
	const tempPath = `${inputPath}.tmp.jpg`;
	await sharp(inputPath)
		.rotate()
		.resize({ width: 1600, withoutEnlargement: true })
		.jpeg({ quality: 84, mozjpeg: true })
		.toFile(tempPath);
	await fs.rename(tempPath, inputPath);
};

const optimizeImage = async (inputPath) => {
	const parsed = path.parse(inputPath);
	const image = sharp(inputPath).rotate();
	const meta = await image.metadata();

	await ensureMax1600Jpg(inputPath, meta);

	const maxWidth = Math.min(meta.width ?? 1600, 1600);
	const activeSizes = sizes.filter((size) => size <= maxWidth);
	if (!activeSizes.includes(maxWidth)) activeSizes.push(maxWidth);

	const outputTasks = activeSizes.map(async (width) => {
		const suffix = width === maxWidth ? '' : `-${width}`;
		const outputPath = path.join(parsed.dir, `${parsed.name}${suffix}.webp`);
		await sharp(inputPath)
			.rotate()
			.resize({ width, withoutEnlargement: true })
			.webp({ quality, effort: 4 })
			.toFile(outputPath);
	});

	await Promise.all(outputTasks);
	return { inputPath, generated: activeSizes.length };
};

const main = async () => {
	const allFiles = await walk(imageRoot);
	const sourceFiles = allFiles.filter((file) => isRaster(file) && !/-\d+\.webp$/i.test(file) && !/\.webp$/i.test(file));

	let optimizedCount = 0;
	for (const sourceFile of sourceFiles) {
		await optimizeImage(sourceFile);
		optimizedCount += 1;
	}

	console.log(`Optimized ${optimizedCount} images in ${path.relative(root, imageRoot)}`);
};

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
