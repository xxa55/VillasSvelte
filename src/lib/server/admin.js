const ADMIN_EMAIL = 'oasis55168@gmail.com';

/** @param {{ email?: string | null } | null} user */
export function isAdministrator(user) {
	return user?.email?.toLowerCase() === ADMIN_EMAIL;
}