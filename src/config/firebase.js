// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Vite, environment variables must start with VITE_
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBEzwY6hQfoIJtL93XOIqCecVauX5lnC2s",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "portfolio-b39db.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "portfolio-b39db",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "portfolio-b39db.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "226770105121",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:226770105121:web:f6b18fe2f1c5d48c3e4460"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore database
const db = getFirestore(app);

export { db, collection, addDoc, serverTimestamp };
export default app;
