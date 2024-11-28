// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzsqDIMyY9ACCZCG44ETIQcNmc2U2iK9s",
  authDomain: "ndocument-beta.firebaseapp.com",
  projectId: "ndocument-beta",
  storageBucket: "ndocument-beta.firebasestorage.app",
  messagingSenderId: "468270201872",
  appId: "1:468270201872:web:9733d91153303590b41e95",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
export { db };
