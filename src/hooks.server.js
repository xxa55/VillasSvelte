import { createServerClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	event.locals.supabase = createServerClient(
		env.PUBLIC_SUPABASE_URL || 'https://example.supabase.co',
		env.PUBLIC_SUPABASE_ANON_KEY || 'missing-key',
		{
			cookies: {
				getAll: () => event.cookies.getAll(),
				setAll: (cookies) => {
					for (const { name, value, options } of cookies) {
						event.cookies.set(name, value, { ...options, path: '/' });
					}
				}
			}
		}
	);

	return resolve(event, {
		filterSerializedResponseHeaders: (name) => name === 'content-range' || name === 'x-supabase-api-version'
	});
}
