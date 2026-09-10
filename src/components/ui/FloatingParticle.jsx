'use client';

import { motion } from 'framer-motion';

export default function FloatingParticle({ emoji = '🌶️', size = 24, delay = 0, duration = 6, className = '' }) {
  return (
    <motion.div
      className={`absolute pointer-events-none blur-[0.5px] ${className}`}
      style={{ fontSize: size }}
      animate={{ 
        y: [0, -15, 0], 
        rotate: [0, 5, -5, 0], 
        opacity: [0.6, 0.85, 0.6] 
      }}
      transition={{ 
        duration, 
        delay, 
        repeat: Infinity, 
        ease: 'easeInOut' 
      }}
    >
      {emoji}
    </motion.div>
  );
}
