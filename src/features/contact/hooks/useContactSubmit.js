import { useState } from 'react';

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

    try {
      const [{ collection, addDoc, serverTimestamp }, { db }] = await Promise.all([
        import('firebase/firestore'),
        import('@/config/firebase'),
      ]);

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
