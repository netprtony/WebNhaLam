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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-lg transition-colors backdrop-blur-md"
              aria-label="Đóng"
            >
              ✕
            </button>

            {/* Dish Image */}
            <div className="relative w-full h-64 sm:h-72 shrink-0 bg-brand-cream overflow-hidden">
              <img
                src={dish.image}
                alt={cleanName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Badges on Image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  {dish.badge && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-red-500 shadow-md">
                      {dish.badge}
                    </span>
                  )}
                  {isSpecial && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-brand-clay shadow-md flex items-center gap-1">
                      <span>🔥</span> Món Bếp Trưởng Khuyên Dùng
                    </span>
                  )}
                  {dish.category && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-brand-olive/90 backdrop-blur-sm">
                      {dish.category} {dish.section ? `• ${dish.section}` : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Dish Info Content */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col justify-between">
              <div>
                {/* Title & Price */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-charcoal leading-snug">
                      {cleanName}
                    </h3>
                    <p className="text-xs text-brand-olive font-medium mt-1">
                      Quán Dốc Mơ — 22 Đ. Nguyễn Ảnh Thủ, Hóc Môn
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-brand-clay">
                      {dish.price}
                    </span>
                  </div>
                </div>

                {/* Separator */}
                <div className="w-12 h-1 bg-brand-bamboo rounded-full my-4" />

                {/* Description */}
                <div className="bg-brand-cream/40 rounded-2xl p-4 border border-brand-cream-dark/40">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-brand-charcoal/60 mb-1.5">
                    Mô tả hương vị
                  </h4>
                  <p className="text-brand-charcoal/80 text-sm leading-relaxed">
                    {dish.description ||
                      'Món ăn được chế biến từ nguyên liệu tươi ngon mỗi ngày, hòa quyện cùng gia vị đậm đà truyền thống đặc trưng của Dốc Mơ.'}
                  </p>
                </div>

                {/* Features / Highlights */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-brand-cream/30 border border-brand-cream-dark/30 text-xs text-brand-charcoal/70">
                    <span className="text-base">🥬</span>
                    <span>Nguyên liệu tươi mới</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-brand-cream/30 border border-brand-cream-dark/30 text-xs text-brand-charcoal/70">
                    <span className="text-base">🔥</span>
                    <span>Phục vụ nóng hổi</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-brand-cream-dark flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:0984586248"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-brand-clay text-white font-semibold text-sm hover:bg-brand-clay-dark transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  <span>📞</span> Gọi Đặt Món: 0984 586 248
                </a>
                <a
                  href="https://zalo.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-zalo text-white font-semibold text-sm hover:bg-blue-700 transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  <span>💬</span> Nhắn Zalo Đặt Bàn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
