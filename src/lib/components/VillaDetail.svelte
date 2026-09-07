<script>
	import { resolve } from '$app/paths';
	import HostexBookingWidget from '$lib/components/HostexBookingWidget.svelte';
	import VillaComments from '$lib/components/VillaComments.svelte';
	import { getCatalog } from '$lib/data/catalog.js';
	import { getCopy, language } from '$lib/i18n.js';

	let { villa: sourceVilla } = $props();
	let c = $derived(getCopy($language).villaDetail);
	let villa = $derived(getCatalog($language).villas.find((item) => item.id === sourceVilla.id) ?? sourceVilla);
	let visiblePhotoCount = $state(8);
	let visibleGallery = $derived(villa.gallery.slice(0, visiblePhotoCount));

	/** @param {Event} event */
	const loadMorePhotosOnScroll = (event) => {
		const gallery = /** @type {HTMLElement} */ (event.currentTarget);
		const isNearEnd = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 320;

		if (isNearEnd && visiblePhotoCount < villa.gallery.length) {
			visiblePhotoCount = Math.min(visiblePhotoCount + 8, villa.gallery.length);
		}
	};

</script>

<svelte:head>
	<title>{villa.name} | {c.siteName}</title>
	<meta name="description" content={villa.description} />
	<link rel="canonical" href={`https://www.downtownoasis.net${villa.href}`} />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'LodgingBusiness',
		name: villa.name,
		description: villa.description,
		url: `https://www.downtownoasis.net${villa.href}`,
		...(villa.cover ? { image: villa.cover } : {}),
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Pattaya',
			addressRegion: 'Chon Buri',
			addressCountry: 'TH'
		},
		numberOfRooms: villa.quickInfo?.bedrooms,
		amenityFeature: villa.quickInfo?.highlights?.map(
			/** @param {string} h */ (h) => ({
				'@type': 'LocationFeatureSpecification',
				name: h,
				value: true
			})
		)
	})}<\/script>`}
</svelte:head>

<article class="container py-4 py-lg-5">
	<nav aria-label={c.breadcrumb ?? ($language === 'zh-TW' ? '頁面路徑' : 'Breadcrumb')} class="mb-4 small">
		<a href={resolve('/')} class="text-decoration-none">{c.home}</a>
		<span class="mx-2 text-secondary">/</span>
		<a href={resolve('/villas')} class="text-decoration-none">{c.villas}</a>
		<span class="mx-2 text-secondary">/</span>
		<span aria-current="page">{villa.name}</span>
	</nav>

	<header class="villa-hero mb-4">
		{#if villa.cover}
			<img
				src={villa.cover}
				alt={`${villa.name} ${c.poolAlt}`}
				width={villa.width}
				height={villa.height}
				class="img-fluid rounded-4 shadow-sm"
				loading="eager"
				decoding="async"
				fetchpriority="high"
			/>
		{:else}
			<div class="villa-placeholder rounded-4" role="img" aria-label={villa.coverAlt ?? villa.name}>
				{villa.coverAlt ?? villa.name}
			</div>
		{/if}
	</header>

	<div class="row g-4">
		<section class="col-12 col-lg-8" aria-labelledby="villa-title">
			<h1 id="villa-title" class="mb-3">{villa.name}</h1>
			<p class="lead text-secondary">{villa.description}</p>

			<section aria-labelledby="amenities-heading" class="mb-4">
				<h2 id="amenities-heading" class="h4">{c.amenities}</h2>
				<ul class="ps-3 mb-0">
					{#each villa.features as feature}
						<li>{feature}</li>
					{/each}
				</ul>
			</section>

			{#if !villa.underConstruction}
				<a class="btn btn-dark mt-4" href="#booking-section">{c.ready}</a>
		{/if}
		</section>

		<aside class="col-12 col-lg-4" aria-labelledby="quick-info-heading">
			<div class="card border-0 shadow-sm quick-info-card">
				<div class="card-body">
					<h2 id="quick-info-heading" class="h4">{c.quickInfo}</h2>
					<dl class="quick-info-list mb-0">
						<div>
							<dt>{c.guests}</dt>
							<dd>{villa.quickInfo.guests}</dd>
						</div>
						<div>
							<dt>{c.bedrooms}</dt>
							<dd>{villa.quickInfo.bedrooms}</dd>
						</div>
						<div>
							<dt>{c.bathrooms}</dt>
							<dd>{villa.quickInfo.bathrooms}</dd>
						</div>
						<div>
							<dt>{c.location}</dt>
							<dd>{villa.quickInfo.location}</dd>
						</div>
						<div>
							<dt>{c.booking}</dt>
							<dd>{villa.quickInfo.booking}</dd>
						</div>
						<div>
							<dt>{c.highlights}</dt>
							<dd>{villa.quickInfo.highlights.join(', ')}</dd>
						</div>
					</dl>
				</div>
			</div>
		</aside>
	</div>

	{#if !villa.underConstruction}
		<section class="mt-5" id="booking-section"><HostexBookingWidget villaId={villa.id} /></section>
	{/if}

	{#if villa.gallery.length}
	<section aria-labelledby="gallery-title" class="mt-5">
		<div class="d-flex justify-content-between align-items-end gap-3 mb-3">
			<h2 id="gallery-title" class="h3 mb-0">{c.gallery}</h2>
			<p class="small text-secondary mb-0">{visibleGallery.length} / {villa.gallery.length}</p>
		</div>
		<div
			class="gallery-scroll"
			onscroll={loadMorePhotosOnScroll}
		>
			{#each visibleGallery as image}
				<figure class="gallery-item mb-0">
					<img
						src={image.src}
						class="img-fluid rounded-4 shadow-sm gallery-image"
						alt={image.alt}
						width="1600"
						height="1200"
						loading="lazy"
						decoding="async"
					/>
				</figure>
			{/each}
		</div>
		<p class="small text-secondary mt-2 mb-0">{c.scrollMore}</p>
	</section>
	{/if}
	{#if !villa.underConstruction}
		<VillaComments villaId={villa.id} />
	{/if}
</article>

<style>
	.villa-hero img {
		width: 100%;
		max-height: 32rem;
		object-fit: cover;
	}

	.gallery-image {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
	}

	.gallery-scroll {
		display: flex;
		gap: 1rem;
		overflow-x: auto;
		padding: 0.25rem 0.15rem 1rem;
		scroll-snap-type: x proximity;
		overscroll-behavior-inline: contain;
		scrollbar-width: thin;
	}

	.gallery-item {
		flex: 0 0 min(78vw, 25rem);
		scroll-snap-align: start;
	}

	:global(#booking-section) {
		scroll-margin-top: 1.5rem;
	}

	.villa-placeholder {
		display: grid;
		place-items: center;
		width: 100%;
		min-height: 24rem;
		background: linear-gradient(145deg, #eff6fb 0%, #d7e7f3 100%);
		color: #526b79;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.quick-info-card {
		align-self: start;
	}

	.quick-info-list {
		display: grid;
		gap: 0.85rem;
	}

	.quick-info-list div {
		padding-bottom: 0.75rem;
		border-bottom: 1px solid rgb(19 48 63 / 8%);
	}

	.quick-info-list div:last-child {
		padding-bottom: 0;
		border-bottom: 0;
	}

	.quick-info-list dt {
		margin-bottom: 0.15rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #617785;
	}

	.quick-info-list dd {
		margin: 0;
		color: #1f3340;
	}
</style>
