<script>
	import { onMount } from 'svelte';
	import { language, supportedLanguages, getCopy } from '$lib/i18n.js';

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		const requested = params.get('lang');
		const saved = window.localStorage.getItem('villa-language');
		const initial = requested && supportedLanguages.some((item) => item.code === requested)
			? requested
			: saved && supportedLanguages.some((item) => item.code === saved)
				? saved
				: 'en';
		language.set(initial);
		document.documentElement.lang = initial;
	});

	/** @param {Event & { currentTarget: HTMLSelectElement }} event */
	const changeLanguage = (event) => {
		const locale = event.currentTarget.value;
		language.set(locale);
		window.localStorage.setItem('villa-language', locale);
		document.documentElement.lang = locale;
		const url = new URL(window.location.href);
		if (locale === 'en') url.searchParams.delete('lang');
		else url.searchParams.set('lang', locale);
		window.history.replaceState({}, '', url);
	};
</script>

<label class="language-control">
	<i class="bi bi-globe2" aria-hidden="true"></i>
	<span class="visually-hidden">{getCopy($language).language.label}</span>
	<select aria-label={getCopy($language).language.label} value={$language} onchange={changeLanguage}>
		{#each supportedLanguages as option}
			<option value={option.code}>{option.label}</option>
		{/each}
	</select>
</label>

<style>
	.language-control {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.4rem 0.65rem;
		border: 1px solid rgb(19 48 63 / 20%);
		border-radius: 0.55rem;
		background: #fff;
		color: #16303e;
		font-weight: 600;
	}

	.language-control select {
		border: 0;
		background: transparent;
		color: inherit;
		font: inherit;
		cursor: pointer;
		outline: 0;
	}
</style>
