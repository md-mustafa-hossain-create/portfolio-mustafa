import { useState } from 'react';
import { Mail, Send, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { db, collection, addDoc, serverTimestamp } from '../firebase';

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.11 4.4-.49 6.2-1.7-2.1-.06-3.9-1.42-4.7-3.4.7.12 1.4.11 2-.08-2.28-.46-3.92-2.47-3.92-4.8 0 0 .7.33 1.5.38-2.28-1.5-2.8-4.66-1.5-6.9 2.5 3 6.3 4.7 10.4 4.9-1.12-4.68 2.6-8.32 7.1-7.1 1.9.3 3.7-1 4.4-2.8.9.5 1.6 1.1 2.2 1.8z" />
  </svg>
);

export default function Contact() {
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

    // Check if Firebase api key is set
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    
    if (!apiKey || apiKey.includes('your_api_key_here') || apiKey === '') {
      // Simulate success for local testing/preview if Firebase is not hooked up yet
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
      // Save message to Firebase Firestore
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

  const socials = [
    {
      name: 'LinkedIn',
      icon: <LinkedinIcon className="w-5 h-5 text-brand-400" />,
      url: 'https://www.linkedin.com/in/mdmustafahossain',
      color: 'hover:text-brand-400 hover:border-brand-500/30'
    },
    {
      name: 'GitHub',
      icon: <GithubIcon className="w-5 h-5 text-zinc-300" />,
      url: 'https://github.com/md-mustafa-hossain-create',
      color: 'hover:text-brand-400 hover:border-brand-500/30'
    },
    {
      name: 'Twitter / X',
      icon: <TwitterIcon className="w-5 h-5 text-brand-400" />,
      url: 'https://x.com/MDMustafaHussa7',
      color: 'hover:text-brand-400 hover:border-brand-500/30'
    },
    {
      name: 'Email Direct',
      icon: <Mail className="w-5 h-5 text-brand-400" />,
      url: 'mailto:hussainmustafa2001@gmail.com',
      color: 'hover:text-brand-400 hover:border-brand-500/30'
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-terminal-mesh-contact border-t border-zinc-900">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-20 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider font-mono text-brand-400 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>05 . Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter">
            Contact <span className="text-brand-400">Me</span>
          </h2>
          <div className="w-16 h-1 bg-brand-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-sm text-zinc-400 mt-5 max-w-md mx-auto leading-relaxed">
            Have an internship opportunity, a project idea, or just want to say hi? Drop me a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
          
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left reveal" style={{ transitionDelay: '100ms' }}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-zinc-100">
                Let's discuss something great
              </h3>
              <div className="flex items-center gap-2 text-[10px] text-zinc-500 select-none font-mono mt-4">
                <span>mustafa@dev:~$</span>
                <span className="text-purple-400">./connect.sh</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-mono mt-3">
                [<span className="text-yellow-400 font-bold">CONNECT</span>] I am actively seeking opportunities to start my career as a <span className="text-brand-400 font-bold">Frontend Developer</span>. I am open to working on React projects, learning new tools, and collaborating with cross-functional teams.
              </p>

              {/* Direct Card info */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 text-zinc-300">
                  <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                    <Mail className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 font-mono block">EMAIL ME</span>
                    <a
                      href="mailto:hussainmustafa2001@gmail.com"
                      className="text-sm font-semibold hover:text-brand-400 transition-colors"
                    >
                      hussainmustafa2001@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-zinc-300">
                  <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                    <MapPin className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 font-mono block">MY LOCATION</span>
                    <span className="text-sm font-semibold">
                      Murshidabad, West Bengal, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="space-y-4 pt-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                Find me on
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    id={`contact-social-${social.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`glass p-3 rounded-lg flex items-center gap-3 border border-zinc-800 transition-all duration-300 ${social.color}`}
                  >
                    {social.icon}
                    <span className="text-xs font-semibold text-zinc-300 group-hover:text-white">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 reveal" style={{ transitionDelay: '200ms' }}>
            <div className="double-bezel-outer hover:border-brand-500/20 hover:scale-[1.005] group overflow-hidden h-full">
              <div className="double-bezel-inner p-6 sm:p-8 flex flex-col justify-center">
                
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                      Your Name
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
                      Email Address
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
                      Your Message
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

                  {/* Status Banners */}
                  {status === 'success' && (
                    <div className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-emerald-300 text-xs sm:text-sm">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>Thank you! Your message has been sent successfully.</span>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="flex items-center gap-2.5 p-4 rounded-xl bg-rose-950/20 border border-rose-900/30 text-rose-300 text-xs sm:text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>Oops! Please fill in all fields or check your connection.</span>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    id="contact-btn-submit"
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-semibold rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-brand-500/10 cursor-pointer"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
