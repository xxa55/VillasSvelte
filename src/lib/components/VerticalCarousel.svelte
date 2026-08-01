<script>
	let { title, items, accent = 'villa', actionLabel = 'Open', targetHref = '' } = $props();

	let index = $state(0);

	/** @param {number} delta */
	const step = (delta) => {
		index = (index + delta + items.length) % items.length;
	};

	const visibleItems = () =>
		Array.from({ length: Math.min(3, items.length) }, (_, offset) => ({
			...items[(index + offset) % items.length],
			stackOffset: offset
		}));
</script>

<section class="chooser card border-0 shadow-sm h-100">
	<div class="chooser-top d-flex align-items-center justify-content-between">
		<h2 class="h5 mb-0">{title}</h2>
		<div class="d-flex gap-2">
			<button class="btn btn-sm btn-light border" type="button" aria-label={`Previous ${title}`} onclick={() => step(-1)}>
				↑
			</button>
			<button class="btn btn-sm btn-light border" type="button" aria-label={`Next ${title}`} onclick={() => step(1)}>
				↓
			</button>
		</div>
	</div>

	<div class="stack">
		{#each visibleItems() as item (item.id)}
			<a
				class:active={item.stackOffset === 0}
				class:accent-villa={accent === 'villa'}
				class:accent-platform={accent === 'platform'}
				class="choice-card text-decoration-none"
				href={targetHref || item.href}
				style={`--stack-offset:${item.stackOffset}`}
			>
				{#if item.cover}
					<img
						src={item.cover}
						alt={item.name}
						width={item.width ?? 1600}
						height={item.height ?? 1200}
						loading={item.stackOffset === 0 ? 'eager' : 'lazy'}
						decoding="async"
						fetchpriority={item.stackOffset === 0 ? 'high' : 'auto'}
					/>
				{:else if item.logo}
					<img
						src={item.logo}
						alt={item.logoAlt ?? item.name}
						class="logo-mark"
						width="240"
						height="240"
						loading={item.stackOffset === 0 ? 'eager' : 'lazy'}
						decoding="async"
						fetchpriority={item.stackOffset === 0 ? 'high' : 'auto'}
					/>
				{:else}
					<div class="brand-mark">{item.name.slice(0, 1)}</div>
				{/if}
				<div class="choice-body">
					<p class="choice-badge">{item.badge ?? item.region ?? ''}</p>
					<h3>{item.name}</h3>
					<p>{item.summary ?? item.tagline}</p>
					<span class="choice-link">{actionLabel}</span>
				</div>
			</a>
		{/each}
	</div>
</section>

<style>
	.chooser {
		padding: 1rem;
		background: rgb(255 255 255 / 82%);
		backdrop-filter: blur(6px);
	}

	.chooser-top {
		padding-bottom: 0.85rem;
	}

	.stack {
		position: relative;
		min-height: 29rem;
	}

	.choice-card {
		position: absolute;
		inset: 0 0 auto;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 0.85rem;
		padding: 0.8rem;
		border-radius: 1.15rem;
		border: 1px solid rgb(20 46 61 / 14%);
		background: #fff;
		color: #16303e;
		transform: translateY(calc(var(--stack-offset) * 5.35rem)) scale(calc(1 - (var(--stack-offset) * 0.04)));
		opacity: calc(1 - (var(--stack-offset) * 0.22));
		box-shadow: 0 1rem 2rem rgb(18 37 48 / 10%);
		z-index: calc(10 - var(--stack-offset));
		transition: transform 180ms ease, opacity 180ms ease;
	}

	.choice-card:not(.active) {
		pointer-events: none;
	}

	.choice-card img,
	.brand-mark {
		width: 100%;
		height: 15.5rem;
		border-radius: 0.9rem;
		object-fit: cover;
	}

	.choice-card.accent-platform img,
	.choice-card.accent-platform .brand-mark {
		height: 8.25rem;
		object-fit: contain;
		padding: 0.65rem;
		background: linear-gradient(150deg, #f4f9fc 0%, #eaf3f8 100%);
	}

	.choice-card img.logo-mark {
		object-fit: contain;
		padding: 1.25rem;
		background: linear-gradient(150deg, #f4f9fc 0%, #eaf3f8 100%);
	}

	.brand-mark {
		display: grid;
		place-items: center;
		font-size: 4rem;
		font-weight: 700;
		font-family: Georgia, serif;
		background: linear-gradient(145deg, #eff6fb 0%, #d7e7f3 100%);
	}

	.choice-body {
		display: grid;
		gap: 0.25rem;
	}

	.choice-badge {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #5c7180;
	}

	.choice-body h3 {
		margin: 0;
		font-size: 1.4rem;
		line-height: 1.15;
	}

	.choice-body p {
		margin: 0;
		color: #5c7180;
	}

	.choice-link {
		margin-top: 0.3rem;
		font-weight: 700;
	}

	.accent-villa.active {
		outline: 2px solid rgb(31 93 127 / 18%);
	}

	.accent-platform.active {
		outline: 2px solid rgb(28 126 87 / 18%);
	}

	@media (max-width: 991px) {
		.stack {
			min-height: 26rem;
		}

		.choice-card img,
		.brand-mark {
			height: 12.5rem;
		}

		.choice-card.accent-platform img,
		.choice-card.accent-platform .brand-mark {
			height: 6.75rem;
		}
	}
</style>
