// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg9mJObll08q8gt2EzbT8T4kQJO4zD_cw",
  authDomain: "react-typescript-ig-stories.firebaseapp.com",
  databaseURL:
    "https://react-typescript-ig-stories-default-rtdb.firebaseio.com",
  projectId: "react-typescript-ig-stories",
  storageBucket: "react-typescript-ig-stories.appspot.com",
  messagingSenderId: "364857568001",
  appId: "1:364857568001:web:5f24d2053de5d5f51b0900",
  measurementId: "G-CWNHTHWTVN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, analytics, auth, storage, app };
