import { useEffect } from 'react';

/**
 * Custom hook that manages IntersectionObserver and MutationObserver 
 * to handle scroll reveal animations globally.
 * Extracted from App.jsx for architectural cleanliness.
 */
export function useRevealObserver() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -8% 0px', // Trigger slightly before the element fully enters the view
      threshold: 0.05,
    };

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeNewElements = (rootElement) => {
      const reveals = rootElement.querySelectorAll('.reveal');
      reveals.forEach((el) => {
        if (!el.classList.contains('revealed')) {
          const rect = el.getBoundingClientRect();
          // If the element is already above the viewport (user scrolled past it before it loaded)
          // mark it as revealed immediately to prevent it from getting stuck invisible.
          if (rect.bottom < 0) {
            el.classList.add('revealed');
          } else {
            intersectionObserver.observe(el);
          }
        }
      });
    };

    // Initial check
    observeNewElements(document.body);

    // MutationObserver to capture elements loaded dynamically (like projects or skills from Firestore)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // ELEMENT_NODE
            if (node.classList.contains('reveal')) {
              const rect = node.getBoundingClientRect();
              if (rect.bottom < 0) {
                node.classList.add('revealed');
              } else {
                intersectionObserver.observe(node);
              }
            }
            observeNewElements(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
