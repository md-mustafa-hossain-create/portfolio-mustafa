import { ArrowUp } from 'lucide-react';
import { SOCIALS } from '../constants/data';
import { GLOBAL } from '../constants/strings';

/**
 * @fileoverview Main Footer section component.
 * Refactored to use central constants and social data to ensure DRY.
 */

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
    <footer className="border-t border-zinc-900 bg-zinc-950 py-8 relative min-h-[104px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand/Logo */}
          <div className="text-left text-sm text-zinc-400">
            <span>Designed & Built by </span>
            <span className="text-brand-400 font-bold">{GLOBAL.DEV_NAME}</span>
          </div>

          {/* Centered copyright */}
          <div className="text-xs text-zinc-400">
            © {currentYear} {GLOBAL.BRAND_NAME}{GLOBAL.BRAND_DOMAIN}. All rights reserved.
          </div>

          {/* Social icons + scroll top */}
          <div className="flex items-center gap-2">
            {SOCIALS.filter(s => s.name !== 'Email Direct').map((social) => (
              <a
                key={social.name}
                id={`footer-link-${social.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg text-zinc-400 transition-colors ${social.color}`}
                aria-label={social.name}
              >
                {/* Clone the icon to enforce small size in footer */}
                <div className="w-4 h-4 [&>svg]:w-4 [&>svg]:h-4">
                  {social.icon}
                </div>
              </a>
            ))}
            
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
