export default function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-2xl p-6 warm-shadow hover:warm-shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col border border-brand-cream-dark/50">
      {/* Stars */}
      <div className="flex gap-0.5 text-yellow-400 text-sm mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <span key={i}>⭐</span>
        ))}
        {Array.from({ length: 5 - review.rating }).map((_, i) => (
          <span key={i} className="opacity-30">⭐</span>
        ))}
      </div>

      {/* Text */}
      <p className="text-brand-charcoal/80 text-sm leading-relaxed flex-1 italic">
        "{review.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-brand-cream">
        <span className="text-2xl">{review.avatar}</span>
        <div>
          <p className="font-semibold text-brand-charcoal text-sm">{review.name}</p>
          <p className="text-xs text-brand-charcoal/40">{review.date}</p>
        </div>
      </div>
    </div>
  );
}
