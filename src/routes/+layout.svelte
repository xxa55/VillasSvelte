<script>
	import { asset, resolve } from '$app/paths';
	import { onMount, untrack } from 'svelte';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import '../app.css';
	import { setAuthContext } from '$lib/auth/context.js';
	import LanguageSelector from '$lib/components/LanguageSelector.svelte';
	import { getCopy, language } from '$lib/i18n.js';
	import { supabase } from '$lib/supabaseClient.js';

	let { data, children } = $props();
	let auth = $state({
		/** @type {import('@supabase/supabase-js').User | null} */ user: untrack(() => data.user),
		/** @type {import('@supabase/supabase-js').Session | null} */ session: null,
		ready: true,
		error: ''
	});
	let c = $derived(getCopy($language).account);
	setAuthContext(auth);

	onMount(() => {
		let active = true;
		const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
			if (!active) return;
			auth.session = session;
			auth.user = session?.user ?? null;
			auth.ready = true;
			auth.error = '';
		});

		Promise.all([supabase.auth.getSession(), supabase.auth.getUser()]).then(([sessionResult, userResult]) => {
			if (!active) return;
			auth.session = sessionResult.data.session;
			auth.user = userResult.data.user;
			auth.error = userResult.error?.message ?? sessionResult.error?.message ?? '';
			auth.ready = true;
		});

		return () => {
			active = false;
			listener.subscription.unsubscribe();
		};
	});

</script>

<svelte:head>
	<link rel="icon" type="image/webp" sizes="32x32" href={asset('/img/favicon-32.webp')} />
	<link rel="apple-touch-icon" sizes="180x180" href={asset('/img/apple-touch-icon.webp')} />
</svelte:head>

<div class="language-bar">
	<div class="container d-flex justify-content-end align-items-center gap-3 py-2">
		{#if auth.user}
			<span class="account-email">{auth.user.email}</span>
			<form method="POST" action={resolve('/logout')}>
				<button class="account-link account-button" type="submit">{c.signOut}</button>
			</form>
		{:else if auth.ready}
			<a class="account-link" href={resolve('/login')}>{c.signIn}</a>
		{/if}
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

	.account-link {
		color: #264f3d;
		font-size: 0.875rem;
		font-weight: 700;
		text-decoration: none;
	}

	.account-link:hover {
		text-decoration: underline;
	}

	.account-button {
		padding: 0;
		border: 0;
		background: transparent;
	}

	.account-email {
		max-width: 16rem;
		overflow: hidden;
		color: #5f665f;
		font-size: 0.8rem;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
