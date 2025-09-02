import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  projectId: "arogyacare-yf3yk",
  appId: "1:216527658560:web:a41e7a631d0cad271589a5",
  storageBucket: "arogyacare-yf3yk.appspot.com",
  apiKey: "AIzaSyA9ZrPLpPACDBGjoJio3BfFVRZY6YpP_GA",
  authDomain: "arogyacare-yf3yk.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "216527658560"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
