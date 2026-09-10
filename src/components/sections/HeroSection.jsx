'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingParticle from '../ui/FloatingParticle';

const HeroSection = ({ onBooking }) => {
  const containerRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation of ±8deg
    const rotateXValue = ((y - centerY) / centerY) * -8;
    const rotateYValue = ((x - centerX) / centerX) * 8;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const textVariants = {
    hidden: { y: 40, opacity: 0, skewY: 3 },
    visible: { y: 0, opacity: 1, skewY: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const scrollToMenu = () => {
    const el = document.getElementById('thuc-don');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center bg-charcoal pt-24 pb-12 md:py-0">
      <div className="container mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center relative z-10">
        
        {/* Mobile: Image first */}
        <div className="w-full md:hidden relative mb-12">
          <div className="relative w-[80%] mx-auto">
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-[100px] scale-150 opacity-50"></div>
            <img 
              src="/images/image_rvbg/goibo.png" 
              alt="Gỏi Bò" 
              className="w-full h-auto object-contain cutout-shadow relative z-10"
            />
          </div>
        </div>

        {/* LEFT column */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.h1 variants={textVariants} className="font-headline text-5xl md:text-7xl text-white leading-tight uppercase">
              MỒI BÉN
            </motion.h1>
            <motion.h1 variants={textVariants} className="font-headline text-5xl md:text-7xl text-white leading-tight uppercase">
              BẠN HIỀN
            </motion.h1>
            <motion.h1 variants={textVariants} className="font-headline text-5xl md:text-7xl text-amber-400 leading-tight uppercase mt-2">
              VUI HẾT NẮC
            </motion.h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-gray-400 text-lg md:text-xl mt-6 font-body max-w-lg"
          >
            Quán nhậu gia đình đúng chất — mồi ngon, bia lạnh, không khí tưng bừng mỗi tối.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <button onClick={onBooking} className="bg-gradient-to-r from-chiliRed to-amber-500 text-white rounded-full px-8 py-4 font-bold animate-glow-pulse shadow-glow-amber transition-transform hover:scale-105 uppercase tracking-wide text-sm md:text-base cursor-pointer">
              ĐẶT BÀN NGAY
            </button>
            <button onClick={scrollToMenu} className="border-2 border-amber-500/50 text-amber-400 rounded-full px-8 py-4 font-bold hover:bg-amber-500/10 transition-colors uppercase tracking-wide text-sm md:text-base cursor-pointer">
              XEM THỰC ĐƠN
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-8 inline-block"
          >
            <div className="flex items-center gap-2 border border-green-500/30 bg-green-500/10 rounded-full px-4 py-2 w-max">
              <span className="text-xs md:text-sm text-green-400 font-medium tracking-wide">🟢 Đang mở cửa · 10:00 – 23:00</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT column - Desktop */}
        <div className="hidden md:flex w-1/2 relative justify-center items-center h-[600px]">
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-full flex items-center justify-center cursor-pointer"
            style={{ perspective: 1000 }}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-[100px] scale-150 opacity-50 z-0"></div>
            
            {/* Image with 3D rotation */}
            <motion.div
              animate={{ rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 100, damping: 30, mass: 0.5 }}
              className="relative z-10 w-[90%]"
            >
              <img 
                src="/images/image_rvbg/goibo.png" 
                alt="Gỏi Bò" 
                className="w-full h-auto object-contain cutout-shadow pointer-events-none"
              />
            </motion.div>

            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none z-20">
              <div className="absolute top-[15%] left-[10%]">
                <FloatingParticle delay={0}>🌶️</FloatingParticle>
              </div>
              <div className="absolute bottom-[20%] right-[10%]">
                <FloatingParticle delay={2}>🍋</FloatingParticle>
              </div>
              <div className="absolute top-[25%] right-[15%]">
                <FloatingParticle delay={4}>💨</FloatingParticle>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
