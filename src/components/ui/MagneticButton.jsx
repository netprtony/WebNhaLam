'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, onClick, href, className = '', variant = 'primary' }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2; 
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "font-bold uppercase tracking-wide px-6 py-3 rounded-full transition-colors inline-flex items-center justify-center cursor-pointer font-body";
  const variants = {
    primary: "bg-gradient-to-r from-[#E8452C] to-amber-500 text-white animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_15px_rgba(245,158,11,0.4)]",
    secondary: "bg-transparent border-2 border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
