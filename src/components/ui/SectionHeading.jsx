import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, emoji }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {emoji && <span className="text-3xl md:text-4xl block mb-3">{emoji}</span>}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-brand-charcoal/60 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-brand-clay" />
    </motion.div>
  );
}
