export function validateLogin(input) {
	const errors = {};

	if (!input.username) {
		errors.username = '*';
	}

	if (!input.password) {
		errors.password = '*';
	}

	return errors;
}
