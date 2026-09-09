export default function MenuCard({ item, onSelect }) {
  return (
    <div
      onClick={() => onSelect && onSelect(item)}
      className="group relative overflow-hidden rounded-2xl bg-white warm-shadow hover:warm-shadow-lg transition-all duration-300 hover:-translate-y-1 h-full cursor-pointer flex flex-col justify-between"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        {item.badge && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${item.badgeColor} shadow-md`}
          >
            {item.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display text-lg font-bold text-brand-charcoal group-hover:text-brand-olive transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-brand-charcoal/60 mt-1 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-brand-clay">{item.price}</span>
          <span className="text-xs text-brand-charcoal/40 group-hover:text-brand-olive transition-colors">
            Xem chi tiết →
          </span>
        </div>
      </div>
    </div>
  );
}
