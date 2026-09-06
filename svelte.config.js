import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: true
	},
	kit: {
		adapter: adapter(),
		paths: {
			// fixed custom domain root, no need for portable relative paths
			relative: false
		}
	}
};

export default config;
