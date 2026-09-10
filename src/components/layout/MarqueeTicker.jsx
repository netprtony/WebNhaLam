'use client';

export default function MarqueeTicker() {
  const content = "🔥 ĐẶT BÀN TRƯỚC GIẢM 10% • HƠN 100+ MÓN NHẬU BÉN • PHÒNG RIÊNG VIP CÓ HÁT KARAOKE • ĐẶT TIỆC LIÊN HOAN - SINH NHẬT 🔥";
  return (
    <div className="w-full bg-gradient-to-r from-[#E8452C] to-amber-500 overflow-hidden whitespace-nowrap py-2 text-white font-bold uppercase text-xs md:text-sm tracking-wider flex group">
      <div className="animate-[marquee_25s_linear_infinite] inline-block group-hover:[animation-play-state:paused]">
        {content} &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div className="animate-[marquee_25s_linear_infinite] inline-block group-hover:[animation-play-state:paused]">
        {content} &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );
}
