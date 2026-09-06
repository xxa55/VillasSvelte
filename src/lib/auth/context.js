import { getContext, setContext } from 'svelte';

const AUTH_CONTEXT = Symbol('downtown-oasis-auth');

/**
 * @typedef {object} AuthState
 * @property {import('@supabase/supabase-js').User | null} user
 * @property {import('@supabase/supabase-js').Session | null} session
 * @property {boolean} ready
 * @property {string} error
 */

/** @param {AuthState} auth */
export function setAuthContext(auth) {
	setContext(AUTH_CONTEXT, auth);
	return auth;
}

/** @returns {AuthState} */
export function getAuthContext() {
	const auth = getContext(AUTH_CONTEXT);
	if (!auth) throw new Error('Authentication context is unavailable outside the root layout.');
	return auth;
}
