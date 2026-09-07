<svelte:head>
	<title>Search results | Downtown Oasis</title>
	<meta name="description" content="Live Downtown Oasis availability and prices." />
	<script src="https://hostex.io/app/assets/js/hostex-widget.js?version=20260902163817" type="module"></script>
</svelte:head>

<main class="search-results-page">
	<a href="/villas" class="back-link">Back to villas</a>
	<h1>Availability and prices</h1>
	<p>Choose your dates and villa to see the current Hostex availability and price.</p>
	<hostex-search-result-widget
		id="eyJob3N0X2lkIjoiMTA1MTY1Iiwid2lkZ2V0X2hvc3QiOiJodHRwczovL3cuaG9zdGV4Ym9va2luZy5zaXRlIn0="
	></hostex-search-result-widget>
</main>

<style>
	.search-results-page { max-width: 76rem; margin: 0 auto; padding: clamp(2rem, 6vw, 5rem) 1rem 5rem; color: #172a22; }
	.back-link { display: inline-block; margin-bottom: 2rem; color: #172a22; font-weight: 700; text-underline-offset: .2em; }
	h1 { margin: 0 0 1rem; font-family: Georgia, serif; font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 500; line-height: 1; }
	p { margin: 0 0 2rem; font-size: 1.05rem; line-height: 1.6; }
</style>
