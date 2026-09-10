'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { rooms } from '../../data/rooms';
import ImageLightboxModal from '../ui/ImageLightboxModal';

const AtmosphereRooms = () => {
  const block1 = rooms?.[0];
  const block2 = rooms?.[1];
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="khong-gian" className="py-20 md:py-32 px-4 md:px-8 bg-charcoal-light overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <h2 className="font-headline text-4xl md:text-5xl text-center text-white mb-2 uppercase">
          KHÔNG GIAN TIỆC TÙNG
        </h2>
        <p className="text-amber-400 text-center mb-12 font-body text-base md:text-lg">
          Thoáng mát ngoài trời hay ấm cúng VIP máy lạnh — Bấm vào hình ảnh để xem phóng to
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Block 1 (Không gian ngoài trời) */}
          {block1 && (
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-charcoal border border-amber-500/20 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🏮</span>
                <h3 className="font-headline text-2xl text-amber-400 uppercase tracking-wide">
                  {block1.title}
                </h3>
              </div>
              <p className="text-gray-400 text-sm mb-6 font-body">
                {block1.subtitle} — {block1.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {block1.images?.map((photo, i) => (
                  <div
                    key={i}
                    onClick={() => setLightbox({ src: photo.src, title: block1.title, caption: photo.caption })}
                    className="relative group overflow-hidden rounded-xl aspect-[4/3] bg-charcoal-mid border border-white/5 cursor-pointer"
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption || `Không gian ngoài trời ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 text-xs text-white/95 font-medium line-clamp-1 drop-shadow">
                      {photo.caption}
                    </div>
                    <div className="absolute top-2 right-2 bg-charcoal/80 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition">
                      🔍 Xem
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Block 2 (Phòng riêng VIP) */}
          {block2 && (
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-charcoal border border-amber-500/20 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎤</span>
                <h3 className="font-headline text-2xl text-amber-400 uppercase tracking-wide">
                  {block2.title}
                </h3>
              </div>
              <p className="text-gray-400 text-sm mb-6 font-body">
                {block2.subtitle} — {block2.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {block2.images?.map((photo, i) => (
                  <div
                    key={i}
                    onClick={() => setLightbox({ src: photo.src, title: block2.title, caption: photo.caption })}
                    className="relative group overflow-hidden rounded-xl aspect-[4/3] bg-charcoal-mid border border-white/5 cursor-pointer"
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption || `Phòng VIP ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 text-xs text-white/95 font-medium line-clamp-1 drop-shadow">
                      {photo.caption}
                    </div>
                    <div className="absolute top-2 right-2 bg-charcoal/80 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition">
                      🔍 Xem
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Lightbox zoom modal */}
        <ImageLightboxModal
          isOpen={!!lightbox}
          onClose={() => setLightbox(null)}
          imageSrc={lightbox?.src}
          title={lightbox?.title}
          caption={lightbox?.caption}
        />
      </div>
    </section>
  );
};

export default AtmosphereRooms;
