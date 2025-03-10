import { Router } from 'express';
import appointmentController from '../controllers/appointmentController';
const appointmentRouter = Router();
const appointmentsRouter = Router();

appointmentsRouter.get('/', appointmentController.getAllAppointment);

appointmentRouter.get('/', appointmentController.getAppointment);
appointmentRouter.post('/schedule', appointmentController.createAppointment);
appointmentRouter.put('/cancel', appointmentController.cancelAppointment);

export default {
	appointmentRouter,
	appointmentsRouter,
};
