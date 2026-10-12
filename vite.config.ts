import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// RUNES MODE FOR PROJECT FILES, NOT LIBRARIES (REMOVE IN SVELTE 6)
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// STATIC PAGES FOR GITHUB PAGES, 404.HTML AS THE ERROR PAGE
			adapter: adapter({ fallback: '404.html' }),

			// EMPTY ON VFZEMPILAS.GR, SET FOR A SUB-PATH (E.G. '/MyWebsite_react')
			paths: { base: (process.env.BASE_PATH ?? '') as '' | `/${string}` }
		})
	]
});
