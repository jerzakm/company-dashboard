import { writable } from 'svelte/store';
import { AuthUser } from '../routes/api/auth/login';
import { post } from './api';

export const authStore = writable(undefined);

export const verifyUser = async () => {
	const storedUser = JSON.parse(localStorage.getItem('companyDashBoardUser'));
	let verified = false;
	if (storedUser) {
		const { login, password } = storedUser;
		const auth = await authenticateUser(login, password);
		verified = auth.user;
	}

	return verified;
};

export const authenticateUser = async (login, password) => {
	const response = await post('auth/login', { login, password });

	if (response.user) {
		localStorage.setItem('companyDashBoardUser', JSON.stringify(response.user));
	} else {
		localStorage.removeItem('companyDashBoardUser');
	}

	return response;
};
