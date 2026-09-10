import { useState } from 'react';
import { motion } from 'framer-motion';
import { menuHighlights } from '../../data/menuItems';
import SectionHeading from '../ui/SectionHeading';
import MenuCard from '../ui/MenuCard';
import DishDetailModal from '../ui/DishDetailModal';

export default function HighlightMenu() {
  const [selectedDish, setSelectedDish] = useState(null);

  return (
    <section id="mon-ngon" className="section-padding bg-brand-bg relative border-b border-brand-cream/15">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="MỒI TỦ • ĐẶC SẮC QUÁN"
          subtitle="Những món bén bia, đậm vị nhà nấu được anh em gọi nhiều nhất tại Dốc Mơ Quán"
          emoji="🍢"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-10 sm:mt-12">
          {menuHighlights.map((item, index) => (
            <motion.div
              key={item.id}
              className={item.span}
              initial={{ opacity: 0, y: 30 }}
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
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-stencil text-xs sm:text-sm text-brand-cream/60 uppercase tracking-widest mb-4">
            CÒN HƠN 60+ MÓN MỒI BÉN & ĐỒ UỐNG ĐANG CHỜ BẠN LÊN BÀN 🍻
          </p>
          <button
            onClick={() => {
              document.getElementById('thuc-don')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded bg-brand-cream text-brand-bg font-retro font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-brand-cream-light transition-all duration-300 hover:scale-105 shadow-xl border-2 border-brand-cream active:scale-95"
          >
            <span>📜</span>
            <span>XEM TOÀN BỘ BẢNG MỒI DỐC MƠ QUÁN</span>
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
