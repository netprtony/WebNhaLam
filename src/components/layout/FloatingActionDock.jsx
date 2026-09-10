'use client';

import { useState, useEffect } from 'react';

export default function FloatingActionDock({ onBooking }) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setShow(false);
        } else {
          setShow(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => window.removeEventListener('scroll', controlNavbar);
    }
  }, [lastScrollY]);

  return (
    <>
      {/* Mobile Bottom Dock */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1A1714]/90 backdrop-blur-md border-t border-amber-500/20 shadow-[0_-5px_20px_rgba(245,158,11,0.1)] transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex justify-around items-center p-3 font-body">
          <a href="tel:0984586248" className="flex flex-col items-center text-gray-300 active:scale-95 transition-transform">
            <span className="text-xl mb-1">📞</span>
            <span className="text-xs">Gọi Ngay</span>
          </a>
          <a href="https://maps.google.com/?q=22+Nguyễn+Ảnh+Thủ+Bà+Điểm+Hóc+Môn" target="_blank" rel="noreferrer" className="flex flex-col items-center text-gray-300 active:scale-95 transition-transform">
            <span className="text-xl mb-1">📍</span>
            <span className="text-xs">Chỉ Đường</span>
          </a>
          <button onClick={onBooking} className="flex flex-col items-center bg-gradient-to-r from-[#E8452C] to-amber-500 text-white px-4 py-2 rounded-full animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] active:scale-95 transition-transform cursor-pointer">
            <span className="text-sm font-bold flex items-center gap-1">🍖 Đặt Bàn</span>
          </button>
        </div>
      </div>
      
      {/* Desktop Floating Button */}
      <button onClick={onBooking} title="Đặt bàn nhanh" className="hidden md:flex fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#E8452C] items-center justify-center text-2xl animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_15px_rgba(232,69,44,0.6)] hover:scale-110 transition-transform cursor-pointer">
        🍖
      </button>
    </>
  );
}
