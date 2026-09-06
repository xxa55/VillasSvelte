import test from 'node:test';
import assert from 'node:assert/strict';
import { safeReturnTo } from '../src/lib/navigation.js';

test('keeps a local return path including its anchor', () => {
	const url = new URL('https://downtownoasis.net/login?returnTo=%2Fvillas%2Fvilla-a%23booking-section');
	assert.equal(safeReturnTo(url), '/villas/villa-a#booking-section');
});

test('rejects external and protocol-relative return targets', () => {
	assert.equal(safeReturnTo(new URL('https://downtownoasis.net/login?returnTo=https://evil.example')), '/villas');
	assert.equal(safeReturnTo(new URL('https://downtownoasis.net/login?returnTo=//evil.example')), '/villas');
});
