import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * @fileoverview Micro-glassmorphism floating card primitive with an animation loop.
 */
export default function FloatingCard({
  icon,
  title,
  value,
  className = '',
  delay = 0,
  yOffset = 8
}) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: [yOffset, -yOffset, yOffset],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        delay: delay
      }}
      className={`absolute glass p-3 sm:p-4 rounded-2xl flex items-center gap-3 shadow-lg select-none backdrop-blur-xl border border-white/8 z-20 ${className}`}
    >
      <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 shrink-0">
        {icon}
      </div>
      <div className="text-left font-sans">
        <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider leading-none">
          {title}
        </span>
        <span className="block text-xs sm:text-sm font-extrabold text-white mt-1 leading-none">
          {value}
        </span>
      </div>
    </motion.div>
  );
}

FloatingCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  yOffset: PropTypes.number,
};
