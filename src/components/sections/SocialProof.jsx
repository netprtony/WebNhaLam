import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { reviews, overallRating } from '../../data/reviews';
import SectionHeading from '../ui/SectionHeading';
import ReviewCard from '../ui/ReviewCard';

function AnimatedCounter({ target, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>{count.toFixed(1)}</span>;
}

export default function SocialProof() {
  return (
    <section id="danh-gia" className="section-padding bg-brand-bg relative border-b border-brand-cream/15 text-brand-cream">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="ANH EM NÂNG LY NÓI GÌ"
          subtitle="Hơn 1.200+ lượt khách ghé Dốc Mơ Quán hài lòng về mồi bén & không gian"
          emoji="⭐"
        />

        {/* Overall rating badge */}
        <motion.div
          className="text-center mt-8 sm:mt-10"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-brand-bg-deep border-2 border-brand-cream/30 shadow-xl">
            <div className="text-4xl sm:text-5xl font-black text-brand-cream font-retro">
              <AnimatedCounter target={overallRating.score} />
            </div>
            <div className="text-left">
              <div className="flex gap-0.5 text-base sm:text-lg">
                {'⭐'.repeat(5)}
              </div>
              <p className="font-stencil text-xs text-brand-cream/70 uppercase tracking-wider mt-1 font-bold">
                {overallRating.reviewCount.toLocaleString()}+ ĐÁNH GIÁ TRÊN
                <span className="ml-1 font-black text-brand-cream">GOOGLE MAPS</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Review cards */}
        <div className="mt-10 sm:mt-12">
          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-5 sm:gap-6">
            {reviews.slice(0, 3).map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="md:hidden overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4" style={{ width: `${reviews.length * 290}px` }}>
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="snap-center shrink-0"
                  style={{ width: '275px' }}
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust badge */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded bg-brand-bg-deep border border-brand-cream/25 font-stencil text-xs uppercase tracking-wider text-brand-cream/80 font-bold">
            <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            QUÁN ĂN XÁC MINH CHÍNH CHỦ GOOGLE VERIFIED
          </div>
        </motion.div>
      </div>
    </section>
  );
}
