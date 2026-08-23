<script>
	import { resolve } from '$app/paths';
	import VillaCard from '$lib/components/VillaCard.svelte';
	import { villas } from '$lib/data/catalog.js';
</script>

<svelte:head>
	<title>Villas | Pattaya Villas</title>
	<meta
		name="description"
		content="Browse Villa A and Villa B, private pool villas in central Pattaya with BBQ, KTV, and flexible direct or platform booking."
	/>
	<link rel="canonical" href={`https://www.downtownoasis.net${resolve('/villas')}`} />
</svelte:head>

<section class="container py-5">
	<div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
		<div>
			<p class="text-uppercase small text-secondary mb-1">Villas</p>
			<h1 class="display-6 fw-semibold mb-0">Pick a villa</h1>
		</div>
		<a class="btn btn-dark" href={resolve('/platforms')}>See platforms</a>
	</div>

	<div class="row g-4">
		{#each villas as villa}
			<div class="col-12 col-lg-6">
				<VillaCard {villa} />
			</div>
		{/each}
	</div>
</section>
