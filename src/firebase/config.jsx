import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCPLzWho9PC5I1tDUNC0fWzus10qC19QqQ",
    authDomain: "dw3-avaliacao.firebaseapp.com",
    projectId: "dw3-avaliacao",
    storageBucket: "dw3-avaliacao.firebasestorage.app",
    messagingSenderId: "840198079414",
    appId: "1:840198079414:web:e8414e8ea7b3454ed53717",
    measurementId: "G-4NLNYN37P2"
  };

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }