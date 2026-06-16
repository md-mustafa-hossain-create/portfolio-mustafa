import { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { CONTACT_STRINGS } from '@/constants/strings';
import { useContactSubmit } from '../hooks/useContactSubmit';

/**
 * @fileoverview Form component for the Contact section.
 * UI is fully decoupled from the Firebase database logic.
 */

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Custom hook containing all the Firebase submission logic
  const { status, submitContact } = useContactSubmit();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitContact(name, email, message);
    if (success) {
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className="glass rounded-[2.5rem] hover:border-brand-500/20 hover:scale-[1.005] group overflow-hidden h-full">
      <div className="p-6 sm:p-8 flex flex-col h-full justify-center relative z-10">
        
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {/* 
            Sleek minimalist fields using custom variable-based border transitions.
            Inset shadows (shades) are removed to avoid double-borders on focus, 
            providing a cleaner glassmorphism feel across light and dark modes.
          */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs font-sans font-bold text-zinc-400 uppercase tracking-wider">
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
              className="w-full bg-zinc-950/60 border border-zinc-800/80 focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-0 transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-sans font-bold text-zinc-400 uppercase tracking-wider">
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
              className="w-full bg-zinc-950/60 border border-zinc-800/80 focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-0 transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs font-sans font-bold text-zinc-400 uppercase tracking-wider">
              {CONTACT_STRINGS.FORM_MSG_LABEL}
            </label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Hi Mustafa, I would like to talk about..."
              className="w-full bg-zinc-950/60 border border-zinc-800/80 focus:border-brand-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-0 transition-all duration-300 resize-none"
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
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-400 disabled:bg-zinc-800 disabled:text-zinc-400 text-black font-semibold rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-brand-500/10 cursor-pointer"
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
