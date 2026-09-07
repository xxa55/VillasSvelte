import { json } from '@sveltejs/kit';
import { isAdministrator } from '$lib/server/admin.js';
import { getAdminClient } from '$lib/server/supabase.js';

export async function DELETE({ request, locals }) {
	const { data: { user } } = await locals.supabase.auth.getUser();
	if (!isAdministrator(user)) return json({ error: 'Administrator access is required.' }, { status: 403 });

	const body = await request.json().catch(() => ({}));
	const commentId = Number(body.id);
	if (!Number.isInteger(commentId)) return json({ error: 'A valid comment id is required.' }, { status: 400 });

	const { error } = await getAdminClient().from('comments').delete().eq('id', commentId);
	if (error) {
		console.error('Admin comment deletion failed', error);
		return json({ error: 'The comment could not be deleted.' }, { status: 500 });
	}
	return json({ ok: true });
}
