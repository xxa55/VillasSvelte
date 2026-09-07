<script>
	let { label, href = '#', variant = 'primary' } = $props();
</script>

<a class={`btn btn-${variant} btn-sm me-2 mb-2`} href={href} target="_blank" rel="noreferrer">
	{label}
</a>
