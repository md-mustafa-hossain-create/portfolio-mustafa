import PropTypes from 'prop-types';
import ScrollReveal from '@/shared/components/ui/ScrollReveal';

/**
 * @fileoverview Reusable Section Header component.
 * Provides a compact, product-style heading for each section.
 */

/**
 * @typedef {Object} SectionHeaderProps
 * @property {string} tag - The top small pill text category.
 * @property {string} titlePrefix - Regular portion of the h2 title.
 * @property {string} titleHighlight - Green highlighted portion of the h2 title.
 * @property {string} [subtitle] - Paragraph detail text underneath the divider.
 */

/**
 * SectionHeader component.
 * @param {SectionHeaderProps} props
 * @returns {React.ReactElement}
 */
export default function SectionHeader({ tag, titlePrefix, titleHighlight, subtitle }) {
  return (
    <ScrollReveal animation="up" className="text-left mb-12 sm:mb-16 border-b border-zinc-800 pb-5">
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-brand-400 font-sans font-semibold mb-3 whitespace-nowrap">
        <span className="w-2 h-2 bg-brand-400 inline-block shrink-0" aria-hidden="true"></span>
        <span>{tag}</span>
      </div>
      <h2 className="font-display uppercase text-3xl sm:text-4xl md:text-5xl font-bold text-white">
        {titlePrefix} <span className="text-brand-400">{titleHighlight}</span>
      </h2>
      <div className="w-16 h-1 bg-brand-500 mt-5"></div>
      {subtitle && (
        <p className="text-xs sm:text-sm text-zinc-400 mt-5 max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}

SectionHeader.propTypes = {
  tag: PropTypes.string.isRequired,
  titlePrefix: PropTypes.string.isRequired,
  titleHighlight: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
