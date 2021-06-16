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

export const authenticateUser = async (login, password) => {
	console.log('authenticating user ' + login);
	const response = await post('auth/login', { login, password });
	console.log(response);

	if (response.user) {
		localStorage.setItem('companyDashBoardUser', JSON.stringify(response.user));
	} else {
		localStorage.removeItem('companyDashBoardUser');
	}

	return response;
};

export const logOut = () => {
	localStorage.removeItem('companyDashBoardUser');
	window.location.href = '/';
};

export const getUser = () => {
	const user = JSON.parse(localStorage.getItem('companyDashBoardUser'));

	return user;
};
