import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
	name: 'credentials',
})
export class Credential {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		length: 100,
	})
	username: string;

	@Column({
		length: 100,
	})
	password: string;
}
