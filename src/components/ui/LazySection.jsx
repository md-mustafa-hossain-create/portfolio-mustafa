import { useEffect, useRef, useState } from 'react';

/**
 * @fileoverview LazySection wraps a component and defers its mounting/rendering
 * until it is close to the viewport. This prevents premature loading of lazy-loaded
 * chunks and associated network fetches (like Firestore database connections).
 */
export default function LazySection({ children, placeholder, rootMargin = '150px' }) {
  const [isIntersected, setIsIntersected] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // If already intersected, no need to keep observing
    if (isIntersected) return;

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
