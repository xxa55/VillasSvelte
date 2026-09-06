import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

/**
 * Sends the welcome message from the server so the SendGrid API key is never
 * included in browser JavaScript.
 * @param {string} recipient
 */
export async function sendWelcomeEmail(recipient) {
	const apiKey = env.SENDGRID_API_KEY;
	const fromEmail = env.SENDGRID_FROM_EMAIL;
	if (!apiKey || !fromEmail) {
		throw new Error('SendGrid server environment variables are not configured.');
	}

	const siteUrl = publicEnv.PUBLIC_SITE_URL || 'http://localhost:5173';
	const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
		method: 'POST',
		headers: {
			authorization: `Bearer ${apiKey}`,
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			personalizations: [{ to: [{ email: recipient }] }],
			from: {
				email: fromEmail,
				name: env.SENDGRID_FROM_NAME || 'Downtown Oasis'
			},
			subject: 'Welcome to Downtown Oasis',
			content: [
				{
					type: 'text/plain',
					value: `Welcome to Downtown Oasis. Your account has been created. Explore our villas at ${siteUrl}/villas`
				},
				{
					type: 'text/html',
					value: `<h1>Welcome to Downtown Oasis</h1><p>Your account has been created.</p><p><a href="${siteUrl}/villas">Explore our villas</a></p>`
				}
			]
		})
	});

	if (!response.ok) {
		const details = await response.text();
		throw new Error(`SendGrid rejected the welcome email (${response.status}): ${details}`);
	}
}

/** @param {string} value */
const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character);

/** @param {{ booking: { id: string, villa_id: string, check_in: string, check_out: string, guest_email: string }, receipt: { content: string, type: string, filename: string } }} payment */
export async function sendPaymentProofEmail({ booking, receipt }) {
	const apiKey = env.SENDGRID_API_KEY;
	const fromEmail = env.SENDGRID_FROM_EMAIL;
	if (!apiKey || !fromEmail) throw new Error('SendGrid server environment variables are not configured.');

	const villaName = booking.villa_id === 'villa-b' ? 'Villa B' : 'Villa A';
	const text = `A payment receipt was uploaded for ${villaName}, ${booking.check_in} to ${booking.check_out}. Guest: ${booking.guest_email}. The payment receipt is attached to this email.`;
	const html = `<h1>Payment receipt uploaded</h1><p><strong>${escapeHtml(villaName)}</strong>: ${escapeHtml(booking.check_in)} to ${escapeHtml(booking.check_out)}</p><p>Guest: ${escapeHtml(booking.guest_email)}</p><p>The payment receipt is attached to this email.</p>`;
	const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
		method: 'POST',
		headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
		body: JSON.stringify({
			personalizations: [{ to: [{ email: 'oasis55168@gmail.com' }] }],
			from: { email: fromEmail, name: env.SENDGRID_FROM_NAME || 'Downtown Oasis' },
			subject: `Payment receipt: ${villaName} ${booking.check_in} to ${booking.check_out}`,
			content: [{ type: 'text/plain', value: text }, { type: 'text/html', value: html }],
			attachments: [{ content: receipt.content, type: receipt.type, filename: receipt.filename, disposition: 'attachment' }]
		})
	});
	if (!response.ok) throw new Error(`SendGrid rejected the payment-proof email (${response.status}): ${await response.text()}`);
}
