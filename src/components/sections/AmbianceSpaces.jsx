import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../../data/gallery';
import SectionHeading from '../ui/SectionHeading';

const tabs = [
  { key: 'family', label: '🏠 Khu Gia Đình', sublabel: 'Mát Lạnh' },
  { key: 'outdoor', label: '🌿 Khu Nhậu', sublabel: 'Thoáng Mát' },
];

export default function AmbianceSpaces() {
  const [activeTab, setActiveTab] = useState('family');
  const [lightboxImg, setLightboxImg] = useState(null);

  const images = galleryImages[activeTab] || [];

  return (
    <section id="khong-gian" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Không Gian Sum Vầy"
          subtitle="Cho Mọi Khoảnh Khắc — gia đình ấm cúng hay nhóm bạn vui nhộn"
          emoji="🏮"
        />

        {/* Tab toggle */}
        <div className="flex justify-center mt-10">
          <div className="inline-flex bg-brand-cream rounded-2xl p-1.5 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-brand-olive text-white shadow-md'
                    : 'text-brand-charcoal/70 hover:text-brand-charcoal'
                }`}
              >
                <span className="block">{tab.label}</span>
                <span className="block text-[10px] opacity-70">{tab.sublabel}</span>
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
          >
            {images.map((img, index) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
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
                  className="w-full h-full object-cover min-h-[200px] md:min-h-[250px] transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    🔍
                  </span>
                </div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-sm font-medium">{img.caption}</p>
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
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxImg(null)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={lightboxImg.src}
              alt={lightboxImg.caption}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              className="absolute top-6 right-6 text-white text-3xl hover:text-brand-bamboo transition-colors"
              onClick={() => setLightboxImg(null)}
            >
              ✕
            </button>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
              {lightboxImg.caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
