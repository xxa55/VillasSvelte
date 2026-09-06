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
	<nav aria-label="Breadcrumb" class="mb-4">
		<a class="home-tag" href={resolve('/')}>Home</a>
	</nav>
	<div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
		<div>
			<p class="text-uppercase small text-secondary mb-1">{c.label}</p>
			<h1 class="display-6 fw-semibold mb-0">{c.heading}</h1>
		</div>
	</div>

	<div class="row g-4">
		{#each villas as villa}
			<div class="col-12 col-lg-6">
				<VillaCard {villa} exploreLabel={c.explore} />
			</div>
		{/each}
	</div>
</section>

<style>
	.home-tag {
		display: inline-flex;
		align-items: center;
		padding: 0.4rem 0.75rem;
		border: 1px solid rgb(19 48 63 / 18%);
		border-radius: 999px;
		background: #fff;
		color: #264f3d;
		font-size: 0.85rem;
		font-weight: 700;
		text-decoration: none;
	}

	.home-tag:hover {
		background: #f0f5f1;
	}
</style>
