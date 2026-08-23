<script>
	import { resolve } from '$app/paths';
	import PlatformCard from '$lib/components/PlatformCard.svelte';
	import Connection from '$lib/components/Connection.svelte';
	import { businessConnections, platforms } from '$lib/data/catalog.js';
</script>

<svelte:head>
	<title>Booking Platforms | Pattaya Villas</title>
	<meta
		name="description"
		content="Book Downtown Oasis villas directly on Airbnb and Booking.com, or find both villas on Trip.com."
	/>
	<link rel="canonical" href={`https://www.downtownoasis.net${resolve('/platforms')}`} />
</svelte:head>

<section class="container py-5">
	<div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
		<div>
			<p class="text-uppercase small text-secondary mb-1">Platforms</p>
			<h1 class="display-6 fw-semibold mb-0">Pick a platform</h1>
			<p class="text-secondary mb-0 mt-2">
				Trip.com is shared. Airbnb splits by villa.
			</p>
		</div>
		<a class="btn btn-outline-dark" href={resolve('/villas')}>See villas</a>
	</div>

	<div class="row g-4 mb-4">
		{#each platforms as platform}
			<div class="col-12 col-md-6 col-xl-4">
				<PlatformCard {platform} />
			</div>
		{/each}
	</div>

	<div class="card border-0 shadow-sm">
		<div class="card-body">
			<h2 class="h5 mb-2">Business relationship</h2>
			<p class="small text-secondary mb-3">
				Trip.com points to both villas through one shared listing, while Airbnb splits into one listing per villa.
			</p>
			<div class="d-grid gap-2">
				{#each businessConnections as item}
					<Connection from={item.from} to={item.to} note={item.note} />
				{/each}
			</div>
		</div>
	</div>
</section>
