import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Credential } from './Credentials';
import { Appointment } from './Appointment';

@Entity({
	name: 'users',
})
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		length: 100,
	})
	name: string;

	@Column({
		length: 100,
	})
	email: string;

	@Column({
		length: 15,
	})
	birthDate: string;

	@Column('int')
	nDni: number;

	@OneToOne(() => Credential)
	@JoinColumn()
	credential: Credential;

	@OneToMany(() => Appointment, (appointment) => appointment.user)
	appointments: Array<Appointment>;
}
