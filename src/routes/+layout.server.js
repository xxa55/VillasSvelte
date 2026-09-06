/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	const { data, error } = await locals.supabase.auth.getUser();
	return { user: error ? null : data.user };
}
