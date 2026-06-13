import { Mail, MapPin } from 'lucide-react';
import { SOCIALS } from '@/constants/data';
import { CONTACT_STRINGS, GLOBAL } from '@/constants/strings';
import ScrollReveal from '@/shared/components/ui/ScrollReveal';

/**
 * @fileoverview Renders the social links and direct contact information.
 */

export default function ContactInfo() {
  return (
    <ScrollReveal animation="up" delay={0.1} className="space-y-8 text-left">
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-zinc-100">
          {CONTACT_STRINGS.HEADING}
        </h3>

        {/* Direct Card info */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-4 text-zinc-300">
            <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <Mail className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <span className="text-xs text-zinc-400 font-sans font-semibold block">EMAIL ME</span>
              <a
                href={`mailto:${GLOBAL.DEV_EMAIL}`}
                className="text-sm font-semibold hover:text-brand-400 transition-colors"
              >
                {GLOBAL.DEV_EMAIL}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 text-zinc-300">
            <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <MapPin className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <span className="text-xs text-zinc-400 font-sans font-semibold block">MY LOCATION</span>
              <span className="text-sm font-semibold">
                {GLOBAL.DEV_LOCATION}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Grid */}
      <div className="space-y-4 pt-6">
        <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-400">
          {CONTACT_STRINGS.FIND_ME}
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {SOCIALS.map((social) => (
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
    </ScrollReveal>
  );
}
