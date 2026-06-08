import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const variants = {
  up: {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  left: {
    hidden: { opacity: 0, x: -50, filter: 'blur(8px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  right: {
    hidden: { opacity: 0, x: 50, filter: 'blur(8px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
};

/**
 * ScrollReveal replaces the vanilla CSS observer with highly polished
 * Framer Motion spring physics animations commonly found on 21st.dev.
 */
export default function ScrollReveal({ 
  children, 
  animation = 'up', 
  delay = 0, 
  className = '', 
  as = 'div', 
  once = true,
  margin = '-8% 0px -8% 0px' 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });
  const MotionComponent = motion[as] || motion.div;

  const springTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    mass: 1,
    delay: delay,
  };

  const selectedVariant = variants[animation] || variants.up;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: selectedVariant.hidden,
        visible: {
          ...selectedVariant.visible,
          transition: springTransition,
        },
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
