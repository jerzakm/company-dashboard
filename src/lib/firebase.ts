import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import { browser } from '$app/env';
import credentials from './config/firebase-appsdk.json';
import dashboardConfig from './config/dashboard-config.json';
import { writable } from 'svelte/store';

if (!firebase.apps.length) {
	firebase.initializeApp(credentials);
}

export const analytics = (): firebase.analytics.Analytics => firebase.analytics();
export const auth: firebase.auth.Auth = firebase.auth();
export const emailProvider = new firebase.auth.EmailAuthProvider();

export const authStore = writable(null);

// listen to auth changes on client

if (browser) {
	// Auth is handled using session cookies, and the server will always re-send
	// a token for any authenticated session
	auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
	auth.onAuthStateChanged((user) => {
		console.log('changed', user);
		authStore.set(user);
	});
}

export const signIn = async (user: string, password: string) => {
	let credential;

	try {
		const email = `${user}${dashboardConfig.emailSuffix}`;
		credential = await auth.signInWithEmailAndPassword(email, password);
		authStore.set(credential.user);
	} catch {
		console.log('error');
		credential = null;
	}

	return credential;
};

export const signOut = async () => {
	await auth.signOut();
};
