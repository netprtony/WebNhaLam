import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import DishDetailModal from '../ui/DishDetailModal';

// Emoji icons cho từng category
const categoryIcons = {
  'KHAI VỊ': '🥗',
  'LAI RAI': '🍗',
  'MÓN XÀO': '🍳',
  'LẨU & NƯỚNG': '🍲',
  'TRÀ & NƯỚC NGỌT': '🍹',
  'BIA CÁC LOẠI': '🍺',
};

const foodImages = [
  '/images/foods/472209739_122132656544474964_1458932959027272854_n.jpg',
  '/images/foods/473187199_122133952526474964_1961644097023297346_n.jpg',
  '/images/foods/474761975_122135548142474964_3979101130424039857_n.jpg',
  '/images/foods/474777577_122135546594474964_3661956282461017698_n.jpg',
  '/images/foods/474780036_122135548130474964_8763042076691175556_n.jpg',
  '/images/foods/474897358_122135548118474964_6820919250650093489_n.jpg',
  '/images/foods/475057390_122135548226474964_3124288336232775728_n.jpg',
  '/images/foods/475064909_122135548154474964_1094959055660616386_n.jpg',
  '/images/foods/475094887_122135548172474964_1341177154493897667_n.jpg',
  '/images/foods/475105117_122135548196474964_5587806538350282918_n.jpg',
  '/images/foods/475186209_122135548214474964_7232818857660877149_n.jpg',
  '/images/foods/475314297_122135548184474964_2858839516456122755_n.jpg',
  '/images/foods/475407507_122135546654474964_3299941550278228008_n.jpg',
  '/images/foods/650363390_122185867832474964_5432959880844720639_n.jpg',
  '/images/foods/651222889_122185867844474964_2930218385830290481_n.jpg',
  '/images/foods/653054516_122186971574474964_571996260120301970_n.jpg',
  '/images/foods/654349707_122186972420474964_8749564856836456933_n.jpg',
  '/images/foods/655394987_122186972156474964_7926103818028060531_n.jpg',
  '/images/foods/655747281_122186971370474964_3363180199129417671_n.jpg',
  '/images/foods/656434324_122187237350474964_8153001845916240996_n.jpg',
  '/images/foods/657806482_122186972114474964_8937428043533625050_n.jpg',
  '/images/foods/658336334_122186972462474964_3172442149139405044_n.jpg',
  '/images/foods/659571982_122186971952474964_8362936428326694496_n.jpg',
  '/images/foods/660479955_122187237338474964_6897643169720907204_n.jpg',
  '/images/foods/boluclac.png',
  '/images/foods/chagio.png',
  '/images/foods/lau.png',
  '/images/foods/lau2.png',
  '/images/foods/lau3.png',
  '/images/foods/lau4.png',
];

// Helper function that deterministically maps item name to an image
function getItemImage(itemName, index) {
  const hash = itemName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return foodImages[(hash + index) % foodImages.length];
}

const categoryImages = {
  'KHAI VỊ': '/images/foods/656434324_122187237350474964_8153001845916240996_n.jpg',
  'LAI RAI': '/images/foods/657806482_122186972114474964_8937428043533625050_n.jpg',
  'MÓN XÀO': '/images/foods/boluclac.png',
  'LẨU & NƯỚNG': '/images/foods/lau.png',
  'TRÀ & NƯỚC NGỌT': '/images/foods/650363390_122185867832474964_5432959880844720639_n.jpg',
  'BIA CÁC LOẠI': '/images/foods/475105117_122135548196474964_5587806538350282918_n.jpg',
};

export default function FullMenu() {
  const [menuData, setMenuData] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/menu.json')
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data.restaurant_menu || []);
        if (data.restaurant_menu?.length > 0) {
          setActiveCategory(data.restaurant_menu[0].category);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load menu:', err);
        setIsLoading(false);
      });
  }, []);

  const activeCategoryData = menuData.find((cat) => cat.category === activeCategory);

  if (isLoading) {
    return (
      <section id="thuc-don" className="section-padding bg-white">
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-brand-olive border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="thuc-don" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Thực Đơn"
          subtitle="Khám phá đầy đủ các món ngon tại Dốc Mơ — từ khai vị đến đồ uống"
          emoji="📜"
        />

        {/* Category tabs — horizontal scroll on mobile */}
        <div className="mt-10 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 md:gap-3 md:justify-center min-w-max pb-2">
            {menuData.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`relative flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat.category
                    ? 'bg-brand-olive text-white shadow-lg scale-105'
                    : 'bg-brand-cream text-brand-charcoal/70 hover:bg-brand-cream-dark hover:text-brand-charcoal'
                }`}
              >
                <span className="text-lg">{categoryIcons[cat.category] || '🍴'}</span>
                <span>{cat.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category banner */}
        <AnimatePresence mode="wait">
          {activeCategoryData && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              {/* Category header with image */}
              <div className="relative rounded-2xl overflow-hidden h-40 md:h-52 mb-8">
                <img
                  src={categoryImages[activeCategory] || foodImages[0]}
                  alt={activeCategory}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-center px-6 md:px-10">
                  <div>
                    <span className="text-4xl md:text-5xl">
                      {categoryIcons[activeCategory] || '🍴'}
                    </span>
                    <h3 className="font-display text-2xl md:text-4xl font-bold text-white mt-2">
                      {activeCategory}
                    </h3>
                    <p className="text-white/70 text-sm mt-1">
                      {activeCategoryData.sections.reduce(
                        (sum, s) => sum + s.items.length,
                        0
                      )}{' '}
                      món
                    </p>
                  </div>
                </div>
              </div>

              {/* Sections within category */}
              <div className="space-y-10">
                {activeCategoryData.sections.map((section, sectionIdx) => (
                  <motion.div
                    key={section.section_name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sectionIdx * 0.1 }}
                  >
                    {/* Section title */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-1 h-8 rounded-full bg-brand-clay" />
                      <h4 className="font-display text-xl md:text-2xl font-bold text-brand-charcoal">
                        {section.section_name}
                      </h4>
                      <span className="text-xs bg-brand-cream text-brand-charcoal/50 px-2 py-1 rounded-full font-medium">
                        {section.items.length} món
                      </span>
                    </div>

                    {/* Menu items grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {section.items.map((item, itemIdx) => {
                        const itemImage = getItemImage(item.name, itemIdx);
                        return (
                          <motion.div
                            key={`${section.section_name}-${item.name}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: sectionIdx * 0.05 + itemIdx * 0.03 }}
                            onClick={() =>
                              setSelectedDish({
                                ...item,
                                image: itemImage,
                                category: activeCategory,
                                section: section.section_name,
                              })
                            }
                            className="group flex gap-4 p-4 rounded-xl bg-brand-cream/50 hover:bg-brand-cream border border-transparent hover:border-brand-bamboo/40 transition-all duration-300 hover:warm-shadow cursor-pointer hover:-translate-y-0.5"
                          >
                            {/* Food image */}
                            <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-brand-cream relative">
                              <img
                                src={itemImage}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                            </div>

                            {/* Item info */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                <div className="flex items-start justify-between gap-2">
                                  <h5 className="font-semibold text-brand-charcoal text-sm leading-tight group-hover:text-brand-olive transition-colors">
                                    {item.name}
                                    {item.name.includes('***') && (
                                      <span className="ml-1 text-red-500 text-xs">🔥</span>
                                    )}
                                  </h5>
                                  <span className="shrink-0 font-bold text-brand-clay text-sm">
                                    {item.price}
                                  </span>
                                </div>
                                {item.description && (
                                  <p className="text-xs text-brand-charcoal/50 mt-1 line-clamp-2 leading-relaxed">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-[11px] text-brand-charcoal/40 group-hover:text-brand-clay font-medium transition-colors">
                                  Xem chi tiết →
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom note */}
        <motion.div
          className="text-center mt-12 pt-8 border-t border-brand-cream-dark"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-brand-charcoal/50 text-sm">
            💡 Giá có thể thay đổi tùy thời điểm. Liên hệ quán để biết thêm chi tiết.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <a
              href="tel:0984586248"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-clay text-white text-sm font-semibold hover:bg-brand-clay-dark transition-colors hover:scale-105 transition-transform shadow-md"
            >
              📞 Gọi Đặt Món
            </a>
            <a
              href="https://zalo.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zalo text-white text-sm font-semibold hover:bg-blue-700 transition-colors hover:scale-105 transition-transform shadow-md"
            >
              💬 Đặt Qua Zalo
            </a>
          </div>
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
