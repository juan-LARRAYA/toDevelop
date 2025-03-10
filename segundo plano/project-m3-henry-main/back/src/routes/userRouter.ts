import { Router } from 'express';
import userController from '../controllers/userController';
import auth from '../middleware/auth';

const userRouter = Router();

userRouter.get('/', auth, userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);

export default userRouter;
