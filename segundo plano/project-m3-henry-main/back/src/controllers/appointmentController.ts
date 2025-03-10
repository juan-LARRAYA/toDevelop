import { Request, Response } from 'express';
import appointmentService from '../services/appointmentServices';
import { AppointmentDto } from '../dto/appointment.dto';

async function getAllAppointment(req: Request, res: Response): Promise<void> {
	try {
		const userId = req.url.split('=')[1];
		const appointments = await appointmentService.getAppointments(userId);

		res.status(200).json(appointments);
	} catch (err) {
		res.status(500).json({ message: 'Error interno del servidor' });
	}
}
async function getAppointment(req: Request, res: Response): Promise<void> {
	const { id } = req.body;
	try {
		const appointment = await appointmentService.getAppointmentById(id);
		res.status(200).json(appointment);
	} catch (err) {
		res.status(500).json({ message: 'Error interno del servidor' });
	}
}

async function createAppointment(req: Request, res: Response): Promise<void> {
	try {
		const newAppointment: AppointmentDto = req.body;
		const appointmentCreate = await appointmentService.createAppointment(newAppointment);
		res.status(201).json({ message: 'Cita creada', appointmentCreate });
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json(err.message);
		}
	}
}

async function cancelAppointment(req: Request, res: Response): Promise<void> {
	console.log(req.body);
	try {
		const { id } = req.body;
		console.log(id);

		await appointmentService.updateStatusAppointment(id);

		res.status(204).json({ message: 'Cita cancelada' });
	} catch (err) {
		if (err instanceof Error) {
			res.status(404).json({ message: err.message });
		}
	}
}

export default {
	getAllAppointment,
	getAppointment,
	createAppointment,
	cancelAppointment,
};
