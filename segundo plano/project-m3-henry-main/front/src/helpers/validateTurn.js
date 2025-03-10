export const validateTurn = (input) => {
	const regexDate = /^((19|20)\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

	const errors = {};

	if (!input.date) {
		errors.date = '*';
	} else if (!regexDate.test(input.date)) {
		errors.date = 'Fecha incorrecta';
	}

	if (!input.time) {
		errors.time = '*';
	}

	return errors;
};
