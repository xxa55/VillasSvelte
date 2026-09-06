import { json } from '@sveltejs/kit';
import { getAdminClient } from '$lib/server/supabase.js';

export async function GET({ params }) {
	if (!['villa-a', 'villa-b'].includes(params.villaId)) return json({ error: 'Unknown villa' }, { status: 404 });
	const { data, error } = await getAdminClient().from('bookings').select('check_in,check_out')
		.eq('villa_id', params.villaId).eq('status', 'confirmed');
	if (error) {
		console.error('Availability query failed', error);
		return json({ error: 'Availability could not be loaded' }, { status: 500 });
	}
	return json({ unavailable: data });
}
