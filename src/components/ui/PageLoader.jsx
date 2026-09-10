'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Khoảng thời gian chạy từ 0% đến 100% trong ~1.5 giây
    const duration = 1500;
    const intervalTime = 25;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step + (Math.random() * 2);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
          return 100;
        }
        return Math.floor(next);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#1A1714] flex flex-col items-center justify-center font-body select-none overflow-hidden"
        >
          {/* Background Ambient Radial Glow */}
          <div className="absolute w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute w-80 h-80 bg-chiliRed/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            
            {/* SVG Logo chuyển động từ logo_loading.html */}
            <div className="relative mb-6 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 500 500"
                className="w-36 h-36 sm:w-44 sm:h-44 logo-loader overflow-visible filter drop-shadow-[0_4px_20px_rgba(245,166,35,0.45)]"
              >
                <defs>
                  {/* Gradient chuyển động quét sáng (Shimmer) */}
                  <linearGradient id="shimmer-grad-loader" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5A623" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#FFF2E2" stopOpacity="1" />
                    <stop offset="100%" stopColor="#F5A623" stopOpacity="0.7" />
                    <animate attributeName="x1" from="-100%" to="200%" dur="2.2s" repeatCount="indefinite" />
                    <animate attributeName="x2" from="0%" to="300%" dur="2.2s" repeatCount="indefinite" />
                  </linearGradient>
                </defs>

                <g className="pulse-group-loader">
                  {/* Khung viền hình học */}
                  <path
                    className="foliage-layer-loader"
                    fillRule="evenodd"
                    d="M 95 45 H 205 V 65 H 115 V 405 H 215 V 455 H 95 Z M 305 45 H 415 V 275 H 395 V 65 H 305 Z M 395 385 H 415 V 455 H 285 V 405 H 395 Z"
                  />

                  {/* Thân và cành chính (Cedar Trunk) */}
                  <path
                    className="foliage-layer-loader"
                    d="M 245 455 V 360 C 200 360 110 375 60 365 C 50 363 50 348 65 348 C 120 348 210 342 245 320 C 210 300 135 305 125 295 C 120 290 125 282 140 282 C 185 282 230 268 245 250 C 230 238 180 240 170 230 C 165 224 172 218 185 218 C 215 218 240 208 245 190 C 235 178 205 178 200 170 C 197 165 204 158 215 158 C 235 158 248 145 248 120 C 240 115 220 118 215 105 C 215 95 230 92 242 85 C 230 75 230 45 250 30 C 270 45 270 75 258 85 C 270 92 285 95 285 105 C 280 118 260 115 252 120 C 252 145 265 158 285 158 C 296 158 303 165 300 170 C 295 178 265 178 255 190 C 260 208 285 218 315 218 C 328 218 335 224 330 230 C 320 240 270 238 255 250 C 270 268 315 282 360 282 C 375 282 380 290 375 295 C 365 305 290 300 255 320 C 290 342 380 348 435 348 C 450 348 450 363 440 365 C 390 375 300 360 255 360 V 455 Z"
                  />

                  {/* Tán lá nổi */}
                  <path className="foliage-layer-loader floating-leaf-loader" d="M 210 135 Q 250 125 290 135 Q 250 145 210 135 Z" />
                  <path className="foliage-layer-loader floating-leaf-reverse-loader" d="M 195 172 Q 250 162 305 172 Q 250 182 195 172 Z" />
                  <path className="foliage-layer-loader floating-leaf-loader" d="M 170 205 Q 220 195 240 205 Q 220 215 170 205 Z" />
                  <path className="foliage-layer-loader floating-leaf-reverse-loader" d="M 295 198 Q 330 190 338 200 Q 320 212 295 198 Z" />
                  <path className="foliage-layer-loader floating-leaf-loader" d="M 150 242 Q 230 232 245 242 Q 210 255 150 242 Z" />
                  <path className="foliage-layer-loader floating-leaf-reverse-loader" d="M 275 242 Q 330 230 365 245 Q 310 258 275 242 Z" />
                  <path className="foliage-layer-loader floating-leaf-loader" d="M 130 282 Q 190 270 215 285 Q 170 295 130 282 Z" />
                  <path className="foliage-layer-loader floating-leaf-reverse-loader" d="M 335 285 Q 395 272 415 290 Q 370 300 335 285 Z" />
                  <path className="foliage-layer-loader floating-leaf-loader" d="M 105 328 Q 165 315 195 330 Q 155 342 105 328 Z" />
                  <path className="foliage-layer-loader floating-leaf-reverse-loader" d="M 320 335 Q 380 320 425 338 Q 360 350 320 335 Z" />
                  <ellipse className="foliage-layer-loader floating-leaf-loader" cx="140" cy="410" rx="22" ry="7" />
                  <ellipse className="foliage-layer-loader floating-leaf-reverse-loader" cx="195" cy="395" rx="16" ry="6" />
                  <ellipse className="foliage-layer-loader floating-leaf-loader" cx="295" cy="385" rx="20" ry="7" />
                  <path className="foliage-layer-loader floating-leaf-reverse-loader" d="M 320 395 Q 380 388 420 400 Q 370 410 320 395 Z" />
                </g>
              </svg>
            </div>

            {/* Tên thương hiệu */}
            <h2 className="font-headline text-3xl sm:text-4xl text-amber-400 tracking-wider uppercase mb-1 drop-shadow-[0_0_15px_rgba(245,166,35,0.5)]">
              DỐC MƠ QUÁN
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm tracking-widest uppercase font-semibold mb-6">
              Ăn Hết Mình • Uống Nhiệt Tình
            </p>

            {/* Thanh tiến trình % (Loading Progress Bar) */}
            <div className="w-56 sm:w-64 h-1.5 bg-charcoal-surface rounded-full overflow-hidden border border-white/10 relative mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-chiliRed via-amber-500 to-neonYellow rounded-full shadow-[0_0_10px_rgba(245,166,35,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Số hiển thị phần trăm (%) */}
            <div className="flex items-center gap-1">
              <span className="font-headline text-2xl sm:text-3xl text-white tracking-wider">
                {progress}
              </span>
              <span className="font-headline text-lg text-amber-400 font-bold">%</span>
            </div>

            {/* Thông báo trạng thái nhỏ */}
            <p className="text-[11px] text-gray-500 mt-2 italic">
              Đang chuẩn bị mồi bén & bia lạnh...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
