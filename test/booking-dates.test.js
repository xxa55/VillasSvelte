import test from 'node:test';
import assert from 'node:assert/strict';
import { selectStayDate, stayConflicts } from '../src/lib/booking/dates.js';

const unavailable = [{ check_in: '2026-09-10', check_out: '2026-09-12' }];

test('detects an overlapping stay but permits adjacent stays', () => {
	assert.equal(stayConflicts(unavailable, '2026-09-09', '2026-09-11'), true);
	assert.equal(stayConflicts(unavailable, '2026-09-08', '2026-09-10'), false);
	assert.equal(stayConflicts(unavailable, '2026-09-12', '2026-09-14'), false);
});

test('first click selects check-in and asks for check-out', () => {
	assert.deepEqual(selectStayDate(unavailable, '', '', '2026-09-08'), {
		checkIn: '2026-09-08',
		checkOut: '',
		message: 'Now choose your check-out date.'
	});
});

test('second click selects a valid check-out', () => {
	assert.deepEqual(selectStayDate(unavailable, '2026-09-12', '', '2026-09-14'), {
		checkIn: '2026-09-12',
		checkOut: '2026-09-14',
		message: ''
	});
});

test('does not select a stay crossing booked nights', () => {
	const result = selectStayDate(unavailable, '2026-09-09', '', '2026-09-13');
	assert.equal(result.checkOut, '');
	assert.match(result.message, /booked dates/i);
});
