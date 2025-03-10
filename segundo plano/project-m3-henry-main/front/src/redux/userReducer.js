import { createSlice } from '@reduxjs/toolkit';

const userLogout = {
	isLogged: false,
	name: '',
	email: '',
	birthDate: '',
	nDni: '',
	id: '',
};

const initialStateUser = {
	user: {},
};

if (!localStorage.getItem('user')) {
	initialStateUser.user = userLogout;
} else {
	initialStateUser.user = JSON.parse(localStorage.getItem('user'));
}

export const userSlice = createSlice({
	name: 'user',
	initialState: initialStateUser,
	reducers: {
		isLogged: (state, action) => {
			state.user = action.payload;
			state.user.isLogged = true;
			localStorage.setItem('user', JSON.stringify(state.user));
		},

		logout: (state) => {
			localStorage.removeItem('user');
			state.user = userLogout;
		},
	},
});

export const { isLogged, logout } = userSlice.actions;
