import { Request, Response } from 'express';
import userServices from '../services/userServices';
import { IUser } from '../interfaces/User';
import { UserDto } from '../dto/user.dto';
import credentialsServices from '../services/credentialsServices';
import { User } from '../entities/User';

async function getUsers(req: Request, res: Response): Promise<void> {
	const users: Array<User> = await userServices.getUsers();

	try {
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({
			message: 'Error interno del servidor',
		});
	}
}

async function getUserById(req: Request, res: Response): Promise<void> {
	const { id } = req.params;
	try {
		const user: User = await userServices.getUserById(id);

		res.status(200).json(user);
	} catch (error: Error | any) {
		res.status(404).json({
			error: error.message,
		});
	}
}

async function registerUser(req: Request, res: Response): Promise<void> {
	try {
		const newUser: UserDto = req.body;

		const user = await userServices.createUser(newUser);

		if (user) res.status(201).json(user);
	} catch (error: Error | any) {
		res.status(401).json(error.message);
	}
}

async function loginUser(req: Request, res: Response): Promise<void> {
	const { username, password } = req.body;

	const login: number | object = await credentialsServices.login(username, password);

	if (typeof login === 'object') res.status(200).json(login);

	if (login === 0) res.status(404).json({ message: 'Usuario o contraseña incorrectos' });
}

export default {
	getUsers,
	getUserById,
	registerUser,
	loginUser,
};
