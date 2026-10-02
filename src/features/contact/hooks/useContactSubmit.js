import { useRef, useState } from 'react';

const SUBMISSION_TIMEOUT_MS = 20000;

function withTimeout(promise, timeoutMs) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      const error = new Error('Contact submission timed out');
      error.name = 'TimeoutError';
      reject(error);
    }, timeoutMs);
  });

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

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
  const submitInProgress = useRef(false);

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

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setStatus('error');
      return false;
    }

    if (submitInProgress.current) return false;
    submitInProgress.current = true;
    setStatus('sending');

    try {
      await withTimeout((async () => {
        const [{ collection, addDoc, serverTimestamp }, { db }] = await Promise.all([
          import('firebase/firestore'),
          import('@/config/firebase'),
        ]);

        return addDoc(collection(db, 'messages'), {
          name: normalizedName,
          email: normalizedEmail,
          message: normalizedMessage,
          timestamp: serverTimestamp(),
        });
      })(), SUBMISSION_TIMEOUT_MS);

      setStatus('success');
      return true;
    } catch (err) {
      if (err?.name === 'TimeoutError') {
        setStatus('timeout');
      } else {
        console.error("Error writing document: ", err);
        setStatus('error');
      }
      return false;
    } finally {
      submitInProgress.current = false;
    }
  };

  const resetStatus = () => setStatus('idle');

  return { status, submitContact, resetStatus };
}
