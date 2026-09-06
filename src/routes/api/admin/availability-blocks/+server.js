import { json } from '@sveltejs/kit';
import { isAdministrator } from '$lib/server/admin.js';
import { getAdminClient } from '$lib/server/supabase.js';

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

/** @param {App.Locals} locals */
async function getAdministrator(locals) {
	const { data: { user } } = await locals.supabase.auth.getUser();
	return isAdministrator(user) ? user : null;
}

export async function GET({ locals }) {
	if (!(await getAdministrator(locals))) return json({ error: 'Administrator access is required.' }, { status: 403 });
	const { data, error } = await getAdminClient().from('availability_blocks')
		.select('id,villa_id,check_in,check_out,note,created_at')
		.order('check_in', { ascending: true });
	if (error) return json({ error: 'Availability blocks could not be loaded.' }, { status: 500 });
	return json({ blocks: data });
}

export async function POST({ request, locals }) {
	const user = await getAdministrator(locals);
	if (!user) return json({ error: 'Administrator access is required.' }, { status: 403 });
	const { villaId, checkIn, checkOut, note = '' } = await request.json();
	const today = new Date().toISOString().slice(0, 10);
	if (!['villa-a', 'villa-b'].includes(villaId) || !datePattern.test(checkIn) || !datePattern.test(checkOut) || checkIn < today || checkOut <= checkIn) {
		return json({ error: 'Choose a valid future date range.' }, { status: 400 });
	}

	const { data, error } = await getAdminClient().from('availability_blocks').insert({
		villa_id: villaId,
		check_in: checkIn,
		check_out: checkOut,
		note: String(note).trim().slice(0, 200) || null,
		created_by: user.id
	}).select('id,villa_id,check_in,check_out,note,created_at').single();
	if (error) return json({ error: error.code === '23P01' ? 'These dates are already marked unavailable.' : 'The unavailable dates could not be saved.' }, { status: 409 });
	return json({ block: data }, { status: 201 });
}

export async function DELETE({ request, locals }) {
	if (!(await getAdministrator(locals))) return json({ error: 'Administrator access is required.' }, { status: 403 });
	const { id } = await request.json();
	if (!id) return json({ error: 'Choose an availability block to remove.' }, { status: 400 });
	const { error } = await getAdminClient().from('availability_blocks').delete().eq('id', id);
	if (error) return json({ error: 'The unavailable dates could not be removed.' }, { status: 500 });
	return json({ ok: true });
}