import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '../../hooks/useScrollSpy';

const navLinks = [
  { id: 'khuyen-mai', label: 'Khuyến Mãi' },
  { id: 'mon-ngon', label: 'Món Ngon' },
  { id: 'thuc-don', label: 'Thực Đơn' },
  { id: 'khong-gian', label: 'Không Gian' },
  { id: 'danh-gia', label: 'Đánh Giá' },
  { id: 'vi-tri', label: 'Vị Trí' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeId = useScrollSpy(navLinks.map((l) => l.id), 120);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group"
            >
              <img
                src="/images/Logo/main_logo-removebg-preview.webp"
                alt="Dốc Mơ"
                className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105"
              />
              <span
                className={`font-display text-xl md:text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-brand-olive' : 'text-brand-cream'
                }`}
              >
                Dốc Mơ
              </span>
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative font-medium text-sm tracking-wide transition-colors duration-300 ${
                    isScrolled
                      ? activeId === link.id
                        ? 'text-brand-clay'
                        : 'text-brand-charcoal hover:text-brand-clay'
                      : activeId === link.id
                      ? 'text-brand-bamboo'
                      : 'text-brand-cream/80 hover:text-brand-cream'
                  }`}
                >
                  {link.label}
                  {activeId === link.id && (
                    <motion.div
                      layoutId="nav-underline"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                        isScrolled ? 'bg-brand-clay' : 'bg-brand-bamboo'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:0984586248"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105 ${
                  isScrolled
                    ? 'border-brand-clay text-brand-clay hover:bg-brand-clay hover:text-white'
                    : 'border-brand-cream/60 text-brand-cream hover:bg-brand-cream/20'
                }`}
              >
                📞 Gọi Ngay
              </a>
              <a
                href="https://zalo.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-zalo text-white hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              >
                💬 Zalo
              </a>
            </div>

            {/* Mobile: CTA icons + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href="tel:0984586248"
                className={`p-2 rounded-full transition-colors ${
                  isScrolled ? 'text-brand-clay' : 'text-brand-cream'
                }`}
              >
                📞
              </a>
              <a
                href="https://zalo.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-zalo"
              >
                💬
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled ? 'text-brand-charcoal' : 'text-brand-cream'
                }`}
                aria-label="Menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-brand-cream z-50 md:hidden shadow-2xl"
            >
              <div className="p-6 pt-20">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`text-left text-lg font-medium py-3 px-4 rounded-xl transition-colors ${
                        activeId === link.id
                          ? 'bg-brand-olive text-white'
                          : 'text-brand-charcoal hover:bg-brand-olive/10'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href="tel:0984586248"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-brand-clay text-white font-medium"
                  >
                    📞 Gọi Đặt Bàn
                  </a>
                  <a
                    href="https://zalo.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-zalo text-white font-medium"
                  >
                    💬 Chat Zalo
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
