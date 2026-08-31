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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 max-w-5xl mx-auto items-stretch">
        
        {/* Info Side (Socials & Direct Contact) */}
        <ScrollReveal animation="left" className="md:col-span-1 lg:col-span-5 flex flex-col justify-between">
          <ContactInfo />
        </ScrollReveal>

        {/* Form Side */}
        <ScrollReveal animation="right" delay={0.15} className="md:col-span-1 lg:col-span-7">
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
      data-bg="#000000"
      data-surface="rgba(45, 45, 45, 0.48)"
      data-text="#f5f5f5"
      data-accent="#2CFF05"
      data-border="rgba(255, 255, 255, 0.10)"
      className="portfolio-section min-h-[90vh] flex flex-col justify-center py-20 relative overflow-hidden border-t border-zinc-900/50"
    >
      <SectionErrorBoundary sectionName="Contact Section">
        <ContactSectionContent />
      </SectionErrorBoundary>
    </section>
  );
}
