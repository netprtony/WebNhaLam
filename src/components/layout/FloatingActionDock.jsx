import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export default function FloatingActionDock() {
  const { scrollDirection, scrollY } = useScrollDirection();
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const isVisible = scrollY < 200 || scrollDirection === 'up';

  return (
    <>
      {/* Mobile dock */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="bg-white/95 backdrop-blur-md border-t border-brand-cream-dark shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
              <div className="grid grid-cols-3 gap-0">
                <a
                  href="tel:0984586248"
                  className="flex flex-col items-center justify-center py-3 gap-1 text-brand-clay active:scale-95 transition-transform"
                >
                  <span className="text-xl">📞</span>
                  <span className="text-[10px] font-semibold">Gọi Ngay</span>
                </a>
                <a
                  href="https://zalo.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-3 gap-1 text-zalo active:scale-95 transition-transform"
                >
                  <span className="text-xl">💬</span>
                  <span className="text-[10px] font-semibold">Zalo Chat</span>
                </a>
                <a
                  href="tel:0984586248"
                  className="flex flex-col items-center justify-center py-3 gap-1 active:scale-95 transition-transform"
                >
                  <span className="text-xl bg-brand-olive text-white w-10 h-10 rounded-full flex items-center justify-center -mt-5 shadow-lg animate-pulse-slow">
                    🍽️
                  </span>
                  <span className="text-[10px] font-semibold text-brand-olive">Đặt Bàn</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop floating button */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <div className="relative">
          <AnimatePresence>
            {isDesktopOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute bottom-16 right-0 flex flex-col gap-2 mb-2"
              >
                <a
                  href="tel:0984586248"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white shadow-lg text-brand-clay font-medium text-sm hover:scale-105 transition-transform whitespace-nowrap"
                >
                  📞 Gọi Ngay
                </a>
                <a
                  href="https://zalo.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zalo text-white font-medium text-sm hover:scale-105 transition-transform whitespace-nowrap"
                >
                  💬 Chat Zalo
                </a>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDesktopOpen(!isDesktopOpen)}
            className="w-14 h-14 rounded-full bg-brand-olive text-white shadow-xl flex items-center justify-center text-2xl hover:bg-brand-olive-dark transition-colors"
          >
            {isDesktopOpen ? '✕' : '🍽️'}
          </motion.button>
        </div>
      </div>
    </>
  );
}
