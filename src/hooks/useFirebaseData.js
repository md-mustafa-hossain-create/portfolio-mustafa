import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

const DEFAULT_FALLBACK = [];

/**
 * Custom hook to fetch data from a Firestore collection.
 * Includes built-in error handling and fallback logic.
 * 
 * @param {string} collectionName - The name of the Firestore collection (e.g., 'projects', 'skills').
 * @param {Array} fallbackData - Static data to return if the Firebase query fails, is empty, or isn't configured.
 * @returns {{ data: Array, loading: boolean, error: Error|null }} An object containing the data, loading state, and error.
 */
export function useFirebaseData(collectionName, fallbackData = DEFAULT_FALLBACK) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      // 1. Check if Firebase is actually configured
      const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
      const isFirebaseConfigured = apiKey && !apiKey.includes('your_api_key_here') && apiKey !== '';

      if (!isFirebaseConfigured) {
        console.warn(`Firebase not configured. Loading local fallback for ${collectionName}.`);
        if (isMounted) {
          setData(fallbackData);
          setLoading(false);
        }
        return;
      }

      try {
        // 2. Query the collection, ordered by 'order'
        const q = query(collection(db, collectionName), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        const fetched = [];
        
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() });
        });

        // 3. Handle un-indexed queries (fallback if 'order' isn't set up yet)
        if (fetched.length === 0) {
          const backupSnapshot = await getDocs(collection(db, collectionName));
          backupSnapshot.forEach((doc) => {
            fetched.push({ id: doc.id, ...doc.data() });
          });
        }

        // 4. Update State
        if (isMounted) {
          if (fetched.length === 0) {
            console.warn(`Firestore '${collectionName}' collection is empty. Loading local fallback.`);
            setData(fallbackData);
          } else {
            setData(fetched);
          }
          setError(null);
        }

      } catch (err) {
        console.error(`Error fetching ${collectionName} from Firestore:`, err);
        if (isMounted) {
          setError(err);
          setData(fallbackData); // Always gracefully fallback
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, [collectionName, fallbackData]);

  return { data, loading, error };
}
