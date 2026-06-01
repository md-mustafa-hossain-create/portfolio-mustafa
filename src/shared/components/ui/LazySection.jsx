import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @fileoverview LazySection wraps a component and defers its mounting/rendering
 * until it is close to the viewport. This prevents premature loading of lazy-loaded
 * chunks and associated network fetches (like Firestore database connections).
 */

/**
 * @typedef {Object} LazySectionProps
 * @property {React.ReactNode} children - The actual section components to render once intersected.
 * @property {React.ReactNode} placeholder - Fallback indicator or spacer while section is offscreen.
 * @property {string} [rootMargin] - Visual threshold margin for the observer before triggering.
 */

/**
 * LazySection component.
 * @param {LazySectionProps} props
 * @returns {React.ReactElement}
 */
export default function LazySection({ children, placeholder, rootMargin = '150px' }) {
  const [isIntersected, setIsIntersected] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // If already intersected, no need to keep observing
    if (isIntersected) return;

    // Set up standard intersection observer with safe passive behaviors
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
        }
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [isIntersected, rootMargin]);

  return (
    <div ref={containerRef} className="w-full">
      {isIntersected ? children : placeholder}
    </div>
  );
}

LazySection.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.node,
  rootMargin: PropTypes.string,
};
