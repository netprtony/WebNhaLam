import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import BrandLogo from '../ui/BrandLogo';

const navLinks = [
  { id: 'khuyen-mai', label: 'Khuyến Mãi' },
  { id: 'mon-ngon', label: 'Món Tủ' },
  { id: 'thuc-don', label: 'Bảng Mồi' },
  { id: 'khong-gian', label: 'Góc Quán' },
  { id: 'danh-gia', label: 'Đánh Giá' },
  { id: 'vi-tri', label: 'Tới Quán' },
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
            ? 'bg-brand-bg-deep/95 backdrop-blur-md border-b border-brand-cream/20 shadow-2xl py-1'
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-2'
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
              className="group cursor-pointer"
            >
              <BrandLogo variant="navbar" />
            </a>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative font-stencil text-xs tracking-[0.14em] uppercase font-bold transition-all duration-300 py-1 ${
                    activeId === link.id
                      ? 'text-brand-cream'
                      : 'text-brand-cream/60 hover:text-brand-cream'
                  }`}
                >
                  {link.label}
                  {activeId === link.id && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-cream rounded-full shadow-[0_0_8px_rgba(247,223,191,0.8)]"
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
                className="flex items-center gap-2 px-4 py-2 rounded border border-brand-cream text-brand-cream text-xs font-stencil font-bold tracking-wider hover:bg-brand-cream hover:text-brand-bg transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
              >
                <span>☎</span>
                <span>0984 586 248</span>
              </a>
              <a
                href="https://zalo.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded bg-brand-cream text-brand-bg text-xs font-stencil font-extrabold tracking-wider hover:bg-brand-cream-light transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
              >
                <span>💬</span>
                <span>ZALO QUÁN</span>
              </a>
            </div>

            {/* Mobile: CTA icons + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href="tel:0984586248"
                className="p-2 rounded border border-brand-cream/40 text-brand-cream text-sm hover:bg-brand-cream hover:text-brand-bg transition-colors"
                aria-label="Gọi điện"
              >
                ☎
              </a>
              <a
                href="https://zalo.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-brand-cream text-brand-bg text-sm font-bold"
                aria-label="Chat Zalo"
              >
                💬
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded border border-brand-cream/30 text-brand-cream hover:border-brand-cream transition-colors"
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
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-brand-bg-deep border-l border-brand-cream/20 z-50 md:hidden shadow-2xl flex flex-col justify-between p-6 pt-20"
            >
              <div>
                <div className="pb-6 mb-6 border-b border-brand-cream/20">
                  <BrandLogo variant="navbar" />
                </div>
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`text-left font-stencil uppercase tracking-widest text-sm py-3 px-4 rounded transition-colors ${
                        activeId === link.id
                          ? 'bg-brand-cream text-brand-bg font-extrabold'
                          : 'text-brand-cream/80 hover:bg-brand-cream/10 hover:text-brand-cream'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-brand-cream/20 flex flex-col gap-3">
                <a
                  href="tel:0984586248"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded border-2 border-brand-cream bg-brand-cream text-brand-bg font-stencil font-black text-xs tracking-wider shadow-md"
                >
                  <span>☎</span> GỌI ĐẶT BÀN: 0984 586 248
                </a>
                <a
                  href="https://zalo.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded border border-brand-cream/40 text-brand-cream font-stencil font-bold text-xs tracking-wider hover:bg-brand-cream/10 transition-colors"
                >
                  <span>💬</span> NHẮN TIN ZALO
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
