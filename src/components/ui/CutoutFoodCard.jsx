'use client';

import { motion } from 'framer-motion';
import GlowBadge from './GlowBadge';

export default function CutoutFoodCard({ name, description, price, image, badge, badgeType = 'best', onClick, className = '' }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      className={`group relative overflow-visible rounded-2xl p-6 pb-4 min-h-[280px] bg-[#211C18] border border-white/5 hover:border-amber-500/30 transition-colors shadow-lg ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {badge && (
        <div className="absolute top-3 left-3 z-20">
          <GlowBadge type={badgeType}>{badge}</GlowBadge>
        </div>
      )}
      
      <div className="absolute top-[-24px] right-[-16px] w-[60%] aspect-square z-10 pointer-events-none">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-500 ease-out"
        />
      </div>

      <div className="relative z-10 mt-auto pt-32 h-full flex flex-col justify-end w-[80%] font-body">
        <h3 className="font-headline font-bold text-lg text-white line-clamp-2 uppercase leading-tight">{name}</h3>
        {description && <p className="text-sm text-gray-400 line-clamp-2 mt-2">{description}</p>}
        <p className="text-amber-400 font-bold text-xl mt-3 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">{price}</p>
      </div>
    </motion.div>
  );
}
