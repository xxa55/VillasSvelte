import { redirect } from '@sveltejs/kit';
import { isAdministrator } from '$lib/server/admin.js';

export async function load({ locals }) {
	const { data: { user } } = await locals.supabase.auth.getUser();
	if (!isAdministrator(user)) redirect(303, '/villas');
}