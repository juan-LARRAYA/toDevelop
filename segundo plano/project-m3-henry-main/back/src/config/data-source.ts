import { DataSource } from 'typeorm';
import { DATABASE_PG, HOST_PG, PASSWORD_PG, PORT_PG, USERNAME_PG } from './env';
import { User } from '../entities/User';
import { Credential } from '../entities/Credentials';
import { Appointment } from '../entities/Appointment';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: HOST_PG,
	port: Number(PORT_PG),
	username: USERNAME_PG,
	password: PASSWORD_PG,
	database: DATABASE_PG,
	synchronize: true,
	logging: false,
	// dropSchema: true,
	entities: [User, Credential, Appointment],
	subscribers: [],
	migrations: [],
});

export const USER_MODEL = AppDataSource.getRepository(User);
export const CREDENTIAL_MODEL = AppDataSource.getRepository(Credential);
export const APPOINTMENT_MODEL = AppDataSource.getRepository(Appointment);
