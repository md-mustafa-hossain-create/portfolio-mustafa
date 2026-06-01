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
  const baseClasses = "glass rounded-3xl relative overflow-hidden transition-spring";
  const hoverClasses = hoverEffect 
    ? "hover:border-brand-500/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)] hover:-translate-y-1 hover:scale-[1.01] cursor-default" 
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
