import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyD6kCXbC2RWA-Y53VvwIE-SFt5r3dmORJI",
  authDomain: "photoshare-811b7.firebaseapp.com",
  projectId: "photoshare-811b7",
  storageBucket: "photoshare-811b7.firebasestorage.app",
  messagingSenderId: "781248521295",
  appId: "1:781248521295:web:8b871328e9040cf68f763a",
  measurementId: "G-1E3LRHEYJZ"
};



export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)