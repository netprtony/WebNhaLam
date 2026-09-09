import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const bannerImages = [
  {
    id: 1,
    src: '/images/banner-khuyen-mai/668553529_122188596584474964_7807259678248001827_n.jpg',
    title: 'Ưu Đãi Đặc Biệt',
    alt: 'Banner khuyến mãi Dốc Mơ 1',
  },
  {
    id: 2,
    src: '/images/banner-khuyen-mai/668579700_122188687022474964_5704682577993767592_n.jpg',
    title: 'Combo Tiệc Vui',
    alt: 'Banner khuyến mãi Dốc Mơ 2',
  },
  {
    id: 3,
    src: '/images/banner-khuyen-mai/669711878_122188568678474964_2946177928944425276_n.jpg',
    title: 'Món Ngon Giá Hời',
    alt: 'Banner khuyến mãi Dốc Mơ 3',
  },
  {
    id: 4,
    src: '/images/banner-khuyen-mai/677600068_122190028940474964_6072096606343986854_n.jpg',
    title: 'Siêu Tiệc Cuối Tuần',
    alt: 'Banner khuyến mãi Dốc Mơ 4',
  },
  {
    id: 5,
    src: '/images/banner-khuyen-mai/679446581_122190253664474964_3640489695271946396_n.jpg',
    title: 'Set Lẩu Đậm Đà',
    alt: 'Banner khuyến mãi Dốc Mơ 5',
  },
  {
    id: 6,
    src: '/images/banner-khuyen-mai/680364515_122190253646474964_6453535089117851170_n.jpg',
    title: 'Combo Gia Đình',
    alt: 'Banner khuyến mãi Dốc Mơ 6',
  },
  {
    id: 7,
    src: '/images/banner-khuyen-mai/682053539_122190349322474964_544498932366626980_n.jpg',
    title: 'Đại Tiệc Sum Vầy',
    alt: 'Banner khuyến mãi Dốc Mơ 7',
  },
  {
    id: 8,
    src: '/images/banner-khuyen-mai/682402771_122190426164474964_7480373287466685638_n.jpg',
    title: 'Mồi Ngon Bia Lạnh',
    alt: 'Banner khuyến mãi Dốc Mơ 8',
  },
  {
    id: 9,
    src: '/images/banner-khuyen-mai/684320190_122190424658474964_6900274827347025130_n.jpg',
    title: 'Tiệc Nướng Hấp Dẫn',
    alt: 'Banner khuyến mãi Dốc Mơ 9',
  },
  {
    id: 10,
    src: '/images/banner-khuyen-mai/686902033_122190882998474964_2455567337612723102_n.jpg',
    title: 'Ưu Đãi Giờ Vàng',
    alt: 'Banner khuyến mãi Dốc Mơ 10',
  },
];

export default function PromoBanners() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Responsive items count: 1 on mobile, 2 on tablet, 3 on desktop
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, bannerImages.length - itemsPerPage);

  // Clamp currentIndex if window resize alters maxIndex
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play timer: advances every 4 seconds, pauses on hover or when lightbox is open
  useEffect(() => {
    if (isPaused || lightboxImg !== null) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [nextSlide, isPaused, lightboxImg]);

  // Lightbox navigation helpers
  const handleLightboxPrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setLightboxImg((current) => {
      if (!current) return null;
      const curIdx = bannerImages.findIndex((b) => b.id === current.id);
      const prevIdx = (curIdx - 1 + bannerImages.length) % bannerImages.length;
      return bannerImages[prevIdx];
    });
  }, []);

  const handleLightboxNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setLightboxImg((current) => {
      if (!current) return null;
      const curIdx = bannerImages.findIndex((b) => b.id === current.id);
      const nextIdx = (curIdx + 1) % bannerImages.length;
      return bannerImages[nextIdx];
    });
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxImg) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxImg(null);
      } else if (e.key === 'ArrowLeft') {
        handleLightboxPrev();
      } else if (e.key === 'ArrowRight') {
        handleLightboxNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg, handleLightboxPrev, handleLightboxNext]);

  // Touch handlers for mobile swiping
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
  };

  // Percentage translation per slide step based on itemsPerPage
  const translatePercentage = currentIndex * (100 / itemsPerPage);

  return (
    <section
      id="khuyen-mai"
      className="section-padding bg-gradient-to-b from-brand-olive/5 via-brand-cream/20 to-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Khuyến Mãi Hot"
          subtitle="Combo siêu hời, ưu đãi có hạn — đừng bỏ lỡ!"
          emoji="🎉"
        />

        {/* Carousel Container with Framer Motion entrance animation */}
        <motion.div
          className="relative mt-10 sm:mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel Viewport */}
          <div
            className="overflow-hidden py-3 sm:py-4 px-1"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* CSS translateX Track */}
            <div
              className="flex transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translateX(-${translatePercentage}%)`,
              }}
            >
              {bannerImages.map((banner) => (
                <div
                  key={banner.id}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3"
                >
                  <div
                    onClick={() => setLightboxImg(banner)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white border border-brand-charcoal/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:warm-shadow"
                  >
                    <div className="aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden relative bg-brand-cream/30">
                      <img
                        src={banner.src}
                        alt={banner.alt}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                      {/* Hot Badge */}
                      <div className="absolute top-3.5 right-3.5">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-brand-clay text-white shadow-md">
                          🔥 Hot Deal
                        </span>
                      </div>

                      {/* Bottom Banner Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                        <h3 className="font-display text-lg sm:text-xl font-bold line-clamp-1 drop-shadow-sm text-brand-cream">
                          {banner.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-brand-cream/80 flex items-center gap-1.5 mt-1.5 font-medium">
                          <span className="inline-block transition-transform duration-300 group-hover:scale-110">🔍</span>
                          <span>Chạm để xem chi tiết ưu đãi</span>
                        </p>
                      </div>

                      {/* Center Hover Magnifier Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span className="w-12 h-12 rounded-full bg-brand-olive/90 text-white flex items-center justify-center shadow-lg backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Banner trước"
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-brand-olive hover:bg-brand-olive-dark text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-clay"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Banner tiếp theo"
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-brand-olive hover:bg-brand-olive-dark text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-clay"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Chuyển tới slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-brand-clay'
                    : 'w-2.5 bg-brand-charcoal/20 hover:bg-brand-charcoal/40'
                }`}
              />
            ))}
          </div>

          {/* Call-to-action note below banner carousel */}
          <div className="mt-8 sm:mt-10 text-center">
            <p className="text-sm md:text-base text-brand-charcoal/75 mb-4">
              💡 Ưu đãi có thể áp dụng đồng thời khi đặt bàn trước. Gọi ngay hotline để được tư vấn combo phù hợp nhất!
            </p>
            <div className="inline-flex flex-wrap items-center justify-center gap-3">
              <a
                href="tel:0984586248"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-olive hover:bg-brand-olive-dark text-white font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-md"
              >
                📞 Đặt Bàn Nhận Ưu Đãi
              </a>
              <a
                href="https://zalo.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zalo hover:bg-blue-700 text-white font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-md"
              >
                💬 Tư Vấn Qua Zalo
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox with AnimatePresence */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-sm"
            onClick={() => setLightboxImg(null)}
          >
            {/* Modal Box */}
            <div
              className="relative max-w-4xl w-full flex flex-col items-center max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="w-full flex items-center justify-between text-white mb-3 px-2 sm:px-0">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-clay text-white shadow">
                    🎉 Khuyến Mãi Hot
                  </span>
                  <span className="font-display font-semibold text-base sm:text-lg text-brand-cream hidden sm:inline">
                    {lightboxImg.title}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-sm text-brand-cream/80 bg-white/10 px-3 py-1 rounded-full">
                    {bannerImages.findIndex((b) => b.id === lightboxImg.id) + 1} / {bannerImages.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLightboxImg(null)}
                    aria-label="Đóng"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Main Image in Lightbox */}
              <div className="relative w-full flex items-center justify-center">
                <motion.img
                  key={lightboxImg.src}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  src={lightboxImg.src}
                  alt={lightboxImg.alt}
                  className="max-h-[72vh] sm:max-h-[76vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />

                {/* Lightbox Previous Button */}
                <button
                  type="button"
                  onClick={handleLightboxPrev}
                  aria-label="Xem banner trước"
                  className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Lightbox Next Button */}
                <button
                  type="button"
                  onClick={handleLightboxNext}
                  aria-label="Xem banner tiếp theo"
                  className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Lightbox Quick Actions */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="tel:0984586248"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-clay hover:bg-brand-clay-dark text-white text-xs sm:text-sm font-semibold shadow-lg hover:scale-105 transition-all"
                >
                  📞 Đặt Bàn Ngay: 0984 586 248
                </a>
                <a
                  href="https://zalo.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zalo hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-lg hover:scale-105 transition-all"
                >
                  💬 Nhắn Zalo Đặt Bàn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
