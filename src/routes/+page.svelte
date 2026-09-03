<script>
	import { asset, resolve } from '$app/paths';
	import VerticalCarousel from '$lib/components/VerticalCarousel.svelte';
	import { getCatalog } from '$lib/data/catalog.js';
	import { getCopy, language } from '$lib/i18n.js';

	let c = $derived(getCopy($language).home);
	let catalog = $derived(getCatalog($language));

	/** @param {Parameters<typeof asset>[0]} path */
	const withBase = (path) => asset(path);

	/** @type {{ src: string; alt: string } | null} */
	let zoomedImage = $state(null);

	/** @param {{ src: string; alt: string }} image */
	const openZoom = (image) => {
		zoomedImage = image;
	};

	const closeZoom = () => {
		zoomedImage = null;
	};

	/** @param {KeyboardEvent} event */
	const onLightboxKeydown = (event) => {
		if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			closeZoom();
		}
	};

	const heroImages = [
		{
			src: withBase('/img/villa1/entrance.webp'),
			srcWebp: withBase('/img/villa1/entrance.webp'),
			srcSetWebp: `${withBase('/img/villa1/entrance-640.webp')} 640w, ${withBase('/img/villa1/entrance-1200.webp')} 1200w, ${withBase('/img/villa1/entrance.webp')} 1600w`,
			alt: 'Villa A entrance',
			width: 1600,
			height: 1200
		},
		{
			src: withBase('/img/villa1/balcony.webp'),
			srcWebp: withBase('/img/villa1/balcony.webp'),
			srcSetWebp: `${withBase('/img/villa1/balcony-640.webp')} 640w, ${withBase('/img/villa1/balcony-1200.webp')} 1200w, ${withBase('/img/villa1/balcony.webp')} 1600w`,
			alt: 'Villa A balcony',
			width: 1600,
			height: 1200
		},
		{
			src: withBase('/img/villa1/bbq.webp'),
			srcWebp: withBase('/img/villa1/bbq.webp'),
			srcSetWebp: `${withBase('/img/villa1/bbq-640.webp')} 640w, ${withBase('/img/villa1/bbq-1200.webp')} 1200w, ${withBase('/img/villa1/bbq.webp')} 1600w`,
			alt: 'Villa A barbecue area',
			width: 1600,
			height: 1200
		}
	];

	const amenityIcons = ['bi bi-water', 'bi bi-fire', 'bi bi-door-open'];
	let amenities = $derived(c.amenities.map(
		/** @param {{ title: string; description: string }} amenity @param {number} index */
		(amenity, index) => ({ ...amenity, icon: amenityIcons[index] })
	));

	const googleMapsLink =
		'https://www.google.com/maps/place/Downtown+Oasis+Pool+Villa+Pattaya+%E5%9F%8E%E5%B8%82%E7%BB%BF%E6%B4%B2+%E5%BA%A6%E5%81%87%E9%85%92%E5%BA%97/@12.9269092,100.8784369,17z/data=!3m1!4b1!4m6!3m5!1s0x310297727deb68f3:0xb7313830ab29e5a6!8m2!3d12.926904!4d100.8810118!16s%2Fg%2F11mczcqfnz?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D';
</script>

<svelte:head>
	<title>{c.title}</title>
	<meta name="description" content={c.description} />
	<link rel="canonical" href={`https://www.downtownoasis.net${resolve('/')}`} />
</svelte:head>

<header class="site-header">
	<nav class="navbar navbar-expand-md bg-white border-bottom">
		<div class="container py-3">
			<a class="navbar-brand d-flex align-items-center gap-2" href="#top">
				<img src={withBase('/img/logo.webp')} alt="Downtown Oasis logo" width="120" height="76" class="brand-logo" />
				<span>{c.brand}</span>
			</a>
			<ul class="nav ms-auto gap-2 small">
				<li class="nav-item"><a class="nav-link" href="#about">{c.about}</a></li>
				<li class="nav-item"><a class="nav-link" href="#location">{c.location}</a></li>
				<li class="nav-item"><a class="nav-link" href="#book">{c.book}</a></li>
			</ul>
		</div>
	</nav>

	<section class="container py-4 py-lg-5" id="top">
		<div class="row g-4 align-items-stretch">
			<div class="col-12 col-lg-7">
				<div class="hero-copy rounded-4 p-4 p-lg-5 h-100">
					<p class="hero-kicker">{c.brand}</p>
					<h1>{c.heroTitle}</h1>
					<p class="lead mb-4">{c.heroLead}</p>
					<div class="d-flex flex-wrap gap-3">
						<a class="btn btn-primary btn-lg" href="#book">{c.bookStay}</a>
						<a class="btn btn-outline-dark btn-lg" href={resolve('/villas')}>{c.seeVillas}</a>
					</div>
					<figure class="hero-video mt-4 mb-0">
						<video class="hero-video-player" controls preload="metadata" playsinline>
							<source src={withBase('/video/pattaya-villas-compressed.mp4')} type="video/mp4" />
							{c.videoFallback}
						</video>
					</figure>
				</div>
			</div>
			<div class="col-12 col-lg-5">
				<div class="hero-grid">
					{#each heroImages as image, index}
						<figure class:hero-grid-wide={index === 0} class="hero-figure">
							<picture>
								<source srcset={image.srcSetWebp} sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 42vw" type="image/webp" />
								<img
									src={image.src}
									alt={image.alt}
									width={image.width}
									height={image.height}
									loading={index === 0 ? 'eager' : 'lazy'}
									decoding="async"
									fetchpriority={index === 0 ? 'high' : 'auto'}
								/>
							</picture>
						</figure>
					{/each}
				</div>
			</div>
		</div>
	</section>
</header>

<main>
	<section class="container py-4 py-lg-5" aria-labelledby="about-heading" id="about">
		<div class="section-heading text-center mx-auto mb-4">
			<h2 id="about-heading">{c.welcome}</h2>
			<p>{c.welcomeLead}</p>
		</div>

		<div class="row g-4">
			{#each amenities as amenity}
				<article class="col-12 col-md-4">
					<div class="amenity-card h-100 rounded-4 p-4">
						<i class={`amenity-icon ${amenity.icon}`} aria-hidden="true"></i>
						<h3>{amenity.title}</h3>
						<p>{amenity.description}</p>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="container py-4 py-lg-5" aria-labelledby="location-heading" id="location">
		<div class="row align-items-center g-4">
			<div class="col-12 col-lg-6">
				<div class="location-copy">
					<h2 id="location-heading">{c.where}</h2>
					<p>{c.whereLead}</p>
					<div class="location-address-card mb-3" aria-label={c.propertyAddress}>
						<p class="location-label mb-1">{c.addressLabel}</p>
						<p class="location-address mb-0">{c.address}</p>
					</div>
					<ul class="location-list">
						{#each c.locationPoints as point}
							<li>{point}</li>
						{/each}
					</ul>
					<a class="btn btn-primary btn-sm mt-2 maps-cta" href={googleMapsLink} target="_blank" rel="noreferrer">
						{c.openMaps}
					</a>
				</div>
			</div>
			<div class="col-12 col-lg-6">
				<figure class="map-card mb-0">
					<button
						type="button"
						class="zoom-trigger"
						ondblclick={() =>
							openZoom({
								src: withBase('/img/pattaya-map.webp'),
								alt: c.mapAlt
							})}
						aria-label={c.mapZoom}
					>
						<img
							src={withBase('/img/pattaya-map.webp')}
							alt={c.mapAlt}
							width="1600"
							height="1200"
							loading="lazy"
							decoding="async"
						/>
					</button>
					<figcaption>{c.mapCaption}</figcaption>
				</figure>
			</div>
		</div>
	</section>

	<section class="container py-4 py-lg-5" aria-labelledby="book-heading" id="book">
		<div class="section-heading text-center mx-auto mb-4">
			<h2 id="book-heading">{c.bookHeading}</h2>
			<p>{c.bookLead}</p>
		</div>

		<div class="row g-4 align-items-stretch">
			<article class="col-12">
				<VerticalCarousel
					title={c.villas}
					items={catalog.villas}
					accent="villa"
					actionLabel={c.choose}
					previousLabel={c.previous ?? ($language === 'zh-CN' ? '上一个' : 'Previous')}
					nextLabel={c.next ?? ($language === 'zh-CN' ? '下一个' : 'Next')}
				/>
			</article>
		</div>
	</section>
</main>

<footer class="site-footer py-5" aria-labelledby="contact-heading">
	<div class="container">
		<div class="row g-4 align-items-center text-center text-lg-start">
			<div class="col-12 col-lg-4">
				<img src={withBase('/img/logo.webp')} alt="Downtown Oasis logo" width="210" height="136" class="footer-logo" />
			</div>
			<section class="col-12 col-lg-4" aria-labelledby="contact-heading">
				<h2 id="contact-heading" class="h5">{c.contact}</h2>
				<address class="mb-0">
					<p><a href="tel:+66638855168">+66 63 885 5168</a></p>
					<p><a href="mailto:oasis55168@gmail.com">oasis55168@gmail.com</a></p>
					<p class="mb-0">{c.place}</p>
				</address>
			</section>
			<section class="col-12 col-lg-4" aria-labelledby="connect-heading">
				<h2 id="connect-heading" class="h5">{c.connect}</h2>
				<div class="d-flex justify-content-center justify-content-lg-start gap-3 flex-wrap">
					<figure class="qr-figure mb-0">
						<button
							type="button"
							class="zoom-trigger qr-trigger"
							ondblclick={() => openZoom({ src: withBase('/img/qr_line.webp'), alt: 'LINE QR code' })}
							aria-label={`${c.zoomQr}：LINE`}
						>
							<img
								src={withBase('/img/qr_line.webp')}
								alt="LINE QR code"
								width="280"
								height="280"
								loading="lazy"
								decoding="async"
							/>
						</button>
						<figcaption>LINE</figcaption>
					</figure>
					<figure class="qr-figure mb-0">
						<button
							type="button"
							class="zoom-trigger qr-trigger"
							ondblclick={() => openZoom({ src: withBase('/img/qr_wechat.webp'), alt: 'WeChat QR code' })}
							aria-label={`${c.zoomQr}：WeChat`}
						>
							<img
								src={withBase('/img/qr_wechat.webp')}
								alt="WeChat QR code"
								width="280"
								height="280"
								loading="lazy"
								decoding="async"
							/>
						</button>
						<figcaption>WeChat</figcaption>
					</figure>
				</div>
				<nav class="platform-links mt-3" aria-label={c.platforms}>
					{#each catalog.platforms as platform}
						<a class="platform-mini-card" href={`${resolve('/platforms')}#platform-${platform.id}`}>
							<img src={platform.logo} alt="" width="28" height="28" loading="lazy" />
							<span>{platform.name}</span>
							<i class="bi bi-chevron-right" aria-hidden="true"></i>
						</a>
					{/each}
				</nav>
			</section>
		</div>
	</div>
</footer>

{#if zoomedImage}
	<div
		class="lightbox"
		role="dialog"
		aria-modal="true"
		aria-label={zoomedImage.alt}
		tabindex="0"
		onclick={closeZoom}
		onkeydown={onLightboxKeydown}
	>
		<button type="button" class="lightbox-close" onclick={closeZoom} aria-label={c.closePreview}>
			×
		</button>
		<img class="lightbox-image" src={zoomedImage.src} alt={zoomedImage.alt} />
	</div>
{/if}

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	.site-header {
		background: linear-gradient(180deg, rgb(255 255 255 / 78%) 0%, transparent 100%);
	}

	.navbar-brand {
		font-weight: 700;
		font-size: 1.2rem;
		color: #16303e;
	}

	.brand-logo {
		display: block;
		height: 48px;
		width: auto;
		max-width: 120px;
		border-radius: 0.55rem;
		object-fit: contain;
		background: #ffffff;
		padding: 0.1rem;
	}

	.hero-copy {
		background:
			radial-gradient(circle at 15% 18%, rgb(222 239 251 / 70%), transparent 28%),
			linear-gradient(145deg, rgb(255 255 255 / 95%), rgb(248 244 239 / 95%));
		border: 1px solid rgb(19 48 63 / 10%);
		box-shadow: 0 1.25rem 2.5rem rgb(18 37 48 / 10%);
	}

	.hero-kicker {
		margin: 0 0 0.5rem;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #617785;
	}

	.hero-video {
		border-radius: 1rem;
		overflow: hidden;
		border: 1px solid rgb(19 48 63 / 12%);
		box-shadow: 0 1rem 2rem rgb(18 37 48 / 10%);
		background: rgb(255 255 255 / 70%);
	}

	.hero-video-player {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 9;
		background: #000;
	}

	h1 {
		margin: 0 0 1rem;
		font-size: clamp(2.2rem, 5vw, 4rem);
		line-height: 1.05;
		color: #15303f;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.9rem;
		height: 100%;
	}

	.hero-figure {
		margin: 0;
		min-height: 12rem;
		border-radius: 1.1rem;
		overflow: hidden;
		box-shadow: 0 1rem 2rem rgb(18 37 48 / 10%);
	}

	.hero-grid-wide {
		grid-column: 1 / -1;
	}

	.hero-figure img,
	.map-card img,
	.qr-figure img {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
	}

	.section-heading {
		max-width: 40rem;
	}

	.section-heading h2,
	.location-copy h2 {
		margin-bottom: 0.65rem;
		color: #15303f;
	}

	.section-heading p,
	.location-copy p,
	.amenity-card p,
	.map-card figcaption,
	.qr-figure figcaption {
		color: #627785;
	}

	.amenity-card,
	.map-card {
		background: rgb(255 255 255 / 80%);
		border: 1px solid rgb(19 48 63 / 10%);
		box-shadow: 0 1rem 2rem rgb(18 37 48 / 8%);
	}

	.amenity-icon {
		display: inline-block;
		font-size: 2rem;
		line-height: 1;
		margin-bottom: 0.7rem;
		color: #1f5d7f;
	}

	.map-card {
		margin: 0;
		border-radius: 1.1rem;
		overflow: hidden;
	}

	.zoom-trigger {
		display: block;
		width: 100%;
		padding: 0;
		border: 0;
		background: transparent;
		cursor: zoom-in;
	}

	.zoom-trigger:focus-visible {
		outline: 2px solid #1f5d7f;
		outline-offset: 4px;
	}

	.map-card img {
		aspect-ratio: 4 / 3;
	}

	.map-card figcaption {
		padding: 0.85rem 1rem 1rem;
		font-size: 0.95rem;
	}

	.location-address-card {
		padding: 0.8rem 0.9rem;
		border-radius: 0.8rem;
		background: rgb(255 255 255 / 92%);
		border: 1px solid rgb(31 93 127 / 22%);
		box-shadow: 0 0.6rem 1.2rem rgb(31 93 127 / 10%);
	}

	.location-label {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #43677d;
	}

	.location-address {
		color: #17384a;
		font-weight: 600;
		line-height: 1.45;
	}

	.maps-cta {
		font-weight: 700;
		letter-spacing: 0.01em;
		box-shadow: 0 0.6rem 1.2rem rgb(31 93 127 / 20%);
	}

	.maps-cta:hover {
		transform: translateY(-1px);
	}

	.location-list {
		padding-left: 1.15rem;
		color: #334f5f;
	}

	.site-footer {
		background: rgb(255 255 255 / 65%);
		border-top: 1px solid rgb(19 48 63 / 10%);
	}

	.footer-logo {
		max-width: 13rem;
		height: auto;
		border-radius: 0.75rem;
		background: #ffffff;
		padding: 0.25rem;
	}

	.qr-figure img {
		width: 8rem;
		height: 8rem;
		border-radius: 0.8rem;
		box-shadow: 0 0.75rem 1.5rem rgb(18 37 48 / 10%);
	}

	.qr-trigger {
		border-radius: 0.8rem;
	}

	.qr-figure figcaption {
		margin-top: 0.5rem;
		font-size: 0.9rem;
		text-align: center;
	}

	.platform-links {
		display: grid;
		gap: 0.45rem;
		max-width: 18rem;
		margin-inline: auto;
	}

	.platform-mini-card {
		display: grid;
		grid-template-columns: 1.75rem 1fr auto;
		align-items: center;
		gap: 0.6rem;
		padding: 0.48rem 0.6rem;
		border: 1px solid rgb(19 48 63 / 10%);
		border-radius: 0.65rem;
		background: rgb(255 255 255 / 48%);
		color: #526b79;
		font-size: 0.84rem;
		font-weight: 600;
		text-decoration: none;
		transition: border-color 150ms ease, background-color 150ms ease, transform 150ms ease;
	}

	.platform-mini-card img {
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 0.4rem;
		object-fit: contain;
		background: #fff;
	}

	.platform-mini-card i {
		font-size: 0.7rem;
		opacity: 0.55;
	}

	.platform-mini-card:hover,
	.platform-mini-card:focus-visible {
		color: #1f5d7f;
		border-color: rgb(31 93 127 / 28%);
		background: rgb(255 255 255 / 82%);
		transform: translateY(-1px);
	}

	@media (min-width: 992px) {
		.platform-links {
			margin-inline: 0;
		}
	}

	address p {
		margin-bottom: 0.5rem;
	}

	.lightbox {
		position: fixed;
		inset: 0;
		display: grid;
		place-items: center;
		padding: 1.5rem;
		background: rgb(10 20 28 / 78%);
		backdrop-filter: blur(6px);
		z-index: 1050;
	}

	.lightbox-image {
		max-width: min(92vw, 1100px);
		max-height: 88vh;
		border-radius: 1rem;
		box-shadow: 0 1.5rem 3rem rgb(0 0 0 / 32%);
		background: #fff;
	}

	.lightbox-close {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 2.75rem;
		height: 2.75rem;
		border: 0;
		border-radius: 999px;
		background: rgb(255 255 255 / 92%);
		color: #16303e;
		font-size: 1.8rem;
		line-height: 1;
	}

	@media (max-width: 991px) {
		.hero-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 575px) {
		.hero-grid {
			grid-template-columns: 1fr;
		}

		.hero-grid-wide {
			grid-column: auto;
		}
	}
</style>
