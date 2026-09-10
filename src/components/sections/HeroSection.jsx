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

    // Max rotation of ±7deg
    const rotateXValue = ((y - centerY) / centerY) * -7;
    const rotateYValue = ((x - centerX) / centerX) * 7;

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
        staggerChildren: 0.12,
      },
    },
  };

  const textVariants = {
    hidden: { y: 40, opacity: 0, skewY: 3 },
    visible: { y: 0, opacity: 1, skewY: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const scrollToMenu = () => {
    const el = document.getElementById('thuc-don');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center bg-charcoal pt-24 pb-16 md:py-0">
      {/* Background ambient radial lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 w-full flex flex-col md:flex-row items-center relative z-10">
        
        {/* ================= MOBILE: Hero Stage ================= */}
        <div className="w-full md:hidden relative mb-12 mt-4">
          <div className="relative w-[90%] max-w-[340px] mx-auto">
            {/* Center glow */}
            <div className="absolute inset-0 bg-amber-500/25 rounded-full blur-[70px] scale-125 pointer-events-none" />

            {/* Main dish */}
            <img
              src="/images/image_rvbg/goibo.png"
              alt="Gỏi Bò Dốc Mơ Quán"
              className="w-full h-auto object-contain cutout-shadow relative z-10"
            />

            {/* Floating Mini Cutout Dish 1: Tôm Sốt Thái */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-4 w-28 h-28 z-20"
            >
              <img
                src="/images/image_rvbg/tomsotthai.png"
                alt="Tôm Sốt Thái"
                className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              />
              <span className="absolute -bottom-1 right-0 text-[10px] bg-chiliRed text-white font-bold px-2 py-0.5 rounded-full shadow border border-white/20 whitespace-nowrap">
                🌶️ Tôm Sốt Thái
              </span>
            </motion.div>

            {/* Floating Mini Cutout Dish 2: Chả Giò Giòn Rụm */}
            <motion.div
              animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -left-3 w-28 h-28 z-20"
            >
              <img
                src="/images/image_rvbg/chagio.png"
                alt="Chả Giò"
                className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              />
              <span className="absolute -top-1 left-0 text-[10px] bg-amber-500 text-charcoal font-bold px-2 py-0.5 rounded-full shadow border border-amber-300 whitespace-nowrap">
                🔥 Chả Giò Rế
              </span>
            </motion.div>

            {/* Mobile sticker tag */}
            <div className="absolute top-2 left-0 z-20 bg-charcoal-light/90 border border-amber-500/40 px-2.5 py-1 rounded-full text-[11px] text-amber-300 font-bold shadow-lg flex items-center gap-1 -rotate-6">
              <span>🍻 100+ Mồi Bén</span>
            </div>
          </div>
        </div>

        {/* ================= LEFT COLUMN: Typography & CTAs ================= */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          {/* Tagline sticker */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full w-max mb-5 shadow-[0_0_15px_rgba(245,166,35,0.2)]"
          >
            <span className="text-amber-400 text-sm">🏮</span>
            <span className="text-xs md:text-sm font-bold tracking-widest text-amber-300 uppercase">
              DỐC MƠ QUÁN • ĂN HẾT MÌNH, UỐNG NHIỆT TÌNH
            </span>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.h1 variants={textVariants} className="font-headline text-5xl md:text-7xl text-white leading-[1.05] uppercase">
              MỒI BÉN
            </motion.h1>
            <motion.h1 variants={textVariants} className="font-headline text-5xl md:text-7xl text-white leading-[1.05] uppercase">
              BẠN HIỀN
            </motion.h1>
            <motion.h1 variants={textVariants} className="font-headline text-5xl md:text-7xl text-amber-400 leading-[1.05] uppercase mt-2 drop-shadow-[0_0_25px_rgba(245,166,35,0.4)]">
              VUI HẾT NẮC
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-gray-300 text-base md:text-xl mt-6 font-body max-w-lg leading-relaxed"
          >
            Quán nhậu gia đình đúng chất — mồi ngon bén lửa, bia lạnh tê tái, không khí ấm cúng tưng bừng mỗi tối tại Hóc Môn.
          </motion.p>

          {/* Quick value badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-2.5 mt-5 text-xs text-gray-400"
          >
            <span className="bg-charcoal-light border border-white/10 px-2.5 py-1 rounded-md text-gray-300 flex items-center gap-1">
              ✨ Không gian sân vườn & Phòng VIP
            </span>
            <span className="bg-charcoal-light border border-white/10 px-2.5 py-1 rounded-md text-gray-300 flex items-center gap-1">
              🎤 Có Karaoke tiệc tùng
            </span>
            <span className="bg-charcoal-light border border-white/10 px-2.5 py-1 rounded-md text-gray-300 flex items-center gap-1">
              🚗 Đỗ ô tô rộng rãi
            </span>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-wrap gap-4 mt-8 items-center"
          >
            <button
              onClick={onBooking}
              className="bg-gradient-to-r from-chiliRed to-amber-500 text-white rounded-full px-8 py-4 font-bold animate-glow-pulse shadow-glow-amber transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm md:text-base cursor-pointer flex items-center gap-2"
            >
              <span>🍖</span>
              <span>ĐẶT BÀN NGAY</span>
            </button>
            <button
              onClick={scrollToMenu}
              className="border-2 border-amber-500/50 text-amber-400 rounded-full px-8 py-4 font-bold hover:bg-amber-500/10 transition-colors uppercase tracking-wider text-sm md:text-base cursor-pointer flex items-center gap-2"
            >
              <span>📜</span>
              <span>XEM THỰC ĐƠN</span>
            </button>
          </motion.div>

          {/* Opening Hours status badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-6 inline-block"
          >
            <div className="flex items-center gap-2 border border-green-500/40 bg-green-500/10 rounded-full px-4 py-2 w-max shadow-[0_0_15px_rgba(74,222,128,0.15)]">
              <span className="text-xs md:text-sm text-green-400 font-semibold tracking-wide">
                🟢 Mở cửa đón khách · 16:00 – 23:00 mỗi ngày
              </span>
            </div>
          </motion.div>
        </div>

        {/* ================= RIGHT COLUMN (Desktop 3D Stage) ================= */}
        <div className="hidden md:flex w-1/2 relative justify-center items-center h-[640px]">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-full flex items-center justify-center cursor-pointer"
            style={{ perspective: 1200 }}
          >
            {/* Background Ambient Glow Flare */}
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-[110px] scale-150 opacity-60 z-0 pointer-events-none" />
            <div className="absolute inset-10 border border-amber-500/10 rounded-full animate-pulse pointer-events-none" />

            {/* MAIN DISH: Gỏi Bò Tái Chanh (tilt reactive) */}
            <motion.div
              animate={{ rotateX, rotateY }}
              transition={{ type: 'spring', stiffness: 120, damping: 25, mass: 0.5 }}
              className="relative z-10 w-[78%] max-w-[440px]"
            >
              <img
                src="/images/image_rvbg/goibo.png"
                alt="Gỏi Bắp Bò Dốc Mơ Quán"
                className="w-full h-auto object-contain cutout-shadow pointer-events-none filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-charcoal-light/90 border border-amber-500/50 px-4 py-1.5 rounded-full text-xs text-amber-300 font-bold whitespace-nowrap shadow-xl">
                ⭐ Gỏi Bắp Bò Tái Chanh
              </div>
            </motion.div>

            {/* SATELLITE DISH 1: Tôm Sốt Thái (Top Right) */}
            <motion.div
              animate={{
                y: [0, -14, 0],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[8%] right-[2%] w-44 h-44 z-20 group"
            >
              <img
                src="/images/image_rvbg/tomsotthai.png"
                alt="Tôm Sốt Thái"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -bottom-1 right-2 bg-chiliRed text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_12px_rgba(232,69,44,0.6)] border border-white/20 whitespace-nowrap">
                🌶️ Tôm Sốt Thái
              </div>
            </motion.div>

            {/* SATELLITE DISH 2: Chả Giò Rế (Bottom Left) */}
            <motion.div
              animate={{
                y: [0, 12, 0],
                rotate: [0, -4, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-[6%] left-[0%] w-44 h-44 z-20 group"
            >
              <img
                src="/images/image_rvbg/chagio.png"
                alt="Chả Giò Rế"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -bottom-1 left-2 bg-amber text-charcoal text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_12px_rgba(245,166,35,0.6)] border border-amber-300 whitespace-nowrap">
                🔥 Chả Giò Giòn Rụm
              </div>
            </motion.div>

            {/* SATELLITE DISH 3: Mực Nướng Than (Top Left) */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, -3, 0],
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-[12%] left-[4%] w-36 h-36 z-15 group"
            >
              <img
                src="/images/image_rvbg/muc.png"
                alt="Mực Nướng Than"
                className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -bottom-1 left-1 bg-charcoal-light/90 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/40 shadow whitespace-nowrap">
                🍢 Mực Nướng Than
              </div>
            </motion.div>

            {/* STREET NIGHT-MARKET STICKERS & BADGES */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-[42%] right-[-2%] z-25 bg-gradient-to-r from-amber-500 to-amber-600 text-charcoal font-headline tracking-wider text-xs font-bold px-3 py-1.5 rounded-md shadow-lg rotate-6 border border-amber-300"
            >
              🍻 BIA TUYẾT LẠNH TÊ
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute bottom-[22%] right-[4%] z-25 bg-charcoal-light/95 text-green-400 font-bold text-xs px-3 py-1 rounded-full border border-green-500/40 shadow-lg -rotate-3 flex items-center gap-1"
            >
              <span>🎉</span>
              <span>GIẢM 10% ĐẶT BÀN</span>
            </motion.div>

            {/* Ambient Floating Particles */}
            <div className="absolute inset-0 pointer-events-none z-30">
              <div className="absolute top-[6%] left-[30%]">
                <FloatingParticle delay={0} size={28}>🌶️</FloatingParticle>
              </div>
              <div className="absolute bottom-[16%] right-[28%]">
                <FloatingParticle delay={1.5} size={26}>🍋</FloatingParticle>
              </div>
              <div className="absolute top-[32%] right-[18%]">
                <FloatingParticle delay={3} size={24}>♨️</FloatingParticle>
              </div>
              <div className="absolute bottom-[35%] left-[16%]">
                <FloatingParticle delay={4.2} size={26}>🧄</FloatingParticle>
              </div>
              <div className="absolute top-[18%] right-[38%]">
                <FloatingParticle delay={2.5} size={22}>🏮</FloatingParticle>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
