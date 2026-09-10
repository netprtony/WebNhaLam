'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreBill, formatCurrency } from '../../context/PreBillContext';

export default function PreBillDrawer({ onProceedBooking }) {
  const {
    items,
    updateQuantity,
    removeItem,
    clearBill,
    totalQuantity,
    totalPrice,
    isDrawerOpen,
    closeDrawer,
  } = usePreBill();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-charcoal-light h-full shadow-2xl flex flex-col border-l border-amber-500/20 z-10 font-body"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-charcoal">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧾</span>
                <div>
                  <h3 className="font-headline text-xl text-amber-400 uppercase tracking-wide">
                    Tạm Tính Hóa Đơn
                  </h3>
                  <p className="text-xs text-gray-400">
                    {totalQuantity > 0 ? `${totalQuantity} món đã chọn` : 'Chưa có món nào'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeDrawer}
                className="w-8 h-8 rounded-full bg-charcoal-surface flex items-center justify-center text-gray-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* List of items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
                  <span className="text-5xl mb-3">🥘</span>
                  <p className="text-white font-bold text-base mb-1">Thực đơn tạm tính đang trống</p>
                  <p className="text-xs text-gray-400 max-w-xs">
                    Hãy bấm "+ Chọn" hoặc xem chi tiết các món trong mục Thực Đơn để tính trước chi phí bữa tiệc nhé!
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 p-3 bg-charcoal rounded-xl border border-white/5 shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg bg-charcoal-mid flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-bold truncate">{item.name}</h4>
                      <p className="text-amber-400 text-xs font-semibold mt-0.5">
                        {item.rawPrice} {item.priceNum > 0 && `(${formatCurrency(item.priceNum)})`}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-charcoal-surface rounded-lg p-1 border border-white/5">
                      <button
                        onClick={() => updateQuantity(item.name, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-300 hover:bg-amber-500 hover:text-charcoal font-bold transition text-xs"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.name, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-300 hover:bg-amber-500 hover:text-charcoal font-bold transition text-xs"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.name)}
                      className="text-gray-500 hover:text-red-400 p-1 transition"
                      title="Xóa món"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer summary */}
            {items.length > 0 && (
              <div className="p-5 border-t border-white/10 bg-charcoal space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Số lượng món:</span>
                    <span className="font-semibold text-white">{totalQuantity} phần</span>
                  </div>
                  <div className="flex justify-between text-base font-bold">
                    <span className="text-white">Tổng tạm tính:</span>
                    <span className="text-amber-400 font-headline text-xl">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 italic">
                    * Giá tạm tính chưa bao gồm ưu đãi giảm 10% khi đặt bàn trước.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={clearBill}
                    className="px-3 py-3 rounded-xl bg-charcoal-surface text-gray-400 hover:text-red-400 text-xs font-bold transition"
                  >
                    Xóa hết
                  </button>
                  <button
                    onClick={() => {
                      closeDrawer();
                      onProceedBooking?.();
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-chiliRed to-amber-500 text-white font-bold text-sm shadow-glow-amber hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2"
                  >
                    <span>🍖</span>
                    <span>Đặt bàn kèm thực đơn này →</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
