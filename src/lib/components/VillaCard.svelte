<script>
	let { villa } = $props();
</script>

<article class="card h-100 shadow-sm border-0 villa-card">
	<img src={villa.cover} class="card-img-top" alt={villa.name} loading="lazy" />
	<div class="card-body d-flex flex-column">
		<div class="d-flex justify-content-between align-items-center mb-2">
			<h3 class="h5 mb-0">{villa.name}</h3>
		</div>
		<p class="text-secondary small mb-3">{villa.tagline}</p>
		<ul class="list-group list-group-flush mb-3">
			{#each villa.features as feature}
				<li class="list-group-item px-0">{feature}</li>
			{/each}
		</ul>
		<a class="btn btn-outline-dark mt-auto" href={villa.href}>Explore {villa.name}</a>
	</div>
</article>

<style>
	.villa-card {
		border-radius: 1rem;
		overflow: hidden;
		transition: transform 180ms ease;
	}

	.villa-card:hover {
		transform: translateY(-4px);
	}

	.card-img-top {
		height: 210px;
		object-fit: cover;
	}
</style>
