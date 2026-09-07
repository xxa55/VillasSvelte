import { fail, redirect } from '@sveltejs/kit';
import { sendWelcomeEmail } from '$lib/server/email.js';
import { safeReturnTo } from '$lib/navigation.js';

export const prerender = false;

/** @type {import('./$types').Actions} */
export const actions = {
	google: async ({ locals, url }) => {
		const { data, error } = await locals.supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${url.origin}/auth/callback?returnTo=${encodeURIComponent(safeReturnTo(url))}`
			}
		});
		if (error || !data.url) return fail(500, { message: 'Google sign-in could not be started. Please try again.' });
		redirect(303, data.url);
	},
	login: async ({ request, locals, url }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim();
		const password = String(form.get('password') ?? '');
		if (!email || !password) return fail(400, { email, message: 'Enter your email and password.' });

		const { error } = await locals.supabase.auth.signInWithPassword({ email, password });
		if (error) return fail(400, { email, message: 'The email or password is incorrect.' });
		redirect(303, safeReturnTo(url));
	},
	signup: async ({ request, locals, url }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim();
		const password = String(form.get('password') ?? '');
		if (!email || password.length < 8) {
			return fail(400, { email, message: 'Use a valid email and a password with at least 8 characters.' });
		}

		const { data, error } = await locals.supabase.auth.signUp({
			email,
			password,
			options: { emailRedirectTo: `${url.origin}/login?returnTo=${encodeURIComponent(safeReturnTo(url))}` }
		});
		if (error) return fail(400, { email, message: error.message });

		// Supabase may return a deliberately ambiguous response for an existing
		// address. Only welcome accounts that Supabase reports as newly created.
		if (data.user?.identities?.length) {
			try {
				await sendWelcomeEmail(email);
			} catch (emailError) {
				console.error('Welcome email could not be sent.', emailError);
			}
		}
		if (data.session) redirect(303, safeReturnTo(url));
		return { email, message: 'Check your email to confirm your account.' };
	}
};
