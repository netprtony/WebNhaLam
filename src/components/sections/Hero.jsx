import { motion } from 'framer-motion';
import BrandLogo from '../ui/BrandLogo';

export default function Hero() {
  const isOpen = (() => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 10 && hour < 23;
  })();

  return (
    <section className="relative min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background image with Ken Burns effect */}
      <div className="absolute inset-0">
        <img
          src="/images/KhongGian/khonggianquan.png"
          alt="Không gian Dốc Mơ Quán"
          className="w-full h-full object-cover animate-ken-burns filter brightness-75 contrast-110"
        />
        {/* Street Dark Olive gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-deep via-brand-bg/75 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center">
        {/* Brand Logo Lockup */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <BrandLogo variant="hero" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-retro font-extrabold text-3xl sm:text-5xl md:text-6xl text-brand-cream mt-6 leading-tight uppercase tracking-tight text-shadow-street"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          HƯƠNG VỊ SUM VẦY
          <span className="block font-black text-brand-cream-light text-2xl sm:text-4xl md:text-5xl tracking-normal mt-1">
            ĐẬM VỊ MỒI NGON
          </span>
        </motion.h1>

        {/* Street Sub-headline */}
        <motion.p
          className="text-brand-cream/80 text-sm sm:text-base md:text-lg mt-3 max-w-2xl mx-auto font-medium leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Bàn nhậu phố xá, mồi bén bia lạnh, nồi lẩu nghi ngút khói — nơi anh em bạn bè nâng ly quây quần sau giờ làm.
        </motion.p>

        {/* Open status badge - Street neon board */}
        <motion.div
          className="inline-flex items-center gap-2.5 mt-6 px-4 py-2 rounded bg-brand-bg-deep/90 border border-brand-cream/40 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isOpen ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]' : 'bg-rose-500'
            }`}
          />
          <span className="font-stencil text-xs sm:text-sm font-bold tracking-wider text-brand-cream uppercase">
            {isOpen ? '🟢 ĐÈN SÁNG ĐÓN KHÁCH' : '🔴 TẠM NGHỈ'} • 10:00 – 23:00 HẰNG NGÀY
          </span>
        </motion.div>

        {/* Street CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 w-full max-w-md sm:max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="tel:0984586248"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded bg-brand-cream text-brand-bg font-retro font-black text-sm uppercase tracking-wider shadow-xl hover:bg-brand-cream-light hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-brand-cream"
          >
            <span>🍻</span>
            <span>GỌI BÀN LÊN MỒI NGAY</span>
          </a>
          <button
            onClick={() => {
              document.getElementById('thuc-don')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded border-2 border-brand-cream/60 text-brand-cream font-stencil font-bold text-sm uppercase tracking-wider hover:bg-brand-cream/15 hover:border-brand-cream transition-all duration-300 active:scale-95"
          >
            <span>📋</span>
            <span>XEM BẢNG MỒI ↓</span>
          </button>
        </motion.div>

        {/* Street Address Quick Pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 flex items-center gap-2 text-xs text-brand-cream/60 font-stencil tracking-wider"
        >
          <span>📍</span>
          <span>22 Đ. NGUYỄN ẢNH THỦ, BÀ ĐIỂM, HÓC MÔN</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button
          onClick={() => {
            document.getElementById('khuyen-mai')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-brand-cream/40 hover:text-brand-cream transition-colors p-2"
          aria-label="Cuộn xuống"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
