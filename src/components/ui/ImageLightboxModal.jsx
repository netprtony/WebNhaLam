'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageLightboxModal({ isOpen, onClose, imageSrc, caption, title }) {
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

  if (!imageSrc) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 font-body">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative z-10 max-w-4xl max-h-[92vh] flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 sm:-right-2 z-20 w-10 h-10 rounded-full bg-charcoal-light/80 hover:bg-amber-500 hover:text-charcoal text-white flex items-center justify-center text-lg font-bold transition border border-white/20 shadow-xl"
              aria-label="Đóng"
            >
              ✕
            </button>

            {/* Image display */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-[78vh] flex items-center justify-center bg-charcoal">
              <img
                src={imageSrc}
                alt={caption || title || 'Hình ảnh phóng to'}
                className="max-h-[78vh] w-auto max-w-full object-contain rounded-2xl"
              />
            </div>

            {/* Caption / Title */}
            {(caption || title) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center bg-charcoal-light/95 border border-amber-500/30 px-5 py-2.5 rounded-full shadow-lg max-w-lg"
              >
                {title && <h4 className="font-headline text-lg text-amber-400 uppercase">{title}</h4>}
                {caption && <p className="text-sm text-gray-300 mt-0.5">{caption}</p>}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
