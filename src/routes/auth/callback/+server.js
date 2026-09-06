import { redirect } from '@sveltejs/kit';
import { safeReturnTo } from '$lib/navigation.js';

export async function GET({ url, locals }) {
	const code = url.searchParams.get('code');
	if (code) await locals.supabase.auth.exchangeCodeForSession(code);
	redirect(303, safeReturnTo(url));
}