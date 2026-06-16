// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Vite, environment variables must start with VITE_
const firebaseConfig = {
  apiKey: "AIzaSyBEzwY6hQfoIJtL93XOIqCecVauX5lnC2s",
  authDomain: "portfolio-b39db.firebaseapp.com",
  projectId: "portfolio-b39db",
  storageBucket: "portfolio-b39db.firebasestorage.app",
  messagingSenderId: "226770105121",
  appId: "1:226770105121:web:f6b18fe2f1c5d48c3e4460"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore database
const db = getFirestore(app);

export { db, collection, addDoc, serverTimestamp };
export default app;
