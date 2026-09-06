/** @param {URL} url */
export function safeReturnTo(url) {
	const requested = url.searchParams.get('returnTo');
	return requested?.startsWith('/') && !requested.startsWith('//') ? requested : '/villas';
}
