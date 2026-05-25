import { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { db, collection, addDoc, serverTimestamp } from '../../config/firebase';
import { CONTACT_STRINGS } from '../../constants/strings';

/**
 * @fileoverview Form component for the Contact section.
 * Extracted to isolate form state and Firebase submission logic.
 */

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    
    if (!apiKey || apiKey.includes('your_api_key_here') || apiKey === '') {
      console.warn("Firebase is not fully configured. Simulating Firestore write...");
      setTimeout(() => {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      }, 1500);
      return;
    }

    try {
      await addDoc(collection(db, 'messages'), {
        name: name,
        email: email,
        message: message,
        timestamp: serverTimestamp(),
      });
      
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error("Error writing document: ", err);
      setStatus('error');
    }
  };

  return (
    <div className="double-bezel-outer hover:border-brand-500/20 hover:scale-[1.005] group overflow-hidden h-full">
      <div className="double-bezel-inner p-6 sm:p-8 flex flex-col justify-center">
        
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
              {CONTACT_STRINGS.FORM_NAME_LABEL}
            </label>
            <input
              type="text"
              id="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
              {CONTACT_STRINGS.FORM_EMAIL_LABEL}
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
              className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
              {CONTACT_STRINGS.FORM_MSG_LABEL}
            </label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Hi Mustafa, I would like to talk about..."
              className="w-full bg-zinc-950/80 border border-zinc-900 focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all duration-300 resize-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
            ></textarea>
          </div>

          {status === 'success' && (
            <div className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-emerald-300 text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{CONTACT_STRINGS.SUCCESS_MSG}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2.5 p-4 rounded-xl bg-rose-950/20 border border-rose-900/30 text-rose-300 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{CONTACT_STRINGS.ERROR_MSG}</span>
            </div>
          )}

          <button
            id="contact-btn-submit"
            type="submit"
            disabled={status === 'sending'}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-semibold rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-brand-500/10 cursor-pointer"
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{CONTACT_STRINGS.FORM_SUBMITTING}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{CONTACT_STRINGS.FORM_SUBMIT}</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
