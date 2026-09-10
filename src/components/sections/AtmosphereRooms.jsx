'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { rooms } from '../../data/rooms';

const AtmosphereRooms = () => {
  // Use rooms data if available, otherwise fallback to empty arrays to prevent mapping errors.
  const roomList = rooms || [];
  
  // Split into two blocks for the design if enough data, or just take first two
  const block1 = roomList[0];
  const block2 = roomList[1];

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-charcoal-light overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <h2 className="font-headline text-4xl md:text-5xl text-center text-white mb-2 uppercase">KHÔNG GIAN TIỆC TÙNG</h2>
        <p className="text-amber-400 text-center mb-12 font-body">
          Thoáng mát ngoài trời hay ấm cúng VIP — tuỳ bạn chọn
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Block 1 (Left) */}
          {block1 && (
            <motion.div 
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-charcoal border border-gray-800 rounded-2xl p-6"
            >
              <h3 className="font-headline text-2xl text-amber-400 mb-2">{block1.title || 'Không Gian Sân Vườn'}</h3>
              <p className="text-gray-400 text-sm mb-4 font-body">{block1.subtitle || 'Thoáng đãng, nhộn nhịp, thích hợp tụ tập bạn bè đông người.'}</p>
              
              <div className="grid grid-cols-2 gap-3">
                {(block1.photos || []).slice(0, 4).map((photo, i) => (
                  <div key={i} className="relative group overflow-hidden rounded-xl aspect-[4/3]">
                    <img 
                      src={photo.url || photo} 
                      alt={`Khong gian ${i+1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {photo.caption && (
                      <div className="absolute bottom-2 left-2 text-xs text-white/90 bg-black/50 px-2 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {photo.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Block 2 (Right) */}
          {block2 && (
            <motion.div 
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-charcoal border border-gray-800 rounded-2xl p-6"
            >
              <h3 className="font-headline text-2xl text-amber-400 mb-2">{block2.title || 'Phòng VIP Tiệc Tùng'}</h3>
              <p className="text-gray-400 text-sm mb-4 font-body">{block2.subtitle || 'Riêng tư, sang trọng, có karaoke hiện đại cho tiệc liên hoan.'}</p>
              
              <div className="grid grid-cols-2 gap-3">
                {(block2.photos || []).slice(0, 4).map((photo, i) => (
                  <div key={i} className="relative group overflow-hidden rounded-xl aspect-[4/3]">
                    <img 
                      src={photo.url || photo} 
                      alt={`Phong VIP ${i+1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {photo.caption && (
                      <div className="absolute bottom-2 left-2 text-xs text-white/90 bg-black/50 px-2 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {photo.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};

export default AtmosphereRooms;
