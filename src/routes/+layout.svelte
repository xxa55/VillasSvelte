<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
</svelte:head>

{@render children()}
