<script>
	import PlatformButton from './PlatformButton.svelte';

	let { platform } = $props();
</script>

<article class="card h-100 shadow-sm border-0 platform-card">
	<div class="card-body">
		<div class="platform-head mb-3">
			<img
				src={platform.logo}
				alt={platform.logoAlt ?? platform.name}
				width="40"
				height="40"
				class="platform-logo"
				loading="lazy"
				decoding="async"
			/>
			<div class="platform-title-wrap">
				<h3 class="h5 mb-0">{platform.name}</h3>
				<p class="platform-subtitle mb-0">{platform.region}</p>
			</div>
			<span class="platform-chip" style={`--brand:${platform.brandColor};`}>{platform.badge}</span>
		</div>
		<p class="text-secondary small mb-3">{platform.summary}</p>
		<div class="mb-2">
			{#each platform.links as link}
				<PlatformButton label={link.label} href={link.href} variant={link.variant} />
			{/each}
		</div>
	</div>
</article>

<style>
	.platform-card {
		border-radius: 1rem;
		background: linear-gradient(145deg, #ffffff 0%, #f8fbff 100%);
		border: 1px solid rgb(19 48 63 / 12%);
	}

	.platform-head {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0.55rem;
	}

	.platform-logo {
		width: 2.5rem;
		height: 2.5rem;
		object-fit: contain;
		padding: 0.2rem;
		border-radius: 0.75rem;
		box-shadow: 0 0.5rem 1rem rgb(18 37 48 / 16%);
		background: #fff;
	}

	.platform-subtitle {
		font-size: 0.8rem;
		color: #5c7180;
	}

	.platform-chip {
		display: inline-flex;
		align-items: center;
		padding: 0.25rem 0.6rem;
		border-radius: 999px;
		background: color-mix(in srgb, var(--brand) 16%, white);
		color: color-mix(in srgb, var(--brand) 80%, black);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		white-space: nowrap;
	}
</style>
