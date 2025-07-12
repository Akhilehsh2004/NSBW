// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDIHwc5ZFjeYuv0b8QesUXlxNj1azcCgBM",
    authDomain: "nsb-join-form.firebaseapp.com",
    projectId: "nsb-join-form",
    storageBucket: "nsb-join-form.appspot.com",
    messagingSenderId: "55438380293",
    appId: "1:55438380293:web:0a7c1c661f05be60d27b6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // For database access

export default db;
