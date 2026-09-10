'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreBill, formatCurrency } from '../../context/PreBillContext';

export default function PreBillFloatingBar({ onProceedBooking }) {
  const { totalQuantity, totalPrice, openDrawer } = usePreBill();

  if (totalQuantity === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-16 md:bottom-6 left-4 right-4 md:left-auto md:right-24 z-40 max-w-md mx-auto md:mx-0 font-body"
      >
        <div className="bg-charcoal/95 backdrop-blur-md border border-amber-500/50 rounded-2xl p-3 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-between gap-3">
          <button
            onClick={openDrawer}
            className="flex items-center gap-3 text-left hover:opacity-90 transition cursor-pointer"
          >
            <div className="relative">
              <span className="text-2xl sm:text-3xl">🧾</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-chiliRed text-white text-[11px] font-black rounded-full flex items-center justify-center border border-charcoal animate-pulse">
                {totalQuantity}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider">
                Tạm tính ({totalQuantity} món)
              </span>
              <span className="text-amber-400 font-headline text-lg sm:text-xl font-bold">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={openDrawer}
              className="px-3 py-2 bg-charcoal-surface hover:bg-charcoal-mid text-gray-300 text-xs font-bold rounded-xl border border-white/10 transition"
            >
              Xem bill
            </button>
            <button
              onClick={onProceedBooking}
              className="px-4 py-2 bg-gradient-to-r from-chiliRed to-amber-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-glow-amber hover:brightness-110 active:scale-95 transition whitespace-nowrap flex items-center gap-1.5"
            >
              <span>🍖</span>
              <span>Đặt bàn giữ món</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
