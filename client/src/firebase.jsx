
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "mern-auth-b9c39.firebaseapp.com",
    projectId: "mern-auth-b9c39",
    storageBucket: "mern-auth-b9c39.appspot.com",
    messagingSenderId: "231065505524",
    appId: "1:231065505524:web:609fa476c6df781c6b58a1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);