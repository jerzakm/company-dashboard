import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import { startObservingAuthChanges } from "./auth";
// import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVjfImluEAo11yfQ10WJeKuPGC6dWGz-U",
  authDomain: "company-dashboard-39759.firebaseapp.com",
  projectId: "company-dashboard-39759",
  storageBucket: "company-dashboard-39759.appspot.com",
  messagingSenderId: "258543970039",
  appId: "1:258543970039:web:c2a31213845b38d673d5f2",
  measurementId: "G-TWZYPTC072",
};

export const startFirebase = () => {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  startObservingAuthChanges();
};
