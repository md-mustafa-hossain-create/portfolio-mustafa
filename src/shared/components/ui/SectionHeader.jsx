import PropTypes from 'prop-types';
import ScrollReveal from '@/shared/components/ui/ScrollReveal';

/**
 * @fileoverview Reusable Section Header component.
 * Extracts the duplicated layout for section titles (pill, title, underline, subtitle).
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
    <ScrollReveal animation="up" className="text-center mb-20">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider text-brand-400 font-sans font-semibold mb-3 whitespace-nowrap">
        <span>{tag}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter">
        {titlePrefix} <span className="text-brand-400">{titleHighlight}</span>
      </h2>
      <div className="w-16 h-1 bg-brand-500 mx-auto mt-4 rounded-full"></div>
      {subtitle && (
        <p className="text-xs sm:text-sm text-zinc-400 mt-5 max-w-md mx-auto leading-relaxed">
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
