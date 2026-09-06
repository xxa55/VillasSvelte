import { json } from '@sveltejs/kit';
import { sendPaymentProofEmail } from '$lib/server/email.js';
import { getAdminClient } from '$lib/server/supabase.js';

const acceptedTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const maximumFileSize = 10 * 1024 * 1024;

export async function POST({ request, locals }) {
	const { data: { user } } = await locals.supabase.auth.getUser();
	if (!user) return json({ error: 'Please sign in before uploading a payment receipt.' }, { status: 401 });

	const form = await request.formData();
	const bookingId = String(form.get('bookingId') ?? '');
	const receipt = form.get('receipt');
	if (!(receipt instanceof File) || !bookingId || !acceptedTypes.has(receipt.type) || receipt.size > maximumFileSize) {
		return json({ error: 'Upload a JPG, PNG, or WebP payment photo smaller than 10 MB.' }, { status: 400 });
	}

	const admin = getAdminClient();
	const { data: booking, error: bookingError } = await admin.from('bookings')
		.select('id,villa_id,check_in,check_out,guest_email,status')
		.eq('id', bookingId)
		.eq('user_id', user.id)
		.single();
	if (bookingError || !booking || booking.status !== 'requested') {
		return json({ error: 'This booking request is unavailable for receipt upload.' }, { status: 404 });
	}

	const extension = receipt.type.split('/')[1];
	const proofPath = `${user.id}/${booking.id}-${crypto.randomUUID()}.${extension}`;
	const { error: uploadError } = await admin.storage.from('payment-proofs').upload(proofPath, receipt, {
		contentType: receipt.type,
		upsert: false
	});
	if (uploadError) {
		console.error('Payment proof could not be uploaded', uploadError);
		return json({ error: 'Your payment photo could not be uploaded. Please try again.' }, { status: 500 });
	}

	try {
		await sendPaymentProofEmail({
			booking,
			receipt: {
				content: Buffer.from(await receipt.arrayBuffer()).toString('base64'),
				type: receipt.type,
				filename: `payment-receipt.${extension}`
			}
		});
	} catch (emailError) {
		console.error('Payment-proof notification could not be sent', emailError);
		await admin.storage.from('payment-proofs').remove([proofPath]);
		return json({ error: 'We could not notify the booking team. Please try again.' }, { status: 502 });
	}

	const { error: updateError } = await admin.from('bookings').update({
		status: 'under_review',
		payment_proof_path: proofPath,
		payment_proof_submitted_at: new Date().toISOString()
	}).eq('id', booking.id).eq('status', 'requested');
	if (updateError) {
		return json({ error: 'Your payment photo was received, but the booking review could not be started. Please contact us.' }, { status: 500 });
	}

	return json({ ok: true });
}