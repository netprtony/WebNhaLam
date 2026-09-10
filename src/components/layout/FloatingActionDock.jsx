import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export default function FloatingActionDock() {
  const { scrollDirection, scrollY } = useScrollDirection();
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const isVisible = scrollY < 200 || scrollDirection === 'up';

  return (
    <>
      {/* Mobile dock - Street bar */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-40 md:hidden select-none"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="bg-brand-bg-deep/95 backdrop-blur-md border-t-2 border-brand-cream/30 shadow-[0_-8px_25px_rgba(0,0,0,0.5)]">
              <div className="grid grid-cols-3 gap-0">
                <a
                  href="tel:0984586248"
                  className="flex flex-col items-center justify-center py-2.5 gap-1 text-brand-cream active:scale-95 transition-transform"
                >
                  <span className="text-xl">☎</span>
                  <span className="font-stencil text-[10px] font-bold uppercase tracking-wider">Gọi Quán</span>
                </a>
                <a
                  href="tel:0984586248"
                  className="flex flex-col items-center justify-center py-1 gap-1 active:scale-95 transition-transform"
                >
                  <span className="text-xl bg-brand-cream text-brand-bg w-12 h-12 rounded-full flex items-center justify-center -mt-6 shadow-2xl border-2 border-brand-bg-deep animate-pulse-slow font-black">
                    🍻
                  </span>
                  <span className="font-stencil text-[10px] font-black text-brand-cream uppercase tracking-wider">Đặt Bàn</span>
                </a>
                <a
                  href="https://zalo.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-2.5 gap-1 text-brand-cream active:scale-95 transition-transform"
                >
                  <span className="text-xl">💬</span>
                  <span className="font-stencil text-[10px] font-bold uppercase tracking-wider">Zalo Chat</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop floating button */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40 select-none">
        <div className="relative">
          <AnimatePresence>
            {isDesktopOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute bottom-16 right-0 flex flex-col gap-2.5 mb-2"
              >
                <a
                  href="tel:0984586248"
                  className="flex items-center gap-2 px-5 py-3 rounded bg-brand-cream shadow-2xl text-brand-bg font-retro font-black text-xs uppercase tracking-wider hover:bg-brand-cream-light hover:scale-105 transition-all whitespace-nowrap border border-brand-cream"
                >
                  <span>☎</span>
                  <span>Gọi Bàn: 0984 586 248</span>
                </a>
                <a
                  href="https://zalo.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded bg-brand-bg-deep border-2 border-brand-cream shadow-2xl text-brand-cream font-stencil font-bold text-xs uppercase tracking-wider hover:bg-brand-cream hover:text-brand-bg hover:scale-105 transition-all whitespace-nowrap"
                >
                  <span>💬</span>
                  <span>Chat Zalo Quán</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDesktopOpen(!isDesktopOpen)}
            className="w-14 h-14 rounded-full bg-brand-cream text-brand-bg shadow-2xl flex items-center justify-center text-2xl border-2 border-brand-bg-deep hover:bg-brand-cream-light transition-colors"
            aria-label="Menu liên hệ nhanh"
          >
            {isDesktopOpen ? '✕' : '🍻'}
          </motion.button>
        </div>
      </div>
    </>
  );
}
