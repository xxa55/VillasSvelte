<script>
	import { base } from '$app/paths';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/webp" sizes="32x32" href={`${base}/img/favicon-32.webp`} />
	<link rel="apple-touch-icon" sizes="180x180" href={`${base}/img/apple-touch-icon.webp`} />
</svelte:head>

{@render children()}
