export function validate(input) {
	const regexCompleteName = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
	const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const regexBirthDate = /^((19|20)\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
	const regexDNI = /^\d{6,8}$/;
	const regexUsername = /^[a-zA-Z0-9_]{5,16}$/;
	const regexPassword = /^(?=.*[A-Z])(?=.*[a-z0-9])[A-Za-z0-9]{8,}$/;

	const errors = {};

	if (!input.name) {
		errors.name = '*';
	} else if (!regexCompleteName.test(input.name)) {
		errors.name = 'El formato del nombre es incorrecto';
	}

	if (!input.email) {
		errors.email = '*';
	} else if (!regexEmail.test(input.email)) {
		errors.email = 'Correo no válido';
	}

	if (!input.birthDate) {
		errors.birthDate = '*';
	} else if (!regexBirthDate.test(input.birthDate)) {
		errors.birthDate = 'Fecha no válida';
	} else {
		const currentDate = new Date();
		const birthDate = new Date(input.birthDate);
		const age = currentDate.getFullYear() - birthDate.getFullYear();
		if (age < 18) {
			errors.birthDate = 'Debe ser mayor de 18 años';
		}
	}

	if (!input.nDni) {
		errors.nDni = '*';
	} else if (!regexDNI.test(input.nDni)) {
		errors.nDni = 'DNI no válido';
	}

	if (!input.username) {
		errors.username = '*';
	} else if (!regexUsername.test(input.username)) {
		errors.username = 'El formato del username es incorrecto';
	}

	if (!input.password) {
		errors.password = '*';
	} else if (!regexPassword.test(input.password)) {
		errors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número';
	}

	return errors;
}
