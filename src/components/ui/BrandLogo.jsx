export default function BrandLogo({ variant = 'navbar', className = '' }) {
  if (variant === 'hero') {
    return (
      <div className={`inline-flex flex-col items-center select-none ${className}`}>
        {/* Emblem Frame with retro double border */}
        <div className="relative p-2.5 sm:p-3 rounded-2xl bg-brand-bg-deep border-2 border-brand-cream/40 shadow-2xl mb-4 group">
          {/* Street corner decorative notches */}
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-brand-cream" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-brand-cream" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-brand-cream" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-brand-cream" />

          {/* Pine Tree Logo Emblem */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 overflow-hidden rounded-xl flex items-center justify-center bg-brand-bg border border-brand-cream/20">
            <img
              src="/images/Logo/main_logo-removebg-preview.png"
              alt="Dốc Mơ Quán Logo"
              className="w-full h-full object-contain p-1 drop-shadow-md transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Brand Typography with Negative Space Cutout Badge */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-retro font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tighter text-brand-cream uppercase drop-shadow-lg">
              DỐC MƠ
            </span>
            {/* Reverse Contrast / Negative Space Cutout Badge for 'QUÁN' */}
            <span className="font-retro font-black text-sm sm:text-lg md:text-xl px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded bg-brand-cream text-brand-bg tracking-widest uppercase shadow-md border-2 border-brand-cream">
              QUÁN
            </span>
          </div>

          {/* Street Tagline */}
          <div className="flex items-center gap-2 mt-2">
            <span className="w-6 sm:w-10 h-[2px] bg-brand-cream/40" />
            <span className="font-stencil text-[11px] sm:text-xs uppercase tracking-[0.25em] text-brand-cream/80 font-bold">
              ẨM THỰC PHỐ • MỒI BÉN • SUM VẦY
            </span>
            <span className="w-6 sm:w-10 h-[2px] bg-brand-cream/40" />
          </div>
        </div>
      </div>
    );
  }

  // Default 'navbar' & 'footer' variant
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* Pine Tree Emblem */}
      <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-lg overflow-hidden bg-brand-bg-deep border border-brand-cream/30 p-0.5 shadow-sm">
        <img
          src="/images/Logo/main_logo-removebg-preview.png"
          alt="Dốc Mơ Quán"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className="font-retro font-extrabold text-xl sm:text-2xl tracking-tight text-brand-cream uppercase">
            DỐC MƠ
          </span>
          {/* Reverse Contrast Cutout Badge */}
          <span className="font-retro font-black text-[10px] sm:text-xs px-1.5 py-0.5 rounded-sm bg-brand-cream text-brand-bg tracking-wider uppercase">
            QUÁN
          </span>
        </div>
        <span className="font-stencil text-[9px] sm:text-[10px] tracking-[0.18em] text-brand-cream/70 font-semibold uppercase mt-1">
          ẨM THỰC PHỐ & LAI RAI
        </span>
      </div>
    </div>
  );
}
