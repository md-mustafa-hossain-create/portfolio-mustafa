import { Mail } from 'lucide-react';
import { CONTACT_STRINGS } from '../constants/strings';
import SectionHeader from './ui/SectionHeader';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';

/**
 * @fileoverview Main Contact section component.
 * Adheres strictly to SRP by delegating form logic and info rendering to sub-components.
 */

export default function Contact() {
  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-terminal-mesh-contact border-t border-zinc-900">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Extracted Section Header */}
        <SectionHeader 
          tag={CONTACT_STRINGS.SECTION_TAG}
          icon={<Mail />}
          titlePrefix={CONTACT_STRINGS.SECTION_TITLE_PREFIX}
          titleHighlight={CONTACT_STRINGS.SECTION_TITLE_HIGHLIGHT}
          subtitle={CONTACT_STRINGS.SUBTITLE}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
          
          {/* Info Side (Socials & Direct Contact) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <ContactInfo />
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}
