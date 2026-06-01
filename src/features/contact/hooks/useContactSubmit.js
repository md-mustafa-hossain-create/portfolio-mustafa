import { useState } from 'react';
import { db } from '@/config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * @fileoverview Custom hook to handle contact form submission to Firebase.
 * Decouples the database logic from the presentation layer.
 */

/**
 * Hook to manage contact message submission.
 * @returns {{ status: 'idle'|'sending'|'success'|'error', submitContact: (name: string, email: string, message: string) => Promise<boolean>, resetStatus: () => void }}
 */
export function useContactSubmit() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const submitContact = async (name, email, message) => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      return false;
    }

    setStatus('sending');

    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

    if (!apiKey || apiKey.includes('your_api_key_here') || apiKey === '') {
      console.warn("Firebase is not fully configured. Simulating Firestore write...");
      return new Promise((resolve) => {
        setTimeout(() => {
          setStatus('success');
          resolve(true);
        }, 1500);
      });
    }

    try {
      await addDoc(collection(db, 'messages'), {
        name,
        email,
        message,
        timestamp: serverTimestamp(),
      });

      setStatus('success');
      return true;
    } catch (err) {
      console.error("Error writing document: ", err);
      setStatus('error');
      return false;
    }
  };

  const resetStatus = () => setStatus('idle');

  return { status, submitContact, resetStatus };
}
