import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Contact from '@/features/contact/components/ContactSection';

// Mock variables
const mockAddDoc = vi.fn();

// Mock firebase/app
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}));

// Mock firebase/firestore
vi.mock('firebase/firestore', () => {
  return {
    getFirestore: vi.fn(() => ({})),
    collection: vi.fn(),
    addDoc: (...args) => mockAddDoc(...args),
    serverTimestamp: vi.fn(() => 'mock-timestamp'),
  };
});

describe('Contact Component', () => {
  let setTimeoutSpy = null;
  const originalSetTimeout = global.setTimeout;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('VITE_FIREBASE_API_KEY', '');
  });

  afterEach(() => {
    if (setTimeoutSpy) {
      setTimeoutSpy.mockRestore();
      setTimeoutSpy = null;
    }
  });

  it('renders form inputs and submit button successfully', () => {
    render(<Contact />);

    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('allows user to type into input fields', () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText('Your Name');
    const emailInput = screen.getByLabelText('Email Address');
    const messageInput = screen.getByLabelText('Your Message');

    fireEvent.change(nameInput, { target: { value: 'Mustafa Alami' } });
    fireEvent.change(emailInput, { target: { value: 'mustafa@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, looking forward to working with you.' } });

    expect(nameInput.value).toBe('Mustafa Alami');
    expect(emailInput.value).toBe('mustafa@example.com');
    expect(messageInput.value).toBe('Hello, looking forward to working with you.');
  });

  it('displays error message if fields are empty during submit', () => {
    render(<Contact />);

    const form = screen.getByRole('button', { name: 'Send Message' }).closest('form');
    fireEvent.submit(form);

    expect(screen.getByText(/Oops! Please fill in all fields/i)).toBeInTheDocument();
  });

  it('simulates local success submission if Firebase key is not configured', async () => {
    vi.stubEnv('VITE_FIREBASE_API_KEY', '');
    
    // Intercept only the 1500ms local mock database write simulation timeout, 
    // letting testing library's internal timeouts run unhindered via originalSetTimeout.
    setTimeoutSpy = vi.spyOn(global, 'setTimeout').mockImplementation((callback, delay, ...args) => {
      if (delay === 1500) {
        Promise.resolve().then(callback);
        return 999;
      }
      return originalSetTimeout(callback, delay, ...args);
    });

    render(<Contact />);

    const nameInput = screen.getByLabelText('Your Name');
    const emailInput = screen.getByLabelText('Email Address');
    const messageInput = screen.getByLabelText('Your Message');
    const submitButton = screen.getByRole('button', { name: 'Send Message' });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Testing local simulation' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Thank you! Your message has been sent successfully.')).toBeInTheDocument();
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });

  it('saves form data to Firestore if Firebase key is configured', async () => {
    vi.stubEnv('VITE_FIREBASE_API_KEY', 'valid-api-key-123');
    mockAddDoc.mockResolvedValueOnce({ id: 'doc-123' });

    render(<Contact />);

    const nameInput = screen.getByLabelText('Your Name');
    const emailInput = screen.getByLabelText('Email Address');
    const messageInput = screen.getByLabelText('Your Message');
    const submitButton = screen.getByRole('button', { name: 'Send Message' });

    fireEvent.change(nameInput, { target: { value: 'Alice Smith' } });
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Great portfolio!' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddDoc).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Thank you! Your message has been sent successfully.')).toBeInTheDocument();
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });

  it('displays error if Firestore write fails', async () => {
    vi.stubEnv('VITE_FIREBASE_API_KEY', 'valid-api-key-123');
    mockAddDoc.mockRejectedValueOnce(new Error('Firebase connection error'));

    render(<Contact />);

    const nameInput = screen.getByLabelText('Your Name');
    const emailInput = screen.getByLabelText('Email Address');
    const messageInput = screen.getByLabelText('Your Message');
    const submitButton = screen.getByRole('button', { name: 'Send Message' });

    fireEvent.change(nameInput, { target: { value: 'Alice Smith' } });
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Great portfolio!' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Oops! Please fill in all fields or check your connection/i)).toBeInTheDocument();
    });
  });
});
