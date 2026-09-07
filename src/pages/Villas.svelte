<script>
	import { resolve } from '$app/paths';
	import VillaCard from '$lib/components/VillaCard.svelte';
	import { getCatalog } from '$lib/data/catalog.js';
	import { getCopy, language } from '$lib/i18n.js';

	let c = $derived(getCopy($language).villasPage);
	let villas = $derived(getCatalog($language).villas);
</script>

<svelte:head>
	<title>{c.title}</title>
	<meta name="description" content={c.description} />
	<link rel="canonical" href={`https://www.downtownoasis.net${resolve('/villas')}`} />
</svelte:head>

<section class="container py-5">
	<div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
		<div>
			<p class="text-uppercase small text-secondary mb-1">{c.label}</p>
			<h1 class="display-6 fw-semibold mb-0">{c.heading}</h1>
		</div>
		<a class="btn btn-dark" href={resolve('/platforms')}>{c.seePlatforms}</a>
	</div>

	<div class="row g-4">
		{#each villas as villa}
			<div class="col-12 col-lg-6">
				<VillaCard {villa} exploreLabel={c.explore} />
			</div>
		{/each}
	</div>
</section>
