import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyA0nLdjrdHx_votKLcZX81q8IWC8XlzEXA",
    authDomain: "study-workspace-66833.firebaseapp.com",
    projectId: "study-workspace-66833",
    storageBucket: "study-workspace-66833.firebasestorage.app",
    messagingSenderId: "630811162274",
    appId: "1:630811162274:web:1fcb8dff24088f93ad89fb",
    measurementId: "G-DN1R1Q1S3G"
  };

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }