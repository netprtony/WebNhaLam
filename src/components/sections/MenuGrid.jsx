'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { id: 0, label: "Mồi Lai Rai", keys: ["KHAI VỊ", "LAI RAI"] },
  { id: 1, label: "Món Xào & Cơm", keys: ["MÓN XÀO"] },
  { id: 2, label: "Lẩu & Nướng", keys: ["LẨU & NƯỚNG"] },
  { id: 3, label: "Bia & Giải Khát", keys: ["TRÀ & NƯỚC NGỌT", "BIA CÁC LOẠI"] },
];

const MenuGrid = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/menu.json');
        const data = await res.json();
        setMenuData(data);
      } catch (error) {
        console.error("Failed to load menu data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const getFilteredItems = () => {
    if (!menuData || menuData.length === 0) return [];
    const currentTabKeys = TABS[activeTab].keys;
    
    let items = [];
    menuData.forEach(section => {
      if (currentTabKeys.includes(section.section_name)) {
        const sectionItems = section.items.map(item => ({
          ...item,
          section_name: section.section_name
        }));
        items = [...items, ...sectionItems];
      }
    });
    return items;
  };

  const filteredItems = getFilteredItems();

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-charcoal">
      <div className="container mx-auto max-w-7xl">
        <h2 className="font-headline text-4xl md:text-5xl text-center text-white mb-2 uppercase">THỰC ĐƠN</h2>
        <p className="text-amber-400 text-center mb-12 font-body">
          Hơn 100 món nhậu bén — chọn gì cũng đúng
        </p>

        {/* Tabs Bar */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 justify-start md:justify-center mb-12 pb-2">
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
                    className="absolute inset-0 bg-amber-400 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-400 rounded-full animate-spin"></div>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={`${item.name}-${index}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="bg-charcoal-light border border-gray-800 rounded-xl p-5 flex justify-between items-start gap-4 hover:border-amber-500/30 transition-colors group"
                  >
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg flex items-center gap-1">
                        {item.name}
                        {item.name.includes('***') && <span className="text-amber-400 text-sm" title="Chef's Recommendation">⭐</span>}
                      </h4>
                      {item.description && (
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{item.description}</p>
                      )}
                      <span className="inline-block mt-2 text-xs text-amber-400/70 uppercase tracking-wider font-semibold bg-amber-500/10 px-2 py-0.5 rounded">
                        {item.section_name}
                      </span>
                    </div>
                    <div className="text-amber-400 font-bold text-lg whitespace-nowrap mt-1 font-headline tracking-wide">
                      {item.price}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuGrid;
