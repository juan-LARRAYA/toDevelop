import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	appointments: [],
};

export const appointmentsSlice = createSlice({
	name: 'appointments',
	initialState,
	reducers: {
		addAppointment: (state, action) => {
			const values = action.payload;
			values.status = 'active';
			axios
				.post('http://localhost:3000/turn/schedule', values)
				.then((res) => {
					if (res.status === 201) window.location.href = '/turns';
				})
				.catch((err) => {
					alert(err.request.response);
				});
		},

		chargerAppointment: (state, action) => {
			state.appointments = action.payload;
		},

		clearAppointments: (state) => {
			state.appointments = [];
		},

		cancelTurn: (state, action) => {
			const id = action.payload;
			axios.put('http://localhost:3000/turn/cancel', { id });

			state.appointments = state.appointments.map((turn) => {
				if (turn.id === id) {
					turn.status = 'cancelled';
				}
				return turn;
			});
		},
	},
});

export const { addAppointment, chargerAppointment, clearAppointments, cancelTurn } = appointmentsSlice.actions;
