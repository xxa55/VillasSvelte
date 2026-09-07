<script>
	import { asset } from '$app/paths';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import '../app.css';
	import LanguageSelector from '$lib/components/LanguageSelector.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/webp" sizes="32x32" href={asset('/img/favicon-32.webp')} />
	<link rel="apple-touch-icon" sizes="180x180" href={asset('/img/apple-touch-icon.webp')} />
</svelte:head>

<div class="language-bar">
	<div class="container d-flex justify-content-end py-2">
		<LanguageSelector />
	</div>
</div>

{@render children()}

<style>
	.language-bar {
		position: relative;
		z-index: 1040;
		background: #fff;
		border-bottom: 1px solid rgb(19 48 63 / 10%);
	}
</style>
