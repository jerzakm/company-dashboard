import firebase from "firebase/app";
import { writable } from "svelte/store";

export const authStore = writable(undefined);

export const registerNewUser = (email: string, password: string) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
};

export const signInUser = (email: string, password: string) => {
  console.log(`signing in ${email}`);
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const startObservingAuthChanges = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authStore.set(user);
    } else {
      authStore.set(undefined);
    }
  });
};
