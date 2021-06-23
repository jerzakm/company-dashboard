import * as admin from 'firebase-admin';
import credentials from './config/firebase-adminsdk.json';


if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(credentials),
  		databaseURL: "https://" + credentials.projectId + ".firebaseio.com"
	});
}

export const db = admin.firestore();
export const auth = admin.auth();
