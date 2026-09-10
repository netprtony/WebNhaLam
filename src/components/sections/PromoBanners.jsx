'use client';

import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ImageLightboxModal from '../ui/ImageLightboxModal';

const banners = [
  '/images/banner-khuyen-mai/668553529_122188596584474964_7807259678248001827_n.jpg',
  '/images/banner-khuyen-mai/668579700_122188687022474964_5704682577993767592_n.jpg',
  '/images/banner-khuyen-mai/669711878_122188568678474964_2946177928944425276_n.jpg',
  '/images/banner-khuyen-mai/677600068_122190028940474964_6072096606343986854_n.jpg',
  '/images/banner-khuyen-mai/679446581_122190253664474964_3640489695271946396_n.jpg',
  '/images/banner-khuyen-mai/680364515_122190253646474964_6453535089117851170_n.jpg',
  '/images/banner-khuyen-mai/682053539_122190349322474964_544498932366626980_n.jpg',
  '/images/banner-khuyen-mai/682402771_122190426164474964_7480373287466685638_n.jpg',
  '/images/banner-khuyen-mai/684320190_122190424658474964_6900274827347025130_n.jpg',
  '/images/banner-khuyen-mai/686902033_122190882998474964_2455567337612723102_n.jpg',
];

const PromoBanners = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    const autoplayInterval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 4000);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      clearInterval(autoplayInterval);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="khuyen-mai" className="py-20 md:py-32 px-4 md:px-8 bg-charcoal">
      <div className="container mx-auto max-w-7xl">
        <h2 className="font-headline text-4xl md:text-5xl text-center text-white mb-2 uppercase tracking-wide">
          ƯU ĐÃI HOT
        </h2>
        <p className="text-amber-400 text-center mb-12 font-body text-base md:text-lg">
          Săn ngàn deal hời, ăn chơi xả láng — Bấm vào banner để phóng to xem chi tiết
        </p>

        <div className="relative">
          <div className="overflow-hidden py-4" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-4">
              {banners.map((src, index) => (
                <div 
                  key={index}
                  className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_33.333%] pl-4 min-w-0"
                >
                  <div 
                    onClick={() => setLightboxImage({ src, title: `Khuyến mãi #${index + 1}` })}
                    className="rounded-2xl overflow-hidden aspect-[3/4] relative group border border-transparent hover:border-amber-400/50 transition-colors duration-300 cursor-pointer shadow-lg"
                  >
                    <img 
                      src={src} 
                      alt={`Khuyến mãi ${index + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 ring-2 ring-amber-400 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.5)] transition-all duration-300 rounded-2xl pointer-events-none" />
                    <div className="absolute bottom-3 right-3 bg-charcoal/80 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <span>🔍 Phóng to</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={scrollPrev}
            className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal-light/90 backdrop-blur-sm border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 flex items-center justify-center transition-colors z-10 hidden md:flex shadow-lg"
            aria-label="Previous promo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button 
            onClick={scrollNext}
            className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal-light/90 backdrop-blur-sm border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 flex items-center justify-center transition-colors z-10 hidden md:flex shadow-lg"
            aria-label="Next promo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === selectedIndex ? 'w-4 h-2 bg-amber-400' : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        <ImageLightboxModal
          isOpen={!!lightboxImage}
          onClose={() => setLightboxImage(null)}
          imageSrc={lightboxImage?.src}
          title={lightboxImage?.title}
          caption="Chương trình ưu đãi có hạn tại Dốc Mơ Quán — Liên hệ hotline 0984 586 248 để áp dụng"
        />
      </div>
    </section>
  );
};

export default PromoBanners;
