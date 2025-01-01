
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";   // Realtime Database
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  signOut,
}  from 'firebase/auth';


const firebaseConfig = {
  apiKey : import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "truckit-55e2f.firebaseapp.com",
  projectId: "truckit-55e2f",
  storageBucket: "truckit-55e2f.firebasestorage.app",
  messagingSenderId: "766128057877",
  appId: "1:766128057877:web:e38aa52345263604d8a81c",
  measurementId: "G-EWMLQZSMBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export{ 
  auth,
  db,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
};