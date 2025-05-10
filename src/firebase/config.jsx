// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCiykycVyv6IEkKYVZUGfxkvKFuvqhDZFc",
  authDomain: "provadw-minidev.firebaseapp.com",
  projectId: "provadw-minidev",
  storageBucket: "provadw-minidev.firebasestorage.app",
  messagingSenderId: "669811841750",
  appId: "1:669811841750:web:a02413964709bad0444777",
  measurementId: "G-C1ZMZXSEJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };