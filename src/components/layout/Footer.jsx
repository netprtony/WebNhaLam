import BrandLogo from '../ui/BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-brand-bg-deep border-t-2 border-brand-cream/20 text-brand-cream select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <BrandLogo variant="navbar" />
            </div>
            <p className="text-brand-cream/70 text-xs sm:text-sm leading-relaxed font-medium mt-3">
              Dốc Mơ Quán — Nơi anh em bằng hữu nâng ly, gia đình quây quần ấm cúng. Mồi bén bia lạnh, đậm đà hương vị quê nhà giữa lòng phố thị.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-stencil text-xs font-black uppercase tracking-widest text-brand-cream mb-4 pb-2 border-b border-brand-cream/20">
              ĐIỀU HƯỚNG NHANH
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-stencil tracking-wider">
              {[
                { label: 'KÈO THƠM ƯU ĐÃI', id: 'khuyen-mai' },
                { label: 'MỒI TỦ ĐẶC SẮC', id: 'mon-ngon' },
                { label: 'BẢNG MỒI ĐẦY ĐỦ', id: 'thuc-don' },
                { label: 'GÓC QUÁN & VỈA HÈ', id: 'khong-gian' },
                { label: 'ANH EM NÓI GÌ', id: 'danh-gia' },
                { label: 'ĐƯỜNG TỚI QUÁN', id: 'vi-tri' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-brand-cream/70 hover:text-brand-cream transition-colors flex items-center gap-1.5"
                  >
                    <span>▸</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-stencil text-xs font-black uppercase tracking-widest text-brand-cream mb-4 pb-2 border-b border-brand-cream/20">
              THÔNG TIN QUÁN
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-base">📍</span>
                <span className="text-brand-cream/80">22 Đ. Nguyễn Ảnh Thủ, Bà Điểm, Hóc Môn, TP. Hồ Chí Minh 70000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-base">⏰</span>
                <span className="text-brand-cream/80 font-stencil uppercase tracking-wider">10:00 – 23:00 Hằng Ngày</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-base">☎</span>
                <a href="tel:0984586248" className="text-brand-cream font-retro font-black text-base hover:underline tracking-tight">
                  0984 586 248
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-brand-cream/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-cream/50 font-stencil tracking-wider uppercase">
          <p>© 2026 DỐC MƠ QUÁN — ẨM THỰC PHỐ & BÀN NHẬU SUM VẦY. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-brand-cream transition-colors">FACEBOOK</a>
            <a href="#" className="hover:text-brand-cream transition-colors">TIKTOK</a>
            <a href="https://zalo.me/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cream transition-colors">ZALO OA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
