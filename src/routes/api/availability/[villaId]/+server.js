import { json } from '@sveltejs/kit';
import { getAdminClient } from '$lib/server/supabase.js';

export async function GET({ params }) {
	if (!['villa-a', 'villa-b'].includes(params.villaId)) return json({ error: 'Unknown villa' }, { status: 404 });
	const admin = getAdminClient();
	const [{ data: bookings, error: bookingError }, { data: blocks, error: blockError }] = await Promise.all([
		admin.from('bookings').select('check_in,check_out').eq('villa_id', params.villaId).eq('status', 'confirmed'),
		admin.from('availability_blocks').select('check_in,check_out').eq('villa_id', params.villaId)
	]);
	if (bookingError || blockError) {
		console.error('Availability query failed', bookingError ?? blockError);
		return json({ error: 'Availability could not be loaded' }, { status: 500 });
	}
	return json({ unavailable: [...bookings, ...blocks] });
}
