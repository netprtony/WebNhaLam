export default function ReviewCard({ review }) {
  return (
    <div className="bg-brand-bg-surface border-2 border-brand-cream/20 hover:border-brand-cream rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between text-brand-cream">
      <div>
        {/* Stars */}
        <div className="flex gap-1 text-sm mb-3">
          {Array.from({ length: review.rating }).map((_, i) => (
            <span key={i}>⭐</span>
          ))}
          {Array.from({ length: 5 - review.rating }).map((_, i) => (
            <span key={i} className="opacity-30">⭐</span>
          ))}
        </div>

        {/* Text */}
        <p className="text-brand-cream/85 text-xs sm:text-sm leading-relaxed italic font-medium">
          "{review.text}"
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-brand-cream/15">
        <span className="text-2xl p-1 rounded-full bg-brand-bg-deep border border-brand-cream/20">
          {review.avatar}
        </span>
        <div>
          <p className="font-retro font-bold text-brand-cream text-xs sm:text-sm uppercase tracking-tight">
            {review.name}
          </p>
          <p className="font-stencil text-[11px] text-brand-cream/60 tracking-wider">
            {review.date}
          </p>
        </div>
      </div>
    </div>
  );
}
