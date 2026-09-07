<script>
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import { getCopy, language } from '$lib/i18n.js';

	let villaId = $derived(page.url.searchParams.get('villa'));
	let c = $derived(getCopy($language).payment);
	let villaName = $derived($language === 'zh-TW' ? (villaId === 'villa-b' ? 'B棟別墅' : 'A棟別墅') : (villaId === 'villa-b' ? 'Villa B' : 'Villa A'));
	let checkIn = $derived(page.url.searchParams.get('checkIn'));
	let checkOut = $derived(page.url.searchParams.get('checkOut'));
	let bookingId = $derived(page.url.searchParams.get('booking'));
	let submitting = $state(false);
	let reviewSubmitted = $state(false);
	let uploadError = $state('');

	/** @param {SubmitEvent} event */
	async function submitReceipt(event) {
		event.preventDefault();
		uploadError = '';
		const form = /** @type {HTMLFormElement} */ (event.currentTarget);
		const formData = new FormData(form);
		if (!bookingId) { uploadError = c.missingBooking; return; }
		formData.set('bookingId', bookingId);
		submitting = true;
		try {
			const response = await fetch('/api/payment-proofs', { method: 'POST', body: formData });
			const data = await response.json();
			if (!response.ok) throw new Error(c.uploadFailed);
			reviewSubmitted = true;
		} catch (error) {
			uploadError = error instanceof Error ? error.message : c.uploadFailed;
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>{c.title}</title>
	<meta name="description" content={c.description} />
</svelte:head>

<main class="payment-page">
	<header class="payment-heading">
		<p class="eyebrow">{c.requestReceived}</p>
		<h1>{c.heading}</h1>
		<p>{c.lead}</p>
		{#if checkIn && checkOut}
			<p class="stay-summary">{c.staySummary.replace('{villa}', villaName).replace('{checkIn}', checkIn).replace('{checkOut}', checkOut)}</p>
		{/if}
	</header>

	<section class="payment-section" aria-labelledby="promptpay-heading">
		<div class="payment-copy">
			<p class="eyebrow">{c.promptPay}</p>
			<h2 id="promptpay-heading">{c.scanHeading}</h2>
			<p>{c.scanLead}</p>
		</div>
		<img
			src={asset('/QR.jpg')}
			alt={c.qrAlt}
			class="payment-qr"
			width="768"
			height="1024"
			loading="eager"
			decoding="sync"
		/>
	</section>

	<section class="account-section" aria-labelledby="account-heading">
		<div>
			<p class="eyebrow">{c.accountVerification}</p>
			<h2 id="account-heading">{c.accountHeading}</h2>
			<p>{c.accountLead}</p>
		</div>
		<table class="account-details">
			<tbody>
				<tr><th scope="row">{c.accountBank}</th><td>{c.accountBankValue}</td></tr>
				<tr><th scope="row">{c.accountBranch}</th><td>{c.accountBranchValue}</td></tr>
				<tr><th scope="row">{c.accountNumber}</th><td>{c.accountNumberValue}</td></tr>
				<tr><th scope="row">{c.accountName}</th><td>{c.accountNameValue}</td></tr>
				<tr><th scope="row">{c.accountType}</th><td>{c.accountTypeValue}</td></tr>
			</tbody>
		</table>
	</section>

	<section class="receipt-section" aria-labelledby="receipt-heading">
		{#if reviewSubmitted}
			<p class="eyebrow">{c.receiptReceived}</p>
			<h2 id="receipt-heading">{c.reviewHeading}</h2>
			<p>{c.reviewLead}</p>
		{:else}
			<p class="eyebrow">{c.finalStep}</p>
			<h2 id="receipt-heading">{c.uploadHeading}</h2>
			<p>{c.uploadLead}</p>
			<form onsubmit={submitReceipt}>
				<label for="receipt">{c.paymentPhoto}</label>
				<input id="receipt" name="receipt" type="file" accept="image/jpeg,image/png,image/webp" required />
				<button type="submit" disabled={submitting}>{submitting ? c.uploading : c.submitPhoto}</button>
			</form>
			{#if uploadError}<p class="form-error" role="alert">{uploadError}</p>{/if}
		{/if}
	</section>

	<a class="back-link" href={resolve(`/villas/${villaId === 'villa-b' ? 'villa-b' : 'villa-a'}`)}>{c.returnToVilla}</a>
</main>

<style>
	.payment-page { max-width: 68rem; margin: 0 auto; padding: clamp(2rem, 6vw, 5rem) clamp(1rem, 4vw, 2rem) 5rem; color: #172a22; }
	.payment-heading { max-width: 44rem; margin-bottom: clamp(2.5rem, 6vw, 5rem); }
	.eyebrow { margin-bottom: .75rem; color: #b86138; font-size: .75rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
	h1, h2 { font-family: Georgia, serif; font-weight: 500; }
	h1 { margin: 0 0 1.25rem; font-size: clamp(2.75rem, 6vw, 5.25rem); line-height: 1; }
	h2 { margin: 0 0 1rem; font-size: clamp(2rem, 4vw, 3.25rem); line-height: 1.05; }
	p { font-size: 1.05rem; line-height: 1.65; }
	.stay-summary { margin-top: 1.5rem; font-weight: 700; }
	.payment-section, .account-section { display: grid; grid-template-columns: minmax(0, .85fr) minmax(18rem, 1fr); align-items: center; gap: clamp(2rem, 7vw, 6rem); padding: clamp(2rem, 6vw, 5rem) 0; border-top: 1px solid #d8d1c3; }
	.payment-qr { display: block; width: min(100%, 48rem); height: auto; margin: 0 auto; background: #fff; }
	.account-section { grid-template-columns: minmax(0, .85fr) minmax(18rem, 1.15fr); }
	.account-details { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #d8d1c3; }
	.account-details th, .account-details td { padding: 1rem 1.1rem; border-bottom: 1px solid #d8d1c3; text-align: left; vertical-align: top; }
	.account-details th { width: 38%; color: #536158; font-size: .85rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
	.account-details td { font-weight: 700; overflow-wrap: anywhere; }
	.account-details tr:last-child th, .account-details tr:last-child td { border-bottom: 0; }
	.receipt-section { max-width: 44rem; padding: clamp(2rem, 6vw, 5rem) 0; border-top: 1px solid #d8d1c3; }
	form { display: grid; gap: .85rem; margin-top: 1.5rem; }
	input { max-width: 100%; padding: .75rem; border: 1px solid #aeb4ae; background: #fff; }
	button { justify-self: start; padding: .85rem 1.2rem; border: 0; background: #172a22; color: #fff; font-weight: 700; }
	button:disabled { opacity: .55; }
	.form-error { color: #a52a2a; font-weight: 700; }
	.back-link { display: inline-block; margin-top: 3rem; color: #172a22; font-weight: 700; text-underline-offset: .2em; }
	@media (max-width: 720px) { .payment-section, .account-section { grid-template-columns: 1fr; gap: 1.5rem; } .payment-section { padding-top: 2rem; } .account-details th, .account-details td { padding: .8rem; } }
</style>