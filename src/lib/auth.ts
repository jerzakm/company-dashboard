import { writable } from 'svelte/store';

export const authStore = writable(undefined);

export const verifyUser = async () => {
	return false;
};
