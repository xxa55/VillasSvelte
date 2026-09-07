<script>
	import { resolve } from '$app/paths';
	import PlatformCard from '$lib/components/PlatformCard.svelte';
	import Connection from '$lib/components/Connection.svelte';
	import { getCatalog } from '$lib/data/catalog.js';
	import { getCopy, language } from '$lib/i18n.js';

	let c = $derived(getCopy($language).platformsPage);
	let catalog = $derived(getCatalog($language));
</script>

<svelte:head>
	<title>{c.title}</title>
	<meta name="description" content={c.description} />
	<link rel="canonical" href={`https://www.downtownoasis.net${resolve('/platforms')}`} />
</svelte:head>

<section class="container py-5">
	<div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
		<div>
			<p class="text-uppercase small text-secondary mb-1">{c.label}</p>
			<h1 class="display-6 fw-semibold mb-0">{c.heading}</h1>
			<p class="text-secondary mb-0 mt-2">{c.lead}</p>
		</div>
		<a class="btn btn-outline-dark" href={resolve('/villas')}>{c.seeVillas}</a>
	</div>

	<div class="row g-4 mb-4">
		{#each catalog.platforms as platform}
			<div class="col-12 col-md-6 col-xl-4" id={`platform-${platform.id}`}>
				<PlatformCard {platform} />
			</div>
		{/each}
	</div>

	<div class="card border-0 shadow-sm">
		<div class="card-body">
			<h2 class="h5 mb-2">{c.relationship}</h2>
			<p class="small text-secondary mb-3">{c.relationshipLead}</p>
			<div class="d-grid gap-2">
				{#each catalog.businessConnections as item}
					<Connection from={item.from} to={item.to} note={item.note} />
				{/each}
			</div>
		</div>
	</div>
</section>
