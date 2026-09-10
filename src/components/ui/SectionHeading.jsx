import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, emoji }) {
  return (
    <motion.div
      className="text-center select-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {emoji && (
        <span className="text-3xl sm:text-4xl block mb-2 filter drop-shadow">
          {emoji}
        </span>
      )}
      <h2 className="font-retro font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-cream uppercase tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 text-xs sm:text-sm md:text-base text-brand-cream/70 max-w-2xl mx-auto font-medium leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Street Retro Divider */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <span className="w-8 sm:w-12 h-[2px] bg-brand-cream/30" />
        <span className="w-2 h-2 rotate-45 border border-brand-cream bg-brand-bg" />
        <span className="w-8 sm:w-12 h-[2px] bg-brand-cream/30" />
      </div>
    </motion.div>
  );
}
