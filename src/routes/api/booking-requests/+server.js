import { json } from '@sveltejs/kit';
import { getAdminClient } from '$lib/server/supabase.js';

export async function POST({ request, locals }) {
	const { data: { user } } = await locals.supabase.auth.getUser();
	if (!user) return json({ error: 'Please sign in before requesting a booking.' }, { status: 401 });

	const { villaId, checkIn, checkOut } = await request.json();
	const datePattern = /^\d{4}-\d{2}-\d{2}$/;
	const today = new Date().toISOString().slice(0, 10);
	if (!['villa-a', 'villa-b'].includes(villaId) || !datePattern.test(checkIn) || !datePattern.test(checkOut) || checkIn < today || checkOut <= checkIn) {
		return json({ error: 'Choose a valid stay.' }, { status: 400 });
	}

	const { data: booking, error } = await getAdminClient().from('bookings').insert({
		villa_id: villaId,
		user_id: user.id,
		guest_email: user.email,
		check_in: checkIn,
		check_out: checkOut,
		status: 'requested'
	}).select('id').single();
	if (error) {
		console.error('Booking request could not be created', error);
		return json({ error: 'Your booking request could not be sent. Please try again.' }, { status: 500 });
	}

	return json({ id: booking.id }, { status: 201 });
}