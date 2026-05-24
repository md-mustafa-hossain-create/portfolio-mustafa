import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Skills from '../Skills';

// Define variable to hold our mock database query result
let mockFirestoreData = [];

// Mock firebase/app
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}));

// Mock the firebase/firestore module with all exports used by src/firebase.js and Skills.jsx
vi.mock('firebase/firestore', () => {
  return {
    getFirestore: vi.fn(() => ({})),
    collection: vi.fn(),
    query: vi.fn(),
    orderBy: vi.fn(),
    getDocs: vi.fn(async () => {
      return {
        forEach: (callback) => {
          mockFirestoreData.forEach((item) => {
            callback({
              id: item.id,
              data: () => item.data
            });
          });
        }
      };
    })
  };
});

describe('Skills Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('VITE_FIREBASE_API_KEY', '');
  });

  it('shows loading skeletons initially', async () => {
    render(<Skills />);
    expect(screen.getByText('02 . Core Stack')).toBeInTheDocument();
  });

  it('loads and displays local default skills if Firebase API key is not configured', async () => {
    vi.stubEnv('VITE_FIREBASE_API_KEY', '');

    render(<Skills />);

    await waitFor(() => {
      expect(screen.getByText('HTML5')).toBeInTheDocument();
      expect(screen.getByText('Structure of the Web')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('Firebase')).toBeInTheDocument();
    });
  });

  it('fetches and displays skills from Firestore when API key is configured', async () => {
    vi.stubEnv('VITE_FIREBASE_API_KEY', 'mock-api-key');

    // Provide mock custom skills returning from Firestore
    mockFirestoreData = [
      {
        id: 'skill-id-1',
        data: {
          name: 'Svelte',
          desc: 'Cybernetic Enhancements',
          color: 'from-orange-500 to-red-600',
          order: 1
        }
      },
      {
        id: 'skill-id-2',
        data: {
          name: 'GraphQL',
          desc: 'Query Language API',
          color: 'from-pink-500 to-purple-600',
          order: 2
        }
      }
    ];

    render(<Skills />);

    await waitFor(() => {
      expect(screen.getByText('Svelte')).toBeInTheDocument();
      expect(screen.getByText('Cybernetic Enhancements')).toBeInTheDocument();
      expect(screen.getByText('GraphQL')).toBeInTheDocument();
      expect(screen.getByText('Query Language API')).toBeInTheDocument();
    });
  });
});
