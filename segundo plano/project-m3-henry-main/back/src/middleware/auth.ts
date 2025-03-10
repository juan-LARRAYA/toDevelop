import { Request, Response, NextFunction } from 'express';
import userServices from '../services/userServices';

export default async function auth(req: Request, res: Response, next: NextFunction) {
	const { userId } = req.body;

	try {
		const user = await userServices.getUserById(userId);
		if (user.name) {
			next();
		} else {
			res.status(401).json({ message: 'No autorizado' });
		}
	} catch (error) {
		if (error instanceof Error) {
			res.status(401).json({ message: error.message });
		}
	}
}
