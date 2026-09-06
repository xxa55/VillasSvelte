/** @typedef {{check_in: string, check_out: string}} UnavailableRange */

/**
 * @param {UnavailableRange[]} unavailable
 * @param {string} checkIn
 * @param {string} checkOut
 */
export function stayConflicts(unavailable, checkIn, checkOut) {
	return unavailable.some((booking) => checkIn < booking.check_out && checkOut > booking.check_in);
}

/**
 * Applies a calendar click to the current selection.
 * @param {UnavailableRange[]} unavailable
 * @param {string} checkIn
 * @param {string} checkOut
 * @param {string} date
 */
export function selectStayDate(unavailable, checkIn, checkOut, date) {
	if (!checkIn || checkOut || date <= checkIn) {
		return { checkIn: date, checkOut: '', message: 'Now choose your check-out date.' };
	}
	if (stayConflicts(unavailable, checkIn, date)) {
		return {
			checkIn,
			checkOut: '',
			message: 'That stay includes booked dates. Please choose an earlier check-out date.'
		};
	}
	return { checkIn, checkOut: date, message: '' };
}
