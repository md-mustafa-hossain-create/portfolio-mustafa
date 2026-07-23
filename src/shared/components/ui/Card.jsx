import React from 'react';
import PropTypes from 'prop-types';

/**
 * @fileoverview Reusable design-system-compliant Card component.
 * Supports glassmorphism layout classes, borders, hover spring effects,
 * and unified layout padding tokens.
 */

export default function Card({
  children,
  variant = 'glass',
  padding = 'md',
  hoverEffect = true,
  className = '',
  onClick,
  ...props
}) {
  const baseClasses = 'relative rounded-[1.5rem] overflow-hidden transition-spring w-full';

  // Variant design tokens
  const variants = {
    // Glassmorphism: semi-transparent, blur background, white border inset
    glass: 'glass',
    // Solid: solid dark card background
    solid: 'bg-zinc-900/90 border border-zinc-800/80 shadow-lg',
    // Borderless: fully transparent card
    transparent: 'bg-transparent border border-transparent shadow-none',
  };

  // Consistent padding tokens
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  // Hover transitions
  const interactiveClasses = onClick || hoverEffect
    ? 'hover:border-border-hover hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),_0_0_24px_rgba(16,185,129,0.06)] cursor-pointer'
    : 'cursor-default';

  // Safe keyboard focus style if interactive
  const focusClasses = onClick
    ? 'focus:outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2'
    : '';

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      className={`${baseClasses} ${variants[variant]} ${paddings[padding]} ${interactiveClasses} ${focusClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['glass', 'solid', 'transparent']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  hoverEffect: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
