import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../../data/gallery';
import SectionHeading from '../ui/SectionHeading';

const tabs = [
  { key: 'family', label: '🏮 TRONG NHÀ ẤM CÚNG', sublabel: 'Bàn Gỗ Mộc • Máy Lạnh' },
  { key: 'outdoor', label: '🛵 SÂN VƯỜN PHỐ XÁ', sublabel: 'Thoáng Mát • Đèn Dây Chill' },
];

export default function AmbianceSpaces() {
  const [activeTab, setActiveTab] = useState('family');
  const [lightboxImg, setLightboxImg] = useState(null);

  const images = galleryImages[activeTab] || [];

  return (
    <section id="khong-gian" className="section-padding bg-brand-bg text-brand-cream relative border-b border-brand-cream/15">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="GÓC QUÁN & VỈA HÈ"
          subtitle="Không gian mộc mạc đậm chất phố — anh em lai rai hay tiệc gia đình đều trọn vẹn"
          emoji="🏮"
        />

        {/* Tab toggle - Street board */}
        <div className="flex justify-center mt-10">
          <div className="inline-flex bg-brand-bg-deep border-2 border-brand-cream/30 rounded-xl p-1.5 gap-1.5 shadow-xl">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded text-xs sm:text-sm font-stencil tracking-wider uppercase transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-brand-cream text-brand-bg font-black shadow-lg scale-[1.02]'
                    : 'text-brand-cream/70 hover:text-brand-cream hover:bg-brand-cream/10'
                }`}
              >
                <span className="block font-black">{tab.label}</span>
                <span className="block text-[10px] tracking-widest opacity-80 mt-0.5">{tab.sublabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Photo grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-10"
          >
            {images.map((img, index) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-xl border-2 border-brand-cream/20 hover:border-brand-cream bg-brand-bg-deep cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                  img.aspect === 'tall'
                    ? 'row-span-2'
                    : img.aspect === 'wide'
                    ? 'sm:col-span-2'
                    : ''
                }`}
                onClick={() => setLightboxImg(img)}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="w-full h-full object-cover min-h-[220px] md:min-h-[260px] transition-transform duration-700 group-hover:scale-105 filter brightness-90 contrast-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-bg-deep/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-brand-cream text-brand-bg flex items-center justify-center text-lg font-bold shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                    🔍
                  </span>
                </div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-brand-bg-deep via-brand-bg-deep/70 to-transparent">
                  <p className="font-stencil text-xs sm:text-sm font-bold text-brand-cream tracking-wide uppercase">
                    {img.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxImg(null)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={lightboxImg.src}
              alt={lightboxImg.caption}
              className="max-w-full max-h-[85vh] object-contain rounded-xl border-2 border-brand-cream/30 shadow-2xl"
            />
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-brand-bg-deep/90 text-brand-cream border border-brand-cream/40 flex items-center justify-center text-xl hover:bg-brand-cream hover:text-brand-bg transition-colors"
              onClick={() => setLightboxImg(null)}
              aria-label="Đóng ảnh"
            >
              ✕
            </button>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-stencil text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-cream bg-brand-bg-deep/90 border border-brand-cream/40 px-5 py-2.5 rounded shadow-lg">
              {lightboxImg.caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
