<script>
	import { enhance } from '$app/forms';
	import { getAuthContext } from '$lib/auth/context.js';
	import { getCopy, language } from '$lib/i18n.js';

	let { form } = $props();
	let auth = getAuthContext();
	let c = $derived(getCopy($language).auth);

	function destinationAfterLogin() {
		const requested = new URLSearchParams(location.search).get('returnTo');
		return requested?.startsWith('/') && !requested.startsWith('//') ? requested : '/villas';
	}

	$effect(() => {
		if (auth.ready && auth.user) location.replace(destinationAfterLogin());
	});
</script>

<svelte:head><title>{c.title}</title></svelte:head>

<main class="auth-page">
	<section>
		<p class="eyebrow">{c.eyebrow}</p>
		<h1>{c.heading}</h1>
		<p>{c.lead}</p>
	</section>
	<form method="POST" use:enhance>
		<label>{c.email}<input name="email" value={form?.email ?? ''} type="email" required autocomplete="email" /></label>
		<label>{c.password}<input name="password" type="password" required minlength="8" autocomplete="current-password" /></label>
		{#if form?.message}<p class="message" aria-live="polite">{form.message}</p>{/if}
		<div class="actions">
			<button formaction="?/login">{c.signIn}</button>
			<button formaction="?/signup" class="secondary">{c.createAccount}</button>
		</div>
		<button formaction="?/google" formnovalidate class="google-button" type="submit">{c.continueGoogle}</button>
	</form>
</main>

<style>
	.auth-page{display:grid;grid-template-columns:1fr 1fr;gap:8vw;max-width:72rem;margin:8vh auto;padding:4rem 2rem}.eyebrow{text-transform:uppercase;letter-spacing:.16em;font-size:.75rem}h1{font-family:Georgia,serif;font-size:clamp(3rem,7vw,6rem);line-height:.95;font-weight:500}form{display:grid;gap:1rem;padding:2rem;border-top:3px solid #172a22;background:#fff}label{display:grid;gap:.4rem;font-weight:650}input{padding:.8rem;border:1px solid #afa897;background:#faf8f2}.actions{display:flex;gap:.75rem;flex-wrap:wrap}button{padding:.8rem 1.25rem;background:#172a22;color:#fff;border:1px solid #172a22}.secondary,.google-button{background:#fff;color:#172a22}.google-button{width:100%;border-color:#afa897}.message{font-size:.9rem}@media(max-width:700px){.auth-page{grid-template-columns:1fr;padding-top:2rem}}
</style>
