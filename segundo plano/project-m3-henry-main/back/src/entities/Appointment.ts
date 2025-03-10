import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({
	name: 'appointments',
})
export class Appointment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	date: string;

	@Column()
	time: string;

	@ManyToOne(() => User, (user) => user.appointments)
	user: User;

	@Column()
	status: 'active' | 'cancelled';

	@Column()
	dateCreated: number;
}
