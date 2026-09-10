import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

export default function LocationContact() {
  const isOpen = (() => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 10 && hour < 23;
  })();

  return (
    <section id="vi-tri" className="section-padding bg-brand-bg-alt/95 text-brand-cream relative border-b border-brand-cream/15">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="TỚI DỐC MƠ QUÁN"
          subtitle="22 Đ. Nguyễn Ảnh Thủ, Bà Điểm, Hóc Môn — Đèn sáng đón anh em từ 10h sáng tới 23h đêm"
          emoji="📍"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 mt-10 sm:mt-12">
          {/* Google Maps embed */}
          <motion.div
            className="lg:col-span-3 rounded-2xl overflow-hidden border-2 border-brand-cream/30 shadow-2xl bg-brand-bg-deep min-h-[350px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8!2d106.606!3d10.865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b6c59ba4c67%3A0x535e784ed2a26458!2s22%20%C4%90.%20Nguy%E1%BB%85n%20%E1%BA%A2nh%20Th%E1%BB%A7%2C%20B%C3%A0%20%C4%90i%E1%BB%83m%2C%20H%C3%B3c%20M%C3%B4n%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vietnam!5e0!3m2!1svi!2s!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vị trí Dốc Mơ Quán"
              className="w-full h-full filter contrast-105"
            />
          </motion.div>

          {/* Contact info panel - Street signage style */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-brand-bg-deep border-2 border-brand-cream/35 rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-between shadow-2xl">
              <div>
                {/* Status indicator */}
                <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-brand-cream/20">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      isOpen ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]' : 'bg-rose-500'
                    }`}
                  />
                  <span className="font-stencil text-xs sm:text-sm font-bold tracking-wider text-brand-cream uppercase">
                    {isOpen ? '🟢 ĐÈN SÁNG ĐÓN KHÁCH' : '🔴 QUÁN ĐÃ ĐÓNG CỬA'}
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <span className="p-2 rounded bg-brand-bg text-brand-cream border border-brand-cream/30 text-lg">
                      📍
                    </span>
                    <div>
                      <p className="font-stencil text-xs text-brand-cream/60 font-black uppercase tracking-wider">
                        ĐỊA CHỈ QUÁN
                      </p>
                      <p className="font-retro text-sm sm:text-base font-bold text-brand-cream mt-1 leading-snug">
                        22 Đ. Nguyễn Ảnh Thủ, Bà Điểm,
                        <br />
                        Hóc Môn, TP. Hồ Chí Minh 70000
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3.5">
                    <span className="p-2 rounded bg-brand-bg text-brand-cream border border-brand-cream/30 text-lg">
                      ⏰
                    </span>
                    <div>
                      <p className="font-stencil text-xs text-brand-cream/60 font-black uppercase tracking-wider">
                        GIỜ PHỤC VỤ
                      </p>
                      <p className="font-retro text-sm sm:text-base font-bold text-brand-cream mt-1">
                        10:00 – 23:00
                      </p>
                      <p className="text-xs text-brand-cream/70 font-medium">Tất cả các ngày trong tuần</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <span className="p-2 rounded bg-brand-bg text-brand-cream border border-brand-cream/30 text-lg">
                      ☎
                    </span>
                    <div>
                      <p className="font-stencil text-xs text-brand-cream/60 font-black uppercase tracking-wider">
                        HOTLINE ĐẶT BÀN & MỒI
                      </p>
                      <a
                        href="tel:0984586248"
                        className="font-retro text-xl sm:text-2xl font-black text-brand-cream hover:underline tracking-tight block mt-1"
                      >
                        0984 586 248
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 space-y-3 pt-6 border-t border-brand-cream/20">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=22+Đ.+Nguyễn+Ảnh+Thủ,+Bà+Điểm,+Hóc+Môn,+Hồ+Chí+Minh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded bg-brand-cream text-brand-bg font-retro font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-brand-cream-light transition-all duration-300 hover:scale-[1.02] shadow-xl border border-brand-cream active:scale-95"
                >
                  <span>🛵</span>
                  <span>CHỈ ĐƯỜNG TỚI QUÁN NGAY</span>
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:0984586248"
                    className="flex items-center justify-center gap-1.5 py-3 px-3 rounded border-2 border-brand-cream text-brand-cream font-stencil font-extrabold text-xs uppercase tracking-wider hover:bg-brand-cream hover:text-brand-bg transition-all duration-300 shadow-md active:scale-95 text-center"
                  >
                    <span>☎</span>
                    <span>GỌI GIỮ BÀN</span>
                  </a>
                  <a
                    href="https://zalo.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-3 px-3 rounded bg-brand-cream/10 border border-brand-cream/40 text-brand-cream font-stencil font-extrabold text-xs uppercase tracking-wider hover:bg-brand-cream/20 transition-all duration-300 shadow-md active:scale-95 text-center"
                  >
                    <span>💬</span>
                    <span>CHAT ZALO</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
