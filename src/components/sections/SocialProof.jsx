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
    <section id="danh-gia" className="section-padding bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Khách Hàng Nói Gì"
          subtitle="Hơn 1.200+ đánh giá tích cực trên Google"
          emoji="⭐"
        />

        {/* Overall rating */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white warm-shadow">
            <div className="text-4xl md:text-5xl font-bold text-brand-clay font-display">
              <AnimatedCounter target={overallRating.score} />
            </div>
            <div className="text-left">
              <div className="flex gap-0.5 text-yellow-400 text-lg">
                {'⭐'.repeat(5)}
              </div>
              <p className="text-sm text-brand-charcoal/60 mt-1">
                {overallRating.reviewCount.toLocaleString()}+ đánh giá trên
                <span className="ml-1 font-semibold text-brand-charcoal">Google</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Review cards */}
        <div className="mt-12">
          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
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
          <div className="md:hidden overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4">
            <div className="flex gap-4" style={{ width: `${reviews.length * 300}px` }}>
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="snap-center shrink-0"
                  style={{ width: '280px' }}
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators for mobile */}
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            {reviews.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < 3 ? 'bg-brand-olive' : 'bg-brand-olive/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust badge */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-cream-dark text-sm text-brand-charcoal/60">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            Google Verified Business
          </div>
        </motion.div>
      </div>
    </section>
  );
}
