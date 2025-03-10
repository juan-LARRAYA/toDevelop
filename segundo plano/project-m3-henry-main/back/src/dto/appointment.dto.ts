export interface AppointmentDto {
	date: string;
	time: string;
	userId: string;
	status: 'active' | 'cancelled';
}
