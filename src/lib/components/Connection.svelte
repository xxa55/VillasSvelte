<script>
	let { from, to, note = '' } = $props();
</script>

<div class="connection d-flex align-items-center gap-2 small text-secondary">
	<span class="pill">{from}</span>
	<span aria-hidden="true">→</span>
	<span class="pill pill-dim">{to}</span>
	{#if note}
		<span class="ms-1">{note}</span>
	{/if}
</div>

<style>
	.connection {
		line-height: 1.2;
	}

	.pill {
		display: inline-block;
		padding: 0.24rem 0.6rem;
		border-radius: 999px;
		background: #123447;
		color: #fff;
		font-weight: 600;
	}

	.pill-dim {
		background: #5d7686;
	}
</style>
