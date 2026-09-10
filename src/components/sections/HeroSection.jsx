'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingParticle from '../ui/FloatingParticle';

// Danh sách các món chủ đạo thay đổi ngẫu nhiên ở giữa Hero
const HERO_DISHES = [
  {
    id: 'goibo',
    name: 'Gỏi Bắp Bò Tái Chanh',
    badge: '⭐ Gỏi Bắp Bò Tái Chanh',
    image: '/images/image_rvbg/goibo.png',
    price: '75K',
    tag: 'Best Seller',
    description: 'Bắp bò tái chanh chua ngọt, giòn sần sật, thơm mè rang',
  },
  {
    id: 'tomsotthai',
    name: 'Tôm Sốt Thái Chua Cay',
    badge: '🌶️ Tôm Sốt Thái Chua Cay',
    image: '/images/image_rvbg/tomsotthai.png',
    price: '99K',
    tag: 'Cay Nồng Bén Lửa',
    description: 'Tôm sú tươi giòn xốt Thái chua cay chuẩn vị',
  },
  {
    id: 'lau',
    name: 'Lẩu Đặc Biệt Dốc Mơ Quán',
    badge: '🍲 Lẩu Nghi Ngút Bốc Khói',
    image: '/images/foods/lau.png',
    price: '199K',
    tag: 'Món Trùm Của Quán',
    description: 'Thịt bò Mỹ, viên chiên, rau tươi và nước dùng đậm đà',
  },
  {
    id: 'muc',
    name: 'Mực Đại Dương Nướng Than',
    badge: '🍢 Mực Đại Dương Nướng',
    image: '/images/image_rvbg/muc.png',
    price: '89K',
    tag: 'Bắt Bia Cực Đã',
    description: 'Mực nướng than hồng thơm phức, chấm muối ớt xanh',
  },
  {
    id: 'chagio',
    name: 'Chả Giò Rế Giòn Rụm',
    badge: '🔥 Chả Giò Rế Vàng Giòn',
    image: '/images/image_rvbg/chagio.png',
    price: '55K',
    tag: 'Lai Rai Đậm Vị',
    description: 'Nhân tôm thịt đậm đà, vỏ rế giòn rụm tan trong miệng',
  },
  {
    id: 'boluclac',
    name: 'Bò Lúc Lắc Cháy Tỏi',
    badge: '🥩 Bò Lúc Lắc Cháy Tỏi',
    image: '/images/foods/boluclac.png',
    price: '119K',
    tag: 'Mồi Nhậu Bén',
    description: 'Bò mềm xào ớt chuông, hành tây sốt tiêu đen đậm đà',
  },
];

const HeroSection = ({ onBooking }) => {
  const containerRef = useRef(null);

  // Món ăn chủ đạo được chọn ngẫu nhiên
  const [currentDishIndex, setCurrentDishIndex] = useState(0);

  // Hiệu ứng di chuột mạnh mẽ
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [moveY, setMoveY] = useState(0);

  // Khởi tạo ngẫu nhiên món ăn khi vào trang + tự động đổi món sau mỗi 7 giây
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * HERO_DISHES.length);
    setCurrentDishIndex(randomIndex);

    const interval = setInterval(() => {
      setCurrentDishIndex((prev) => (prev + 1) % HERO_DISHES.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleNextDish = () => {
    setCurrentDishIndex((prev) => (prev + 1) % HERO_DISHES.length);
  };

  // Di chuyển chuột với góc xoay và độ dịch chuyển mạnh mẽ hơn
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Góc nghiêng mạnh: ±18deg
    const rotateXValue = ((y - centerY) / centerY) * -18;
    const rotateYValue = ((x - centerX) / centerX) * 18;

    // Tọa độ dịch chuyển theo con trỏ chuột: ±24px
    const moveXValue = ((x - centerX) / centerX) * 24;
    const moveYValue = ((y - centerY) / centerY) * 24;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    setMoveX(moveXValue);
    setMoveY(moveYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setMoveX(0);
    setMoveY(0);
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

  const currentDish = HERO_DISHES[currentDishIndex];

  // Lấy các món vệ tinh khác với món đang hiển thị ở giữa
  const satelliteDishes = HERO_DISHES.filter((_, idx) => idx !== currentDishIndex);

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

            {/* Main dish mobile with animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDish.id}
                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <img
                  src={currentDish.image}
                  alt={currentDish.name}
                  className="w-full h-auto object-contain cutout-shadow drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                />
                <div className="mt-2 text-center">
                  <span className="inline-block bg-charcoal-light/95 border border-amber-500/60 px-3 py-1 rounded-full text-xs text-amber-300 font-bold shadow-lg">
                    {currentDish.badge} • <span className="text-white">{currentDish.price}</span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile quick shuffle button */}
            <button
              onClick={handleNextDish}
              className="absolute -top-3 left-1/2 -translate-x-1/2 z-25 bg-charcoal-mid border border-amber-500/40 text-amber-300 hover:text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-md flex items-center gap-1 active:scale-95 transition"
            >
              <span>🎲</span>
              <span>Đổi món khác</span>
            </button>

            {/* Floating Mini Cutout Dish 1 */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 w-24 h-24 z-20"
            >
              <img
                src={satelliteDishes[0]?.image}
                alt={satelliteDishes[0]?.name}
                className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
              />
            </motion.div>

            {/* Floating Mini Cutout Dish 2 */}
            <motion.div
              animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-3 w-24 h-24 z-20"
            >
              <img
                src={satelliteDishes[1]?.image}
                alt={satelliteDishes[1]?.name}
                className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
              />
            </motion.div>
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
        <div className="hidden md:flex w-1/2 relative justify-center items-center h-[660px]">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-full flex items-center justify-center cursor-pointer"
            style={{ perspective: 1200 }}
          >
            {/* Background Ambient Glow Flare */}
            <div className="absolute inset-0 bg-amber-500/25 rounded-full blur-[110px] scale-150 opacity-60 z-0 pointer-events-none" />
            <div className="absolute inset-6 border border-amber-500/15 rounded-full animate-pulse pointer-events-none" />

            {/* Quick shuffle button on desktop */}
            <button
              onClick={handleNextDish}
              title="Bấm để đổi món ăn khác"
              className="absolute top-2 right-12 z-30 bg-charcoal-light/90 hover:bg-amber-500 text-amber-300 hover:text-charcoal border border-amber-500/40 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>🎲</span>
              <span>Đổi món khác</span>
            </button>

            {/* MAIN DISH (Reactive 3D Tilt + Dynamic Translation) */}
            <motion.div
              animate={{
                rotateX,
                rotateY,
                x: moveX,
                y: moveY,
                scale: 1.05,
              }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                mass: 0.5,
              }}
              className="relative z-20 w-[80%] max-w-[450px]"
              onClick={handleNextDish}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDish.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.08, rotate: 6 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="relative group cursor-pointer"
                >
                  <img
                    src={currentDish.image}
                    alt={currentDish.name}
                    className="w-full h-auto object-contain cutout-shadow pointer-events-none filter drop-shadow-[0_28px_40px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-charcoal-light/95 border border-amber-500/60 px-4 py-2 rounded-full text-xs md:text-sm text-amber-300 font-bold whitespace-nowrap shadow-2xl flex items-center gap-2">
                    <span>{currentDish.badge}</span>
                    <span className="text-white bg-chiliRed px-2 py-0.5 rounded-full text-xs font-black">
                      {currentDish.price}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* SATELLITE DISH 1: Parallax offset in opposite direction (Top Right) */}
            <motion.div
              animate={{
                y: [0, -14, 0],
                rotate: [0, 5, 0],
                x: -moveX * 0.5,
              }}
              transition={{
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                x: { type: 'spring', stiffness: 100, damping: 20 },
              }}
              className="absolute top-[8%] right-[2%] w-44 h-44 z-25 group cursor-pointer"
              onClick={handleNextDish}
            >
              <img
                src={satelliteDishes[0]?.image}
                alt={satelliteDishes[0]?.name}
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.75)] group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -bottom-1 right-2 bg-chiliRed text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(232,69,44,0.6)] border border-white/20 whitespace-nowrap">
                {satelliteDishes[0]?.badge}
              </div>
            </motion.div>

            {/* SATELLITE DISH 2: Parallax offset (Bottom Left) */}
            <motion.div
              animate={{
                y: [0, 12, 0],
                rotate: [0, -4, 0],
                x: -moveX * 0.4,
              }}
              transition={{
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                x: { type: 'spring', stiffness: 100, damping: 20 },
              }}
              className="absolute bottom-[6%] left-[0%] w-44 h-44 z-25 group cursor-pointer"
              onClick={handleNextDish}
            >
              <img
                src={satelliteDishes[1]?.image}
                alt={satelliteDishes[1]?.name}
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.75)] group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -bottom-1 left-2 bg-amber text-charcoal text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(245,166,35,0.6)] border border-amber-300 whitespace-nowrap">
                {satelliteDishes[1]?.badge}
              </div>
            </motion.div>

            {/* SATELLITE DISH 3: Top Left */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, -3, 0],
                x: -moveX * 0.3,
              }}
              transition={{
                y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 },
                rotate: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 },
                x: { type: 'spring', stiffness: 100, damping: 20 },
              }}
              className="absolute top-[10%] left-[4%] w-36 h-36 z-15 group cursor-pointer"
              onClick={handleNextDish}
            >
              <img
                src={satelliteDishes[2]?.image}
                alt={satelliteDishes[2]?.name}
                className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -bottom-1 left-1 bg-charcoal-light/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/40 shadow whitespace-nowrap">
                {satelliteDishes[2]?.badge}
              </div>
            </motion.div>

            {/* STREET NIGHT-MARKET STICKERS & BADGES */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-[40%] right-[-2%] z-30 bg-gradient-to-r from-amber-500 to-amber-600 text-charcoal font-headline tracking-wider text-xs font-bold px-3 py-1.5 rounded-md shadow-lg rotate-6 border border-amber-300"
            >
              🍻 BIA TUYẾT LẠNH TÊ
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute bottom-[20%] right-[3%] z-30 bg-charcoal-light/95 text-green-400 font-bold text-xs px-3 py-1 rounded-full border border-green-500/40 shadow-lg -rotate-3 flex items-center gap-1"
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
