import { CREDENTIAL_MODEL, USER_MODEL } from '../config/data-source';
import { Credential } from '../entities/Credentials';

async function createCredentials(username: string, password: string): Promise<Credential> {
	const creUserName = await CREDENTIAL_MODEL.findOneBy({ username });

	if (creUserName) {
		throw new Error('El usuario ya existe');
	}

	const newCredential = CREDENTIAL_MODEL.create({ username, password });

	await CREDENTIAL_MODEL.save(newCredential);

	return newCredential;
}

async function login(username: string, password: string): Promise<object | number> {
	if (!username || !password) return 0;

	const creUserName = await CREDENTIAL_MODEL.findOneBy({ username });

	if (creUserName) {
		const crePassword = await CREDENTIAL_MODEL.findOneBy({ password });

		if (crePassword) {
			const user = await USER_MODEL.findOneBy({
				credential: {
					username,
					password,
				},
			});
			if (user) return user;
			else {
				return 0;
			}
		}
	}

	return 0;
}

export default {
	createCredentials,
	login,
};
