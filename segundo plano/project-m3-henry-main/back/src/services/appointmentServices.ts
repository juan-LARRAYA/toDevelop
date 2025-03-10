import { APPOINTMENT_MODEL, USER_MODEL } from '../config/data-source';
import { AppointmentDto } from '../dto/appointment.dto';
import { Appointment } from '../entities/Appointment';

async function getAppointments(id: string): Promise<Array<Appointment>> {
	const user = await USER_MODEL.findOneBy({ id });

	if (!user) {
		throw new Error(`Usuario no encontrado con el ID: ${id}`);
	}

	const result = await APPOINTMENT_MODEL.find({
		where: {
			user: user,
		},
		order: {
			dateCreated: 'DESC',
		},
	});

	return result;
}

async function getAppointmentById(id: string): Promise<Appointment> {
	const appointment = await APPOINTMENT_MODEL.findOneBy({ id });

	if (!appointment) {
		throw new Error(`Turno no encontrado con el ID: ${id}`);
	}

	return appointment;
}

async function createAppointment(appointmentData: AppointmentDto) {
	const newAppointment = APPOINTMENT_MODEL.create(appointmentData);
	newAppointment.dateCreated = Math.floor(Date.now() / 1000);

	const dateTurn = new Date(newAppointment.date).getTime();
	const dateNowArr = new Date().toLocaleString().split(',')[0].split('/');
	const dateNow = [dateNowArr[2], dateNowArr[1], dateNowArr[0]].join('-');

	if (dateTurn < new Date(dateNow).getTime()) {
		throw Error('Fecha de turno inválida, debe ser mayor a la fecha actual');
	}

	const _date = new Date(newAppointment.date);

	if (_date.getUTCDay() === 6 || _date.getUTCDay() === 0) {
		throw Error('No se puede programar un turno en fin de semana');
	}

	await APPOINTMENT_MODEL.save(newAppointment);

	const user = await USER_MODEL.findOneBy({ id: appointmentData.userId });

	if (user) {
		newAppointment.user = user;
		await APPOINTMENT_MODEL.save(newAppointment);
	}

	return newAppointment;
}

async function updateStatusAppointment(id: string): Promise<void> {
	const appointment = await APPOINTMENT_MODEL.findOneBy({ id });

	if (!appointment) {
		throw new Error(`Turno no encontrado con el ID: ${id}`);
	}

	appointment.status = 'cancelled';

	await APPOINTMENT_MODEL.save(appointment);
}

export default {
	getAppointments,
	getAppointmentById,
	createAppointment,
	updateStatusAppointment,
};
