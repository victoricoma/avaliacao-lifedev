import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyC7vyG9-FYPx_vxbyj3BGREY6croXCbMMY",
    authDomain: "lifedev-dsm-ferreira.firebaseapp.com",
    projectId: "lifedev-dsm-ferreira",
    storageBucket: "lifedev-dsm-ferreira.firebasestorage.app",
    messagingSenderId: "1052150591995",
    appId: "1:1052150591995:web:b65b44dbb6d82041609b5e",
    measurementId: "G-6VVJ6T4J3C"
};

const app = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const auth = getAuth(app)