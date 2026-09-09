export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-brand-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/Logo/main_logo-removebg-preview.webp"
                alt="Dốc Mơ"
                className="h-12 w-auto"
              />
              <span className="font-display text-2xl font-bold text-brand-cream">
                Dốc Mơ
              </span>
            </div>
            <p className="text-brand-cream/60 text-sm leading-relaxed">
              Ẩm Thực Việt — Nơi gia đình quây quần, bạn bè nâng ly.
              Mỗi món ăn là một câu chuyện quê nhà.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-brand-bamboo mb-4">
              Liên Kết Nhanh
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Món Ngon', id: 'mon-ngon' },
                { label: 'Không Gian', id: 'khong-gian' },
                { label: 'Đánh Giá', id: 'danh-gia' },
                { label: 'Vị Trí', id: 'vi-tri' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-brand-bamboo transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold text-brand-bamboo mb-4">
              Liên Hệ
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>22 Đ. Nguyễn Ảnh Thủ, Bà Điểm, Hóc Môn, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🕒</span>
                <span>10:00 – 23:00, tất cả các ngày</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:0984586248" className="hover:text-brand-bamboo transition-colors">
                  0984 586 248
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-cream/40">
          <p>© 2024 Dốc Mơ — Ẩm Thực Việt. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-brand-bamboo transition-colors">Facebook</a>
            <a href="#" className="hover:text-brand-bamboo transition-colors">Instagram</a>
            <a href="https://zalo.me/" className="hover:text-brand-bamboo transition-colors">Zalo</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
