import { useState } from 'react';
import { motion } from 'framer-motion';
import { menuHighlights } from '../../data/menuItems';
import SectionHeading from '../ui/SectionHeading';
import MenuCard from '../ui/MenuCard';
import DishDetailModal from '../ui/DishDetailModal';

export default function HighlightMenu() {
  const [selectedDish, setSelectedDish] = useState(null);
  return (
    <section id="mon-ngon" className="section-padding bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Món Ngon Đặc Sắc"
          subtitle="Những món signature được yêu thích nhất tại Dốc Mơ"
          emoji="🍲"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-12">
          {menuHighlights.map((item, index) => (
            <motion.div
              key={item.id}
              className={item.span}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MenuCard item={item} onSelect={setSelectedDish} />
            </motion.div>
          ))}
        </div>

        {/* View full menu link */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-brand-charcoal/60 text-sm mb-4">
            Còn rất nhiều món ngon khác đang chờ bạn khám phá 🍜
          </p>
          <button
            onClick={() => {
              document.getElementById('thuc-don')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-olive text-white font-semibold text-sm hover:bg-brand-olive-dark transition-all duration-300 hover:scale-105 shadow-md"
          >
            📜 Xem Toàn Bộ Thực Đơn
          </button>
        </motion.div>
      </div>

      {/* Dish Detail Modal */}
      <DishDetailModal
        isOpen={!!selectedDish}
        onClose={() => setSelectedDish(null)}
        dish={selectedDish}
      />
    </section>
  );
}
