import { ArrowUp } from 'lucide-react';

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
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand/Logo */}
          <div className="text-left font-mono text-sm text-zinc-400">
            <span>Designed & Built by </span>
            <span className="text-brand-400 font-bold">MD Mustafa Hossain</span>
          </div>

          {/* Centered copyright */}
          <div className="text-xs text-zinc-400">
            © {currentYear} MUSTAFA.dev. All rights reserved.
          </div>

          {/* Social icons + scroll top */}
          <div className="flex items-center gap-4">
            <a
              id="footer-link-github"
              href="https://github.com/md-mustafa-hossain-create"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-500 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              id="footer-link-linkedin"
              href="https://www.linkedin.com/in/mdmustafahossain"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-500 hover:text-brand-400 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              id="footer-link-twitter"
              href="https://x.com/MDMustafaHussa7"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-500 hover:text-brand-400 transition-colors"
              aria-label="Twitter / X"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a
              id="footer-btn-scroll-top"
              href="#home"
              onClick={handleScrollTop}
              className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-brand-400 hover:border-brand-500/30 transition-all ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
