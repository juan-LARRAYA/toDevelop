import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userReducer';
import { appointmentsSlice } from './appointmentReducer.js';

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		appointments: appointmentsSlice.reducer,
	},
});
