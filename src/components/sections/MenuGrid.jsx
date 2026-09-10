'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DishDetailModal from '../ui/DishDetailModal';
import { usePreBill } from '../../context/PreBillContext';

const TABS = [
  { id: 0, label: "Mồi Lai Rai", keys: ["KHAI VỊ", "LAI RAI"] },
  { id: 1, label: "Món Xào & Cơm", keys: ["MÓN XÀO"] },
  { id: 2, label: "Lẩu & Nướng", keys: ["LẨU & NƯỚNG"] },
  { id: 3, label: "Bia & Giải Khát", keys: ["TRÀ & NƯỚC NGỌT", "BIA CÁC LOẠI"] },
];

// Danh sách ảnh món ăn thực tế trong public/images/foods/
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

// Hàm gán ảnh đồ ăn thực tế theo tên món
function getItemImage(itemName, index) {
  if (!itemName) return foodImages[0];
  const hash = itemName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return foodImages[(hash + index) % foodImages.length];
}

const MenuGrid = ({ onProceedBooking }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDish, setSelectedDish] = useState(null);

  const { addItem, updateQuantity, items } = usePreBill();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/menu.json');
        const data = await res.json();
        const categories = Array.isArray(data) ? data : (data.restaurant_menu || []);
        setMenuData(categories);
      } catch (error) {
        console.error("Failed to load menu data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const getFilteredItems = () => {
    if (!menuData || !Array.isArray(menuData) || menuData.length === 0) return [];
    const currentTabKeys = TABS[activeTab].keys;
    
    let result = [];
    let itemCounter = 0;
    menuData.forEach((cat) => {
      if (currentTabKeys.includes(cat.category)) {
        if (cat.sections && Array.isArray(cat.sections)) {
          cat.sections.forEach((section) => {
            if (section.items && Array.isArray(section.items)) {
              section.items.forEach((item) => {
                const image = getItemImage(item.name, itemCounter);
                itemCounter++;
                result.push({
                  ...item,
                  image,
                  section_name: section.section_name || cat.category,
                });
              });
            }
          });
        }
      }
    });
    return result;
  };

  const filteredItems = getFilteredItems();

  return (
    <section id="thuc-don" className="py-20 md:py-32 px-4 md:px-8 bg-charcoal">
      <div className="container mx-auto max-w-7xl">
        <h2 className="font-headline text-4xl md:text-5xl text-center text-white mb-2 uppercase tracking-wide">
          THỰC ĐƠN
        </h2>
        <p className="text-amber-400 text-center mb-10 font-body text-base md:text-lg">
          Hơn 100 món nhậu bén — Bấm vào món để xem ảnh chi tiết & chọn trước vào bill
        </p>

        {/* Tabs Bar */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 justify-start md:justify-center mb-10 pb-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap z-10 ${
                  isActive ? 'text-charcoal' : 'text-gray-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="menuPill"
                    className="absolute inset-0 bg-amber-400 rounded-full -z-10 shadow-glow-amber"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid các món ăn */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-400 rounded-full animate-spin"></div>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => {
                  const isChefSpecial = item.name?.includes('***');
                  const cleanName = item.name ? item.name.replace(/\s*\*\*\*\s*/g, '').trim() : '';

                  const cartItem = items.find((i) => i.name === cleanName);
                  const inCartQty = cartItem ? cartItem.quantity : 0;

                  return (
                    <motion.div
                      key={`${item.name}-${index}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.4) }}
                      className={`bg-charcoal-light border rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_10px_25px_rgba(0,0,0,0.6)] ${
                        inCartQty > 0
                          ? 'border-amber-500/60 bg-charcoal-mid/90'
                          : 'border-white/5 hover:border-amber-500/30'
                      }`}
                    >
                      {/* Top: Thumbnail Image + Basic Info */}
                      <div
                        onClick={() => setSelectedDish(item)}
                        className="flex gap-4 cursor-pointer"
                      >
                        {/* Food Image thumbnail */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-charcoal flex-shrink-0 border border-white/5 group-hover:border-amber-500/40 transition">
                          <img
                            src={item.image}
                            alt={cleanName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition">
                            🔍 Xem
                          </div>
                        </div>

                        {/* Title, description, price */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-1.5 flex-wrap leading-snug group-hover:text-amber-300 transition">
                              <span>{cleanName}</span>
                              {isChefSpecial && (
                                <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-normal border border-amber-500/30">
                                  ⭐ Món Bếp Trưởng
                                </span>
                              )}
                            </h4>
                            {item.description && (
                              <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                            <span className="text-[11px] text-amber-400/80 uppercase tracking-wider font-semibold bg-amber-500/10 px-2 py-0.5 rounded">
                              {item.section_name}
                            </span>
                            <span className="text-amber-400 font-headline text-lg font-bold">
                              {item.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom action: Select / Pre-bill button */}
                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setSelectedDish(item)}
                          className="text-xs text-gray-400 hover:text-white underline transition"
                        >
                          Chi tiết món →
                        </button>

                        {inCartQty > 0 ? (
                          <div className="flex items-center gap-2 bg-charcoal-surface border border-amber-500/40 rounded-xl p-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(cleanName, -1);
                              }}
                              className="w-7 h-7 rounded-lg bg-charcoal-light hover:bg-amber-500 hover:text-charcoal text-white font-bold transition flex items-center justify-center text-xs"
                            >
                              -
                            </button>
                            <span className="font-bold text-amber-400 text-xs px-1.5">
                              {inCartQty} phần
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(cleanName, 1);
                              }}
                              className="w-7 h-7 rounded-lg bg-charcoal-light hover:bg-amber-500 hover:text-charcoal text-white font-bold transition flex items-center justify-center text-xs"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addItem(item);
                            }}
                            className="py-1.5 px-3.5 bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-charcoal border border-amber-500/30 rounded-xl text-xs font-bold transition active:scale-95 flex items-center gap-1"
                          >
                            <span>+</span>
                            <span>Chọn món</span>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Modal chi tiết món ăn */}
        <DishDetailModal
          isOpen={!!selectedDish}
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onProceedBooking={onProceedBooking}
        />
      </div>
    </section>
  );
};

export default MenuGrid;
