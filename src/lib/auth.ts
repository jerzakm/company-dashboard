import { writable } from 'svelte/store';
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

export const authenticateUser = async (user, password) => {
	const response = await post('auth', { user, password });
	console.log('authenticate user', response.user);
	if (response.user) {
		authStore.set(response.user);
		localStorage.setItem('companyDashBoardUser', JSON.stringify(response.user));
	} else {
		authStore.set(undefined);
		localStorage.removeItem('companyDashBoardUser');
	}

	return response;
};

export const signOut = () => {
	localStorage.removeItem('companyDashBoardUser');
	authStore.set(undefined);
	window.location.href = '/';
};

export const getUser = () => {
	const user = JSON.parse(localStorage.getItem('companyDashBoardUser'));

	return user;
};
