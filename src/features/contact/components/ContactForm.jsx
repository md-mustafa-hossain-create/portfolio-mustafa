import { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { CONTACT_STRINGS } from '@/constants/strings';
import { useContactSubmit } from '../hooks/useContactSubmit';
import Card from '@/shared/components/ui/Card';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';

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
    const success = await submitContact(name.trim(), email.trim(), message.trim());
    if (success) {
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <Card
      variant="glass"
      padding="none"
      hoverEffect={true}
      className="rounded-[2.5rem] hover:border-brand-500/20 hover:scale-[1.005] group overflow-hidden h-full"
    >
      <div className="p-6 sm:p-8 flex flex-col h-full justify-center relative z-10">
        
        <form onSubmit={handleSubmit} aria-busy={status === 'sending'} className="space-y-5 text-left">
          {/* 
            Sleek minimalist fields using custom variable-based border transitions.
            Refactored to use standard design system Input components.
          */}
          <Input
            label={CONTACT_STRINGS.FORM_NAME_LABEL}
            id="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
            placeholder="Enter your name"
          />

          <Input
            label={CONTACT_STRINGS.FORM_EMAIL_LABEL}
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={254}
            placeholder="name@example.com"
          />

          <Input
            label={CONTACT_STRINGS.FORM_MSG_LABEL}
            id="message"
            multiline
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            maxLength={5000}
            placeholder="Hi Mustafa, I would like to talk about..."
          />

          {status === 'success' && (
            <div role="status" aria-live="polite" className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-emerald-300 text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{CONTACT_STRINGS.SUCCESS_MSG}</span>
            </div>
          )}

          {status === 'error' && (
            <div role="alert" aria-live="assertive" className="flex items-center gap-2.5 p-4 rounded-xl bg-rose-950/20 border border-rose-900/30 text-rose-300 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{CONTACT_STRINGS.ERROR_MSG}</span>
            </div>
          )}

          {status === 'timeout' && (
            <div role="alert" aria-live="assertive" className="flex items-center gap-2.5 p-4 rounded-xl bg-amber-950/20 border border-amber-900/30 text-amber-200 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{CONTACT_STRINGS.TIMEOUT_MSG}</span>
            </div>
          )}

          <Button
            id="contact-btn-submit"
            type="submit"
            disabled={status === 'sending'}
            aria-busy={status === 'sending'}
            className="w-full gap-2"
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="contact-submit-spinner w-5 h-5 shrink-0 animate-spin" aria-hidden="true" />
                <span>{CONTACT_STRINGS.FORM_SUBMITTING}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{CONTACT_STRINGS.FORM_SUBMIT}</span>
              </>
            )}
          </Button>
          {status === 'sending' && (
            <span role="status" aria-live="polite" className="sr-only">
              {CONTACT_STRINGS.FORM_SUBMITTING}
            </span>
          )}
        </form>

      </div>
    </Card>
  );
}
