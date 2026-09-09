import { motion } from 'framer-motion';

export default function Hero() {
  const isOpen = (() => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 10 && hour < 23;
  })();

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image with Ken Burns effect */}
      <div className="absolute inset-0">
        <img
          src="/images/KhongGian/khonggianquan.png"
          alt="Dốc Mơ không gian"
          className="w-full h-full object-cover animate-ken-burns"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <motion.img
          src="/images/Logo/main_logo-removebg-preview.webp"
          alt="Dốc Mơ Logo"
          className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Headline */}
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-cream leading-tight text-shadow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hương Vị Sum Vầy
        </motion.h1>

        <motion.p
          className="font-display text-2xl sm:text-3xl md:text-4xl text-brand-bamboo mt-2 text-shadow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Đậm Vị Mồi Ngon
        </motion.p>

        <motion.p
          className="text-brand-cream/70 text-base sm:text-lg mt-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Nơi gia đình quây quần, bạn bè nâng ly — mỗi món ăn là một câu chuyện quê nhà.
        </motion.p>

        {/* Open status badge */}
        <motion.div
          className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-brand-bamboo/20 backdrop-blur-sm border border-brand-bamboo/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'
            }`}
          />
          <span className="text-brand-cream text-sm font-medium">
            {isOpen ? 'Đang mở cửa' : 'Đã đóng cửa'} · 10:00 – 23:00
          </span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a
            href="tel:0984586248"
            className="group flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-clay text-white font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            🍽️ Đặt Bàn Ngay
          </a>
          <button
            onClick={() => {
              document.getElementById('thuc-don')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-brand-cream/40 text-brand-cream font-medium hover:bg-brand-cream/10 transition-all duration-300"
          >
            Xem Thực Đơn ↓
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button
          onClick={() => {
            document.getElementById('mon-ngon')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-brand-cream/60 hover:text-brand-cream transition-colors"
          aria-label="Cuộn xuống"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
