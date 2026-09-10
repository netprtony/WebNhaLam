import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DishDetailModal({ isOpen, onClose, dish }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!dish) return null;

  const isSpecial = dish.name?.includes('***');
  const cleanName = dish.name?.replace(/\*\*\*/g, '').trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-brand-bg-deep border-2 border-brand-cream/35 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col text-brand-cream"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-bg-deep/80 hover:bg-brand-cream hover:text-brand-bg text-brand-cream flex items-center justify-center text-base font-bold transition-all border border-brand-cream/30 backdrop-blur-md"
              aria-label="Đóng"
            >
              ✕
            </button>

            {/* Dish Image */}
            <div className="relative w-full h-64 sm:h-72 shrink-0 bg-brand-bg overflow-hidden">
              <img
                src={dish.image}
                alt={cleanName}
                className="w-full h-full object-cover filter brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-deep via-transparent to-black/30" />

              {/* Badges on Image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  {dish.badge && (
                    <span className="px-2.5 py-0.5 rounded font-stencil text-xs font-black uppercase bg-brand-cream text-brand-bg shadow-md border border-brand-cream">
                      {dish.badge}
                    </span>
                  )}
                  {isSpecial && (
                    <span className="px-2.5 py-0.5 rounded font-stencil text-xs font-black uppercase bg-brand-cream text-brand-bg shadow-md border border-brand-cream flex items-center gap-1">
                      <span>🔥</span> MỒI BẾP TRƯỞNG KHUYÊN DÙNG
                    </span>
                  )}
                  {dish.category && (
                    <span className="px-2.5 py-0.5 rounded font-stencil text-[11px] font-bold text-brand-cream bg-brand-bg-deep/90 border border-brand-cream/40 uppercase">
                      {dish.category} {dish.section ? `• ${dish.section}` : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Dish Info Content */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col justify-between">
              <div>
                {/* Title & Price */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-retro text-2xl sm:text-3xl font-black text-brand-cream uppercase tracking-tight leading-snug">
                      {cleanName}
                    </h3>
                    <p className="font-stencil text-xs text-brand-cream/70 uppercase tracking-wider mt-1 font-bold">
                      DỐC MƠ QUÁN • 22 Đ. NGUYỄN ẢNH THỦ, HÓC MÔN
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="font-retro text-2xl sm:text-3xl font-black text-brand-cream tracking-tight">
                      {dish.price}
                    </span>
                  </div>
                </div>

                {/* Street Separator */}
                <div className="flex items-center gap-2 my-4">
                  <span className="w-12 h-1 bg-brand-cream/40 rounded-full" />
                  <span className="w-1.5 h-1.5 rotate-45 bg-brand-cream" />
                </div>

                {/* Description */}
                <div className="bg-brand-bg rounded-xl p-4 border border-brand-cream/20">
                  <h4 className="font-stencil text-[11px] uppercase tracking-widest font-black text-brand-cream/80 mb-1.5">
                    HƯƠNG VỊ & CHẾ BIẾN
                  </h4>
                  <p className="text-brand-cream/80 text-xs sm:text-sm leading-relaxed font-medium">
                    {dish.description ||
                      'Món ăn được chế biến từ nguyên liệu tươi ngon mỗi ngày, hòa quyện cùng gia vị đậm đà truyền thống đặc trưng của Dốc Mơ Quán.'}
                  </p>
                </div>

                {/* Features / Highlights */}
                <div className="grid grid-cols-2 gap-2.5 mt-3.5">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-brand-bg/60 border border-brand-cream/15 font-stencil text-xs text-brand-cream/80 font-bold uppercase">
                    <span className="text-sm">🥬</span>
                    <span>NGUYÊN LIỆU TƯƠI MỚI</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-brand-bg/60 border border-brand-cream/15 font-stencil text-xs text-brand-cream/80 font-bold uppercase">
                    <span className="text-sm">♨️</span>
                    <span>PHỤC VỤ NÓNG HỔI</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-brand-cream/20 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:0984586248"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded bg-brand-cream text-brand-bg font-retro font-black text-xs uppercase tracking-wider hover:bg-brand-cream-light transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-95 border border-brand-cream"
                >
                  <span>☎</span> GỌI ĐẶT MÓN: 0984 586 248
                </a>
                <a
                  href="https://zalo.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded border border-brand-cream text-brand-cream font-stencil font-bold text-xs uppercase tracking-wider hover:bg-brand-cream/15 transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-95"
                >
                  <span>💬</span> NHẮN ZALO ĐẶT BÀN
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
