import { get, writable } from 'svelte/store';

export const cleanNotification = (): NotificationState => {
	return {
		loader: false,
		header: '',
		description: '',
		fullscreen: false,
		notifications: []
	};
};

interface NotificationState {
	loader: boolean;
	fullscreen: boolean;
	header: string;
	description: string;
	notifications: Notification[];
}

interface Notification {
	text: string;
	type: 'success' | 'error' | 'warning' | 'info';
	id: number;
}

export const notificationStore = writable({
	loader: false,
	header: '',
	description: '',
	fullscreen: false,
	notifications: []
});

export const notifications = {
	startLoader: () => {
		console.log('loader started');
		const n = get(notificationStore);
		console.log(n);
		n.loader = true;
		console.log(n);
		notificationStore.set(n);
	},
	stopLoader: () => {
		const n = get(notificationStore);
		n.loader = false;
		notificationStore.set(n);
	},
	stop: () => {
		notificationStore.set(cleanNotification());
	},
	sendNotification: (text: string, type: 'success' | 'error' | 'warning' | 'info') => {
		const n = get(notificationStore);
		n.notifications.push({ text, type, id: (Math.random() * Math.random()) / Math.random() });
		notificationStore.set(n);
		setTimeout(() => {
			const n = get(notificationStore);
			n.notifications.shift();
			notificationStore.set(n);
		}, 3500);
	}
};
