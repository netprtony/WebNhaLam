import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import DishDetailModal from '../ui/DishDetailModal';

// Street-style icons cho từng danh mục quán nhậu
const categoryIcons = {
  'KHAI VỊ': '🥢',
  'LAI RAI': '🍢',
  'MÓN XÀO': '🥘',
  'LẨU & NƯỚNG': '♨️',
  'TRÀ & NƯỚC NGỌT': '🧊',
  'BIA CÁC LOẠI': '🍻',
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
      <section id="thuc-don" className="section-padding bg-brand-bg">
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-brand-cream border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="thuc-don" className="section-padding bg-brand-bg-alt/90 text-brand-cream relative border-b border-brand-cream/15 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="BẢNG MỒI • THỰC ĐƠN QUÁN"
          subtitle="Đầy đủ các món mồi bén, lẩu nướng nóng hổi và đồ uống giải nhiệt tại Dốc Mơ Quán"
          emoji="📋"
        />

        {/* Category tabs — horizontal scroll on mobile */}
        <div className="mt-10 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 sm:gap-3 md:justify-center min-w-max pb-2">
            {menuData.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`relative flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded text-xs sm:text-sm font-stencil font-extrabold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat.category
                    ? 'bg-brand-cream text-brand-bg shadow-xl scale-105 border-2 border-brand-cream'
                    : 'bg-brand-bg-deep text-brand-cream/70 border border-brand-cream/25 hover:border-brand-cream hover:text-brand-cream'
                }`}
              >
                <span className="text-base sm:text-lg">{categoryIcons[cat.category] || '🍴'}</span>
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
              <div className="relative rounded-2xl overflow-hidden h-40 sm:h-52 mb-8 border-2 border-brand-cream/30 shadow-2xl">
                <img
                  src={categoryImages[activeCategory] || foodImages[0]}
                  alt={activeCategory}
                  className="w-full h-full object-cover filter brightness-75 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-bg-deep/95 via-brand-bg-deep/60 to-transparent" />
                <div className="absolute inset-0 flex items-center px-6 sm:px-10">
                  <div>
                    <span className="text-4xl sm:text-5xl">
                      {categoryIcons[activeCategory] || '🍴'}
                    </span>
                    <h3 className="font-retro text-2xl sm:text-4xl font-black text-brand-cream uppercase tracking-tight mt-2">
                      {activeCategory}
                    </h3>
                    <p className="font-stencil text-xs sm:text-sm text-brand-cream/80 uppercase tracking-widest mt-1 font-bold">
                      {activeCategoryData.sections.reduce(
                        (sum, s) => sum + s.items.length,
                        0
                      )}{' '}
                      MÓN SẴN SÀNG LÊN BÀN
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
                      <div className="w-1.5 h-7 rounded-full bg-brand-cream" />
                      <h4 className="font-retro text-lg sm:text-2xl font-black text-brand-cream uppercase tracking-tight">
                        {section.section_name}
                      </h4>
                      <span className="font-stencil text-[11px] bg-brand-cream text-brand-bg px-2.5 py-0.5 rounded font-black tracking-wider uppercase">
                        {section.items.length} MÓN
                      </span>
                    </div>

                    {/* Menu items grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
                            className="group flex gap-3.5 sm:gap-4 p-4 rounded-xl bg-brand-bg-surface border-2 border-brand-cream/20 hover:border-brand-cream transition-all duration-300 hover:shadow-xl cursor-pointer hover:-translate-y-1"
                          >
                            {/* Food image */}
                            <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-brand-bg-deep border border-brand-cream/20 relative">
                              <img
                                src={itemImage}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>

                            {/* Item info */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                <div className="flex items-start justify-between gap-2">
                                  <h5 className="font-retro font-black text-brand-cream text-xs sm:text-sm uppercase tracking-tight leading-snug group-hover:text-brand-cream-light transition-colors">
                                    {item.name}
                                    {item.name.includes('***') && (
                                      <span className="ml-1 text-xs">🔥</span>
                                    )}
                                  </h5>
                                  <span className="shrink-0 font-retro font-black text-brand-cream text-sm sm:text-base">
                                    {item.price}
                                  </span>
                                </div>
                                {item.description && (
                                  <p className="text-[11px] sm:text-xs text-brand-cream/70 mt-1 line-clamp-2 font-medium leading-relaxed">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                              <div className="mt-2 flex items-center justify-between pt-1 border-t border-brand-cream/15">
                                <span className="font-stencil text-[10px] text-brand-cream/60 group-hover:text-brand-cream font-bold tracking-wider uppercase transition-colors">
                                  XEM CHI TIẾT →
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
          className="text-center mt-12 pt-8 border-t border-brand-cream/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-stencil text-xs sm:text-sm text-brand-cream/70 uppercase tracking-wider">
            💡 MÓN ĂN CHẾ BIẾN NÓNG HỔI KHI GỌI. ANH EM ĐẶT TRƯỚC ĐỂ QUÁN PHỤC VỤ CHU ĐÁO NHẤT!
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <a
              href="tel:0984586248"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-brand-cream text-brand-bg font-retro font-black text-xs uppercase tracking-wider hover:bg-brand-cream-light transition-all duration-300 hover:scale-105 shadow-xl border border-brand-cream active:scale-95"
            >
              <span>☎</span>
              <span>GỌI ĐẶT MÓN: 0984 586 248</span>
            </a>
            <a
              href="https://zalo.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded border border-brand-cream text-brand-cream font-stencil font-bold text-xs uppercase tracking-wider hover:bg-brand-cream/15 transition-all duration-300 hover:scale-105 shadow-md active:scale-95"
            >
              <span>💬</span>
              <span>ĐẶT QUA ZALO</span>
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
