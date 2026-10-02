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
    const normalizedName = name.trim();
    const normalizedEmail = email.trim();
    const normalizedMessage = message.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (
      normalizedName.length < 1 || normalizedName.length > 100 ||
      normalizedEmail.length > 254 || !validEmail ||
      normalizedMessage.length < 1 || normalizedMessage.length > 5000
    ) {
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
        name: normalizedName,
        email: normalizedEmail,
        message: normalizedMessage,
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
