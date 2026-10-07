import PropTypes from 'prop-types';

/**
 * @fileoverview Reusable Glassmorphism Card Primitive.
 * Enforces unified hover physics, border radii, and shadows across the entire design system.
 */

/**
 * @typedef {Object} GlassCardProps
 * @property {React.ReactNode} children - Component children to render inside the card.
 * @property {string} [className] - Optional custom CSS classes.
 * @property {boolean} [hoverEffect] - Whether to apply transition-spring hover animations.
 */

/**
 * GlassCard presentational component.
 * @param {GlassCardProps} props
 * @returns {React.ReactElement}
 */
export default function GlassCard({ children, className = '', hoverEffect = true }) {
  // tracking current hover transition logic to prevent sudden layout thrashing
  const baseClasses = "glass rounded-md relative overflow-hidden transition-colors duration-200";
  const hoverClasses = hoverEffect 
    ? "hover:border-zinc-700 hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)] hover:-translate-y-0.5 cursor-default"
    : "";
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}

GlassCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hoverEffect: PropTypes.bool,
};
