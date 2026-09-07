import { redirect } from '@sveltejs/kit';

export const prerender = false;

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ locals }) => {
		await locals.supabase.auth.signOut();
		redirect(303, '/');
	}
};
