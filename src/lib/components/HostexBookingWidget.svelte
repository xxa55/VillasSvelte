<script>
	import { asset } from '$app/paths';
	import { getAuthContext } from '$lib/auth/context.js';
	import { getCopy, language } from '$lib/i18n.js';

	/** @type {{ villaId: string }} */
	let { villaId } = $props();
	let auth = getAuthContext();
	let c = $derived(getCopy($language).hostexBooking);
	const listingIds = { 'villa-a': '121779', 'villa-b': '121778' };
	let listingId = $derived(villaId === 'villa-a' ? listingIds['villa-a'] : villaId === 'villa-b' ? listingIds['villa-b'] : '');
	let receiptSubmitted = $state(false);
	let priceChecked = $state(false);
	let nextStepCount = $state(0);
	let submitting = $state(false);
	let uploadError = $state('');

	function signInToBook() {
		const returnTo = `${location.pathname}${location.search}#booking-section`;
		location.href = `/login?returnTo=${encodeURIComponent(returnTo)}`;
	}

	/** @param {Event} event */
	function guardHostexRequest(event) {
		if (receiptSubmitted) return;
		if (event instanceof KeyboardEvent && !['Enter', ' '].includes(event.key)) return;
		const clickedElement = event.composedPath()[0];
		if (!(clickedElement instanceof HTMLElement)) return;
		const action = clickedElement.textContent?.trim();
		if (action === 'Check prices' && !clickedElement.className.toString().includes('cursor-not-allowed')) {
			priceChecked = true;
			nextStepCount = 0;
			return;
		}
		if (action !== 'Next' || !priceChecked || nextStepCount === 0) {
			if (action === 'Next') nextStepCount = 1;
			return;
		}
		event.preventDefault();
		event.stopPropagation();
		uploadError = c.receiptRequired;
		document.getElementById(`receipt-form-${villaId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	/** @param {SubmitEvent} event */
	async function submitReceipt(event) {
		event.preventDefault();
		uploadError = '';
		const form = /** @type {HTMLFormElement} */ (event.currentTarget);
		const formData = new FormData(form);
		formData.set('villaId', villaId);
		submitting = true;
		try {
			const response = await fetch('/api/payment-proofs', { method: 'POST', body: formData });
			const data = await response.json();
			if (!response.ok) throw new Error(data.error || c.receiptRequired);
			receiptSubmitted = true;
		} catch (error) {
			uploadError = error instanceof Error ? error.message : c.receiptRequired;
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<script src="https://hostex.io/app/assets/js/hostex-widget.js?version=20260902163817" type="module"></script>
</svelte:head>

<section class="hostex-booking" aria-labelledby="hostex-booking-title">
	<div class="hostex-heading">
		<p class="eyebrow">{c.eyebrow}</p>
		<h2 id="hostex-booking-title">{c.heading}</h2>
		<p>{c.lead}</p>
	</div>
	{#if listingId}
		{#if !auth.ready}
			<p class="auth-message">{c.checkingAuth}</p>
		{:else if !auth.user}
			<div class="auth-message">
				<strong>{c.signInRequired}</strong>
				<p>{c.signInLead}</p>
				<button type="button" onclick={signInToBook}>{c.signIn}</button>
			</div>
		{:else}
		<div class="hostex-widget-shell">
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<hostex-booking-widget
				listing-id={listingId}
				id="eyJob3N0X2lkIjoiMTA1MTY1Iiwid2lkZ2V0X2hvc3QiOiJodHRwczovL3cuaG9zdGV4Ym9va2luZy5zaXRlIn0="
				role="group"
				onclick={guardHostexRequest}
				onkeydown={guardHostexRequest}
			></hostex-booking-widget>
			{#if priceChecked && nextStepCount > 0 && !receiptSubmitted}
				<div class="booking-lock" role="status">
					<strong>{c.uploadToContinue}</strong>
				</div>
			{/if}
		</div>
		{#if !priceChecked}
			<div class="payment-note"><strong>{c.chooseDates}</strong><p>{c.chooseDatesLead}</p></div>
		{:else if !receiptSubmitted}
			<div class="payment-note">
				<strong>{c.manualPayment}</strong>
				<p>{c.manualPaymentLead}</p>
				<dl class="payment-details">
					<div><dt>{c.bank}</dt><dd>{c.bankValue}</dd></div>
					<div><dt>{c.branch}</dt><dd>{c.branchValue}</dd></div>
					<div><dt>{c.accountNumber}</dt><dd>{c.accountNumberValue}</dd></div>
					<div><dt>{c.accountName}</dt><dd>{c.accountNameValue}</dd></div>
					<div><dt>{c.accountType}</dt><dd>{c.accountTypeValue}</dd></div>
				</dl>
				<div class="qr-payment">
					<div>
						<strong>{c.payPromptPay}</strong>
						<p>{c.promptPayLead}</p>
					</div>
					<img src={asset('/QR.jpg')} alt={c.qrAlt} width="768" height="1024" loading="lazy" decoding="async" />
				</div>
			</div>
			<form id={`receipt-form-${villaId}`} class="receipt-form" onsubmit={submitReceipt}>
				<label for={`guest-email-${villaId}`}>{c.email}</label>
				<input id={`guest-email-${villaId}`} name="guestEmail" type="email" autocomplete="email" required />
				<label for={`receipt-${villaId}`}>{c.receiptPhoto}</label>
				<input id={`receipt-${villaId}`} name="receipt" type="file" accept="image/jpeg,image/png,image/webp" required />
				<button type="submit" disabled={submitting}>{submitting ? c.sending : c.sendReceipt}</button>
				{#if uploadError}<p class="form-error" role="alert">{uploadError}</p>{/if}
			</form>
		{:else}
			<div class="receipt-success" role="status"><strong>{c.receiptReceived}</strong> {c.receiptContinue}</div>
		{/if}
		{/if}
	{:else}
		<p class="widget-error">{c.unavailable}</p>
	{/if}
</section>

<style>
	.hostex-booking { display: grid; gap: 1.5rem; padding: clamp(1.5rem, 4vw, 3rem); border-top: 3px solid #172a22; background: #efe9dc; }
	.hostex-heading { max-width: 42rem; }
	.hostex-widget-shell { position: relative; }
	.eyebrow { margin: 0 0 .75rem; color: #b86138; font-size: .75rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
	h2 { margin: 0 0 1rem; color: #172a22; font-family: Georgia, serif; font-size: clamp(2rem, 4vw, 3.25rem); font-weight: 500; line-height: 1.05; }
	p { margin: 0; font-size: 1.05rem; line-height: 1.65; }
	.widget-error { color: #a52a2a; font-weight: 700; }
	.booking-lock { position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: flex-end; padding: 1rem; background: rgb(23 42 34 / 72%); color: #fff; text-align: center; pointer-events: auto; }
	.booking-lock strong { display: grid; place-items: center; width: 50%; min-height: 52px; padding: .75rem 1rem; background: #6b7280; font-size: .95rem; }
	.payment-note, .receipt-success { padding: 1rem 1.25rem; border-left: 4px solid #b86138; background: #f7eee7; }
	.payment-note p { margin-top: .5rem; }
	.payment-details { display: grid; gap: .35rem; margin: 1rem 0 0; }
	.payment-details div { display: grid; grid-template-columns: 9rem 1fr; gap: .75rem; }
	.payment-details dt { color: #536158; font-weight: 700; }
	.payment-details dd { margin: 0; font-weight: 700; overflow-wrap: anywhere; }
	.qr-payment { display: grid; grid-template-columns: 1fr minmax(10rem, 14rem); gap: 1rem; align-items: center; margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid #d8d1c3; }
	.qr-payment p { margin-top: .35rem; }
	.qr-payment img { width: 100%; height: auto; background: #fff; }
	.receipt-form { display: grid; gap: .75rem; max-width: 34rem; }
	.receipt-form label { font-weight: 700; }
	.receipt-form input { padding: .75rem; border: 1px solid #aeb4ae; background: #fff; }
	.receipt-form button { justify-self: start; padding: .85rem 1.2rem; border: 0; background: #172a22; color: #fff; font-weight: 700; }
	.receipt-form button:disabled { opacity: .55; }
	.form-error { color: #a52a2a; font-weight: 700; }
	.auth-message { display: grid; gap: .65rem; padding: 1.25rem; background: #fff; border: 1px solid #d8d1c3; }
	.auth-message p { margin: 0; }
	.auth-message button { justify-self: start; padding: .85rem 1.2rem; border: 0; background: #172a22; color: #fff; font-weight: 700; }
	@media (max-width: 600px) { .payment-details div, .qr-payment { grid-template-columns: 1fr; } .qr-payment img { max-width: 14rem; } }
</style>
