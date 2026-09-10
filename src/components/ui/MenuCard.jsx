export default function MenuCard({ item, onSelect }) {
  return (
    <div
      onClick={() => onSelect && onSelect(item)}
      className="group relative overflow-hidden rounded-2xl bg-brand-bg-surface border-2 border-brand-cream/20 hover:border-brand-cream hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 h-full cursor-pointer flex flex-col justify-between"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] bg-brand-bg-deep">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-surface via-brand-bg-surface/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Street Badge */}
        {item.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded font-stencil text-xs font-black uppercase bg-brand-cream text-brand-bg shadow-md border border-brand-cream tracking-wide">
            {item.badge}
          </span>
        )}
      </div>

      {/* Info Container */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-retro text-base sm:text-lg font-black text-brand-cream group-hover:text-brand-cream-light uppercase tracking-tight transition-colors">
            {item.name}
          </h3>
          <p className="text-xs sm:text-sm text-brand-cream/70 mt-1.5 line-clamp-2 font-medium leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-cream/15">
          <span className="font-retro text-xl sm:text-2xl font-black text-brand-cream tracking-tight">
            {item.price}
          </span>
          <span className="font-stencil text-xs text-brand-cream/70 group-hover:text-brand-cream font-bold tracking-wider uppercase flex items-center gap-1 transition-colors">
            <span>CHI TIẾT</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
