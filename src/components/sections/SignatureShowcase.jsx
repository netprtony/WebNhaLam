'use client';

import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { signatureDishes } from '../../data/signatureDishes';

const SignatureShowcase = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    
    // Autoplay
    const autoplayInterval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      clearInterval(autoplayInterval);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-charcoal overflow-hidden">
      <div className="container mx-auto">
        <h2 className="font-headline text-4xl md:text-5xl text-center text-white mb-2 uppercase">ĐẶC SẢN NHÀ LÀM</h2>
        <p className="text-amber-400 text-center mb-12 font-body max-w-xl mx-auto">
          Món ruột bán cháy mỗi tối — chưa ăn là chưa tới Dốc Mơ
        </p>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden py-12" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {signatureDishes?.map((dish, index) => (
                <div 
                  key={index}
                  className="flex-[0_0_80%] md:flex-[0_0_40%] px-4 min-w-0"
                >
                  <motion.div 
                    animate={{ 
                      scale: index === selectedIndex ? 1 : 0.9,
                      opacity: index === selectedIndex ? 1 : 0.6
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-charcoal-light rounded-3xl p-6 relative h-full min-h-[400px] border border-gray-800 flex flex-col mt-8"
                  >
                    {/* Badge */}
                    {dish.badgeType && (
                      <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold uppercase
                        ${dish.badgeType === 'hot' ? 'bg-chiliRed/20 text-chiliRed border border-chiliRed/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                        {dish.badgeText || 'HOT'}
                      </div>
                    )}
                    
                    {/* Image */}
                    <div className="w-[70%] mx-auto -mt-20 relative z-10 flex-shrink-0">
                      <img 
                        src={dish.image || '/images/image_rvbg/goibo.png'} 
                        alt={dish.name} 
                        className="w-full h-auto object-contain cutout-shadow drop-shadow-2xl"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="mt-4 flex-grow flex flex-col justify-center">
                      <h3 className="font-headline text-2xl text-white text-center">{dish.name}</h3>
                      <p className="text-gray-400 text-center text-sm mt-2 line-clamp-3 font-body">
                        {dish.description}
                      </p>
                      <div className="text-amber-400 font-bold text-3xl text-center mt-6 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] font-headline">
                        {dish.price}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={scrollPrev}
            className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal-light/80 backdrop-blur-sm border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 flex items-center justify-center transition-colors z-10"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button 
            onClick={scrollNext}
            className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal-light/80 backdrop-blur-sm border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 flex items-center justify-center transition-colors z-10"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {signatureDishes?.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === selectedIndex ? 'w-3 h-3 bg-amber-400' : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureShowcase;
