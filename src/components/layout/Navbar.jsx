'use client';

import { useState, useEffect } from 'react';

export default function Navbar({ onBooking }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Thực Đơn', href: '#thuc-don' },
    { label: 'Đặc Sản', href: '#dac-san' },
    { label: 'Không Gian', href: '#khong-gian' },
    { label: 'Ưu Đãi', href: '#khuyen-mai' },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-[#1A1714]/80 ${scrolled ? 'shadow-[0_4px_20px_rgba(245,158,11,0.1)] border-b border-amber-500/20' : 'border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#hero" className="flex items-center cursor-pointer">
              <div className="w-10 h-10 rounded-full ring-2 ring-amber-500/50 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] overflow-hidden bg-white">
                <img src="/images/Logo/main_logo-removebg-preview.png" alt="Dốc Mơ Logo" className="w-full h-full object-cover" />
              </div>
              <span className="ml-3 font-headline font-bold text-amber-400 text-xl tracking-wider uppercase">DỐC MƠ</span>
            </a>
            
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-gray-300 hover:text-amber-400 transition cursor-pointer relative group font-body">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full group-active:w-full shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                </a>
              ))}
            </div>
            
            <div className="hidden md:flex items-center">
              <button onClick={onBooking} className="bg-gradient-to-r from-[#E8452C] to-amber-500 text-white font-bold px-4 py-2 rounded-full animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_15px_rgba(245,158,11,0.5)] font-body hover:scale-105 transition-transform cursor-pointer">
                ĐẶT BÀN NGAY
              </button>
            </div>
            
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileOpen(true)} className="text-gray-300 hover:text-white focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-[#1A1714]/95 backdrop-blur-lg z-50 flex flex-col pt-20 px-6">
          <button onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col space-y-6 text-center mt-10">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-gray-300 hover:text-amber-400 font-body">
                {link.label}
              </a>
            ))}
            <button onClick={() => { setMobileOpen(false); onBooking?.(); }} className="mt-8 bg-gradient-to-r from-[#E8452C] to-amber-500 text-white font-bold px-6 py-3 rounded-full text-lg animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] font-body cursor-pointer">
              ĐẶT BÀN NGAY
            </button>
          </div>
        </div>
      )}
    </>
  );
}
