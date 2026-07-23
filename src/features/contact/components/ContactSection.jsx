import { Mail } from 'lucide-react';
import { CONTACT_STRINGS } from '@/constants/strings';
import SectionHeader from '@/shared/components/ui/SectionHeader';
import SectionErrorBoundary from '@/shared/components/ui/SectionErrorBoundary';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import ScrollReveal from '@/shared/components/ui/ScrollReveal';

/**
 * @fileoverview Main Contact section component.
 * Adheres strictly to SRP by delegating form logic and info rendering to sub-components.
 */

function ContactSectionContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Extracted Section Header */}
      <SectionHeader 
        tag={CONTACT_STRINGS.SECTION_TAG}
        icon={<Mail />}
        titlePrefix={CONTACT_STRINGS.SECTION_TITLE_PREFIX}
        titleHighlight={CONTACT_STRINGS.SECTION_TITLE_HIGHLIGHT}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
        
        {/* Info Side (Socials & Direct Contact) */}
        <ScrollReveal animation="left" className="lg:col-span-5 flex flex-col justify-between">
          <ContactInfo />
        </ScrollReveal>

        {/* Form Side */}
        <ScrollReveal animation="right" delay={0.15} className="lg:col-span-7">
          <ContactForm />
        </ScrollReveal>

      </div>
    </div>
  );
}

export default function ContactSection() {
  return (
    <section 
      id="contact" 
      data-bg="#04120c"
      data-surface="rgba(10, 36, 24, 0.7)"
      data-text="#f4f4f5"
      data-accent="#10b981"
      data-border="rgba(16, 185, 129, 0.2)"
      className="portfolio-section min-h-[90vh] flex flex-col justify-center py-20 relative overflow-hidden border-t border-zinc-900/50"
    >
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-500/5 blur-[120px] pointer-events-none"></div>

      <SectionErrorBoundary sectionName="Contact Section">
        <ContactSectionContent />
      </SectionErrorBoundary>
    </section>
  );
}
