import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: true
	},
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			strict: false
		}),
		paths: {
			// fixed custom domain root, no need for portable relative paths
			relative: false
		}
	}
};

export default config;
