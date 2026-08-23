<script>
	import { resolve } from '$app/paths';
	import PlatformButton from '$lib/components/PlatformButton.svelte';
	import { platforms } from '$lib/data/catalog.js';

	let { villa } = $props();

	const bookingPlatforms = platforms
		.map((platform) => {
			const platformLinks =
				platform.id === 'trip'
					? platform.links
					: platform.links.filter((link) => link.label.includes(villa.name));

			return {
				id: platform.id,
				name: platform.name,
				badge: platform.id === 'trip' ? 'Shared listing' : platform.region,
				kicker: platform.id === 'trip' ? 'Both villas' : villa.name,
				thumbnail: platform.thumbnail,
				logo: platform.logo,
				logoAlt: platform.logoAlt,
				summary:
					platform.id === 'trip'
						? 'Shared listing for both villas.'
						: `Direct ${platform.name} listing for ${villa.name}.`,
				links: platformLinks
			};
		})
		.filter((platform) => platform.links.length > 0);
</script>

<svelte:head>
	<title>{villa.name} | Pattaya Villas</title>
	<meta name="description" content={villa.description} />
	<link rel="canonical" href={`https://www.downtownoasis.net${villa.href}`} />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'LodgingBusiness',
		name: villa.name,
		description: villa.description,
		url: `https://www.downtownoasis.net${villa.href}`,
		image: villa.cover,
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
	<nav aria-label="Breadcrumb" class="mb-4 small">
		<a href={resolve('/')} class="text-decoration-none">Home</a>
		<span class="mx-2 text-secondary">/</span>
		<a href={resolve('/villas')} class="text-decoration-none">Villas</a>
		<span class="mx-2 text-secondary">/</span>
		<span aria-current="page">{villa.name}</span>
	</nav>

	<header class="villa-hero mb-4">
		<img
			src={villa.cover}
			alt={`${villa.name} swimming pool`}
			width={villa.width}
			height={villa.height}
			class="img-fluid rounded-4 shadow-sm"
			loading="eager"
			decoding="async"
			fetchpriority="high"
		/>
	</header>

	<div class="row g-4">
		<section class="col-12 col-lg-8" aria-labelledby="villa-title">
			<h1 id="villa-title" class="mb-3">{villa.name}</h1>
			<p class="lead text-secondary">{villa.description}</p>

			<section aria-labelledby="amenities-heading" class="mb-4">
				<h2 id="amenities-heading" class="h4">Amenities</h2>
				<ul class="ps-3 mb-0">
					{#each villa.features as feature}
						<li>{feature}</li>
					{/each}
				</ul>
			</section>

			<a class="btn btn-dark mt-4" href="#booking-section">Ready to book</a>
		</section>

		<aside class="col-12 col-lg-4" aria-labelledby="quick-info-heading">
			<div class="card border-0 shadow-sm quick-info-card">
				<div class="card-body">
					<h2 id="quick-info-heading" class="h4">Quick Info</h2>
					<dl class="quick-info-list mb-0">
						<div>
							<dt>Guests</dt>
							<dd>{villa.quickInfo.guests}</dd>
						</div>
						<div>
							<dt>Bedrooms</dt>
							<dd>{villa.quickInfo.bedrooms}</dd>
						</div>
						<div>
							<dt>Bathrooms</dt>
							<dd>{villa.quickInfo.bathrooms}</dd>
						</div>
						<div>
							<dt>Location</dt>
							<dd>{villa.quickInfo.location}</dd>
						</div>
						<div>
							<dt>Booking</dt>
							<dd>{villa.quickInfo.booking}</dd>
						</div>
						<div>
							<dt>Highlights</dt>
							<dd>{villa.quickInfo.highlights.join(', ')}</dd>
						</div>
					</dl>
				</div>
			</div>
		</aside>
	</div>

	<section aria-labelledby="booking-heading" class="mt-5" id="booking-section">
		<div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
			<div>
				<h2 id="booking-heading" class="h3 mb-1">Choose your platform</h2>
				<p class="text-secondary mb-0">Trip.com is shared. Airbnb and Booking.com are villa-specific.</p>
			</div>
		</div>

		<div class="row g-3" aria-label={`Booking platforms for ${villa.name}`}>
			{#each bookingPlatforms as platform}
				<section class="col-12 col-lg-4" aria-labelledby={`${villa.id}-${platform.name}`}>
					<article class="booking-option card border-0 shadow-sm h-100" data-platform={platform.id}>
						<div class="card-body d-flex flex-column">
							<div class="platform-thumb-wrap mb-3">
								<img
									src={platform.thumbnail ?? platform.logo}
									alt={platform.logoAlt ?? platform.name}
									class="platform-thumb"
									width="56"
									height="56"
									loading="lazy"
									decoding="async"
								/>
							</div>
							<div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
								<div>
									<p class="platform-kicker">{platform.kicker}</p>
									<h3 id={`${villa.id}-${platform.name}`} class="h4 mb-0">{platform.name}</h3>
								</div>
								<span class="platform-badge">{platform.badge}</span>
							</div>
							<p class="text-secondary small mb-3">{platform.summary}</p>
							<div class="platform-links mt-auto d-flex flex-wrap gap-2">
								{#each platform.links as link}
									<PlatformButton label={link.label} href={link.href} variant={link.variant} />
								{/each}
							</div>
						</div>
					</article>
				</section>
			{/each}
		</div>
	</section>

	<section aria-labelledby="gallery-title" class="mt-5">
		<h2 id="gallery-title" class="h3 mb-3">Gallery</h2>
		<div class="row g-3">
			{#each villa.gallery as image}
				<figure class="col-6 col-md-4 mb-0">
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
	</section>
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

	.booking-option {
		border-radius: 1rem;
		overflow: hidden;
		background: linear-gradient(145deg, #ffffff 0%, #f8fbff 100%);
		min-height: 100%;
	}

	.booking-option[data-platform='trip'] {
		background: linear-gradient(145deg, #eefaf3 0%, #ffffff 100%);
		border: 1px solid rgb(28 126 87 / 22%);
	}

	.booking-option[data-platform='airbnb'] {
		border: 1px solid rgb(220 53 69 / 16%);
	}

	.booking-option[data-platform='booking'] {
		border: 1px solid rgb(13 110 253 / 16%);
	}

	.platform-kicker {
		margin: 0 0 0.25rem;
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #617785;
	}

	.platform-badge {
		display: inline-flex;
		align-items: center;
		padding: 0.3rem 0.65rem;
		border-radius: 999px;
		background: #eef3f6;
		color: #47606f;
		font-size: 0.78rem;
		font-weight: 700;
	}

	.booking-option[data-platform='trip'] .platform-badge {
		background: rgb(28 126 87 / 12%);
		color: #176344;
	}

	:global(#booking-section) {
		scroll-margin-top: 1.5rem;
	}

	.platform-links :global(.btn) {
		margin-right: 0;
		margin-bottom: 0;
	}

	.platform-thumb-wrap {
		display: flex;
		align-items: center;
	}

	.platform-thumb {
		object-fit: contain;
		padding: 0.2rem;
		border-radius: 0.85rem;
		box-shadow: 0 0.55rem 1rem rgb(18 37 48 / 16%);
		background: #fff;
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
