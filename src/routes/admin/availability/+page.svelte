<script>
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';

	let villaId = $state('villa-a');
	let checkIn = $state('');
	let checkOut = $state('');
	let note = $state('');
	/** @type {Array<{ id: string, villa_id: string, check_in: string, check_out: string, note: string | null, created_at: string }>} */
	let blocks = $state([]);
	let message = $state('');
	let busy = $state(false);
	let today = new Date().toISOString().slice(0, 10);

	async function loadBlocks() {
		const response = await fetch('/api/admin/availability-blocks');
		const data = await response.json();
		if (response.ok) blocks = data.blocks;
		else message = data.error;
	}

	onMount(loadBlocks);

	async function addBlock() {
		message = '';
		if (!checkIn || !checkOut || checkOut <= checkIn) {
			message = 'Choose a valid check-in and check-out range.';
			return;
		}
		busy = true;
		const response = await fetch('/api/admin/availability-blocks', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ villaId, checkIn, checkOut, note })
		});
		const data = await response.json();
		if (response.ok) {
			blocks = [...blocks, data.block].sort((first, second) => first.check_in.localeCompare(second.check_in));
			checkIn = '';
			checkOut = '';
			note = '';
			message = 'Dates marked unavailable.';
		} else message = data.error;
		busy = false;
	}

	/** @param {string} id */
	async function removeBlock(id) {
		message = '';
		const response = await fetch('/api/admin/availability-blocks', {
			method: 'DELETE',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ id })
		});
		const data = await response.json();
		if (response.ok) {
			blocks = blocks.filter((block) => block.id !== id);
			message = 'Unavailable dates removed.';
		} else message = data.error;
	}
</script>

<svelte:head><title>Availability manager | Downtown Oasis</title></svelte:head>

<main class="availability-page">
	<header>
		<p class="eyebrow">Administrator</p>
		<h1>Availability manager</h1>
		<p>Mark dates unavailable after checking the Hotext calendar. These dates immediately appear as booked to guests.</p>
	</header>

	<section class="block-form" aria-labelledby="block-heading">
		<h2 id="block-heading">Block dates</h2>
		<div class="field-grid">
			<label>Villa<select bind:value={villaId}><option value="villa-a">Villa A</option><option value="villa-b">Villa B</option></select></label>
			<label>Check in<input bind:value={checkIn} min={today} type="date" /></label>
			<label>Check out<input bind:value={checkOut} min={checkIn || today} type="date" /></label>
			<label class="note-field">Note <span>(optional)</span><input bind:value={note} maxlength="200" placeholder="Maintenance, Hotext booking, owner stay" /></label>
		</div>
		<button onclick={addBlock} disabled={busy}>{busy ? 'Saving...' : 'Mark unavailable'}</button>
		{#if message}<p class="message" aria-live="polite">{message}</p>{/if}
	</section>

	<section class="block-list" aria-labelledby="active-blocks-heading">
		<div class="section-heading"><h2 id="active-blocks-heading">Active unavailable dates</h2><button class="refresh" onclick={loadBlocks}>Refresh</button></div>
		{#each blocks as block}
			<article>
				<div><strong>{block.villa_id === 'villa-a' ? 'Villa A' : 'Villa B'}</strong><span>{block.check_in} to {block.check_out}</span>{#if block.note}<small>{block.note}</small>{/if}</div>
				<button class="remove" onclick={() => removeBlock(block.id)}>Remove</button>
			</article>
		{:else}<p class="empty">No manually blocked dates.</p>{/each}
	</section>
	<a href={resolve('/villas')} class="back-link">Return to villas</a>
</main>

<style>
	.availability-page{max-width:68rem;margin:0 auto;padding:clamp(2rem,6vw,5rem) clamp(1rem,4vw,2rem) 5rem;color:#172a22}.availability-page>header{max-width:46rem;margin-bottom:3rem}.eyebrow{text-transform:uppercase;letter-spacing:.16em;font-size:.75rem;color:#b86138;font-weight:700}h1,h2{font-family:Georgia,serif;font-weight:500}h1{margin:.5rem 0 1rem;font-size:clamp(2.75rem,6vw,5rem);line-height:1}h2{margin:0;font-size:clamp(1.75rem,4vw,2.6rem)}p{line-height:1.6}.block-form,.block-list{padding:clamp(1.5rem,4vw,3rem);border-top:3px solid #172a22;background:#fff}.field-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;margin:1.75rem 0}label{display:grid;gap:.45rem;font-weight:700}input,select{width:100%;padding:.75rem;border:1px solid #afa897;background:#faf8f2;font:inherit}.note-field{grid-column:1/-1}.note-field span{font-weight:400}.block-form button,.remove{padding:.8rem 1.2rem;border:0;background:#172a22;color:#fff;font-weight:700}.message{margin:1rem 0 0;font-weight:700}.block-list{margin-top:2rem;border-top-width:1px}.section-heading{display:flex;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1.5rem}.refresh{padding:0;border:0;background:transparent;color:#172a22;font-weight:700;text-decoration:underline;text-underline-offset:.2em}.block-list article{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1rem 0;border-top:1px solid #d8d1c3}.block-list article div{display:grid;gap:.2rem}.block-list span{color:#5f665f}.block-list small{color:#7c4c31}.remove{background:#8f2d2d}.empty{color:#5f665f}.back-link{display:inline-block;margin-top:3rem;color:#172a22;font-weight:700;text-underline-offset:.2em}@media(max-width:700px){.field-grid{grid-template-columns:1fr}.note-field{grid-column:auto}.block-list article{align-items:flex-start;flex-direction:column}.remove{width:100%}}
</style>