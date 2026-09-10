'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreBill, formatCurrency, parsePrice } from '../../context/PreBillContext';

export default function DishDetailModal({ isOpen, onClose, dish, onProceedBooking }) {
  const { addItem, updateQuantity, items, openDrawer } = usePreBill();
  const [addedNotice, setAddedNotice] = useState(false);

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
  const cleanName = dish.name?.replace(/\s*\*\*\*\s*/g, '').trim();
  const priceNum = parsePrice(dish.price);

  const cartItem = items.find((i) => i.name === cleanName);
  const currentQty = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addItem({ ...dish, name: cleanName });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-body">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-charcoal-light border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 max-h-[92vh] flex flex-col text-gray-200"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-charcoal/80 hover:bg-amber-500 hover:text-charcoal text-white flex items-center justify-center text-sm font-bold transition-all border border-white/10 backdrop-blur-md"
              aria-label="Đóng"
            >
              ✕
            </button>

            {/* Dish Image */}
            <div className="relative w-full h-64 sm:h-72 shrink-0 bg-charcoal overflow-hidden group">
              <img
                src={dish.image}
                alt={cleanName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-light via-transparent to-transparent opacity-90" />

              {isSpecial && (
                <div className="absolute top-4 left-4 bg-amber-500 text-charcoal font-bold text-xs px-3 py-1 rounded-full shadow-lg border border-amber-300 flex items-center gap-1">
                  <span>⭐</span>
                  <span>Món Bếp Trưởng Khuyên Dùng</span>
                </div>
              )}

              {dish.section_name && (
                <div className="absolute bottom-3 left-4 text-xs font-semibold text-amber-400 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm border border-amber-500/30 uppercase tracking-wider">
                  {dish.section_name}
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-headline text-2xl sm:text-3xl text-white tracking-wide">
                    {cleanName}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                    {dish.description || 'Món nhậu đặc sắc, nguyên liệu tươi mới mỗi ngày, chế biến đậm đà chuẩn vị Dốc Mơ Quán.'}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-headline text-2xl sm:text-3xl text-amber-400 tracking-wide block">
                    {dish.price}
                  </span>
                  {priceNum > 0 && (
                    <span className="text-xs text-gray-500 block">
                      {formatCurrency(priceNum)}
                    </span>
                  )}
                </div>
              </div>

              {/* Notice when added */}
              {addedNotice && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/30 text-green-400 px-3.5 py-2 rounded-xl text-xs flex items-center justify-between"
                >
                  <span>✓ Đã thêm vào danh sách tạm tính!</span>
                  <button onClick={openDrawer} className="underline font-bold text-amber-400 hover:text-white ml-2">
                    Xem bill ngay
                  </button>
                </motion.div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-5 border-t border-white/10 bg-charcoal flex flex-col sm:flex-row gap-3 items-center">
              {currentQty > 0 ? (
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start bg-charcoal-surface border border-white/10 px-3 py-2 rounded-2xl">
                  <button
                    onClick={() => updateQuantity(cleanName, -1)}
                    className="w-8 h-8 rounded-xl bg-charcoal-light hover:bg-amber-500 hover:text-charcoal text-white font-bold transition flex items-center justify-center text-sm"
                  >
                    -
                  </button>
                  <span className="font-bold text-amber-400 text-sm px-2">
                    {currentQty} phần trong bill
                  </span>
                  <button
                    onClick={() => updateQuantity(cleanName, 1)}
                    className="w-8 h-8 rounded-xl bg-charcoal-light hover:bg-amber-500 hover:text-charcoal text-white font-bold transition flex items-center justify-center text-sm"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAdd}
                  className="w-full sm:w-auto flex-1 py-3 px-5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-charcoal font-bold text-sm transition shadow-glow-amber active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>+</span>
                  <span>Thêm vào tạm tính</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (currentQty === 0) addItem({ ...dish, name: cleanName });
                  onClose();
                  onProceedBooking?.();
                }}
                className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-gradient-to-r from-chiliRed to-amber-500 hover:brightness-110 text-white font-bold text-sm transition shadow-glow-amber active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>🍖</span>
                <span>Đặt bàn giữ món này</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
