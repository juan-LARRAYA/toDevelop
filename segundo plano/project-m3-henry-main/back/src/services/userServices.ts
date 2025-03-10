import { USER_MODEL } from '../config/data-source';
import { UserDto } from '../dto/user.dto';
import { Credential } from '../entities/Credentials';
import { User } from '../entities/User';
import credentialsServices from './credentialsServices';

async function getUsers(): Promise<Array<User>> {
	const result = await USER_MODEL.find({
		relations: {
			credential: true,
			appointments: true,
		},
	});

	return result;
}

async function getUserById(id: string): Promise<User> {
	const result = await USER_MODEL.findOneBy({
		id: id,
	});

	if (result) return result;

	throw new Error(`Usuario no encontrado con el ID: ${id}`);
}

async function createUser(userDTO: UserDto): Promise<User> {
	const { name, birthDate, email, nDni, password, username } = userDTO;

	const newUser = USER_MODEL.create({ name, birthDate, email, nDni });

	await USER_MODEL.save(newUser);

	const credential: Credential = await credentialsServices.createCredentials(
		username,
		password,
	);

	if (credential) {
		newUser.credential = credential;
		await USER_MODEL.save(newUser);
	}

	return newUser;
}

export default {
	getUsers,
	getUserById,
	createUser,
};
