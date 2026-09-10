'use client';

export default function GlowBadge({ children, type = 'best', className = '', rotate }) {
  const rotation = rotate !== undefined ? rotate : Math.floor(Math.random() * 9) - 4;
  
  const typeStyles = {
    best: 'bg-amber-500/90 text-[#1A1714] border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.5)]',
    hot: 'bg-[#E8452C]/90 text-white border-[#E8452C]/30 shadow-[0_0_10px_rgba(232,69,44,0.5)]',
    new: 'bg-[#FFE14D]/90 text-[#1A1714] border-[#FFE14D]/30 shadow-[0_0_10px_rgba(255,225,77,0.5)]'
  };

  return (
    <div 
      className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm border font-body ${typeStyles[type]} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </div>
  );
}
