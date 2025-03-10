import { Router } from 'express';
import userRouter from '../routes/userRouter';
import appointmentRouter from '../routes/appointmentRouter';
import auth from '../middleware/auth';

const routerIndex = Router();
routerIndex.use('/users', userRouter);
routerIndex.use('/turns', auth, appointmentRouter.appointmentsRouter);
routerIndex.use('/turn', auth, appointmentRouter.appointmentRouter);

export default routerIndex;
