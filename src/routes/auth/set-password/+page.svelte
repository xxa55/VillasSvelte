<script>
	import { onMount } from 'svelte';
	import { getAuthContext } from '$lib/auth/context.js';
	import { supabase } from '$lib/supabaseClient.js';

	let auth = getAuthContext();
	let password = $state('');
	let confirmation = $state('');
	let message = $state('');
	let saving = $state(false);

	onMount(async () => {
		const hash = new URLSearchParams(location.hash.slice(1));
		const accessToken = hash.get('access_token');
		const refreshToken = hash.get('refresh_token');
		if (!accessToken || !refreshToken) return;
		const { data, error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
		if (error) { message = 'Your password-reset link is invalid or has expired. Request a new one.'; return; }
		auth.session = data.session;
		auth.user = data.user;
		auth.ready = true;
		history.replaceState({}, '', location.pathname);
	});

	async function setPassword() {
		message = '';
		if (!auth.user) { message = 'Open this page from the password-reset email, then try again.'; return; }
		if (password.length < 8) { message = 'Use a password with at least 8 characters.'; return; }
		if (password !== confirmation) { message = 'The passwords do not match.'; return; }
		saving = true;
		const { error } = await supabase.auth.updateUser({ password });
		if (error) {
			message = error.message;
			saving = false;
			return;
		}
		location.replace('/admin/availability');
	}
</script>

<svelte:head><title>Set password | Downtown Oasis</title></svelte:head>

<main class="password-page">
	<section>
		<p class="eyebrow">Administrator account</p>
		<h1>Set your password</h1>
		<p>Choose a password for your Downtown Oasis administrator account.</p>
	</section>
	<form onsubmit={(event) => { event.preventDefault(); setPassword(); }}>
		<label>New password<input bind:value={password} type="password" minlength="8" autocomplete="new-password" required /></label>
		<label>Confirm password<input bind:value={confirmation} type="password" minlength="8" autocomplete="new-password" required /></label>
		<button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Set password'}</button>
		{#if message}<p class="message" role="alert">{message}</p>{/if}
	</form>
</main>

<style>
	.password-page{display:grid;grid-template-columns:1fr 1fr;gap:8vw;max-width:72rem;margin:8vh auto;padding:4rem 2rem;color:#172a22}.eyebrow{text-transform:uppercase;letter-spacing:.16em;font-size:.75rem;color:#b86138;font-weight:700}h1{font-family:Georgia,serif;font-size:clamp(3rem,7vw,6rem);line-height:.95;font-weight:500}form{display:grid;gap:1rem;padding:2rem;border-top:3px solid #172a22;background:#fff}label{display:grid;gap:.4rem;font-weight:650}input{padding:.8rem;border:1px solid #afa897;background:#faf8f2}button{justify-self:start;padding:.8rem 1.25rem;background:#172a22;color:#fff;border:1px solid #172a22;font-weight:700}.message{font-size:.9rem;color:#a52a2a}@media(max-width:700px){.password-page{grid-template-columns:1fr;padding-top:2rem}}
</style>