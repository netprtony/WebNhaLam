import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

export default function LocationContact() {
  const isOpen = (() => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 10 && hour < 23;
  })();

  return (
    <section id="vi-tri" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Tìm Đến Dốc Mơ"
          subtitle="Chỉ cần một cuộc gọi hoặc một cú nhấp — chúng tôi luôn sẵn sàng đón bạn"
          emoji="📍"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
          {/* Google Maps embed */}
          <motion.div
            className="lg:col-span-3 rounded-2xl overflow-hidden warm-shadow"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8!2d106.606!3d10.865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b6c59ba4c67%3A0x535e784ed2a26458!2s22%20%C4%90.%20Nguy%E1%BB%85n%20%E1%BA%A2nh%20Th%E1%BB%A7%2C%20B%C3%A0%20%C4%90i%E1%BB%83m%2C%20H%C3%B3c%20M%C3%B4n%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vietnam!5e0!3m2!1svi!2s!4v1"
              width="100%"
              height="400"
              style={{ border: 0, minHeight: '350px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vị trí Dốc Mơ"
              className="w-full h-full"
            />
          </motion.div>

          {/* Contact info panel */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-brand-cream rounded-2xl p-6 md:p-8 h-full">
              {/* Status */}
              <div className="flex items-center gap-2 mb-6">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-400'
                  }`}
                />
                <span className="font-semibold text-brand-olive">
                  {isOpen ? 'Đang mở cửa' : 'Đã đóng cửa'}
                </span>
              </div>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">📍</span>
                  <div>
                    <p className="font-semibold text-brand-charcoal">Địa chỉ</p>
                    <p className="text-sm text-brand-charcoal/70 mt-1">
                      22 Đ. Nguyễn Ảnh Thủ, Bà Điểm,
                      <br />
                      Hóc Môn, TP. Hồ Chí Minh 70000
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">🕒</span>
                  <div>
                    <p className="font-semibold text-brand-charcoal">Giờ hoạt động</p>
                    <p className="text-sm text-brand-charcoal/70 mt-1">
                      10:00 – 23:00
                      <br />
                      Tất cả các ngày trong tuần
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">📞</span>
                  <div>
                    <p className="font-semibold text-brand-charcoal">Hotline</p>
                    <a
                      href="tel:0984586248"
                      className="text-brand-clay font-semibold text-lg hover:underline"
                    >
                      0984 586 248
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="mt-8 space-y-3">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=22+Đ.+Nguyễn+Ảnh+Thủ,+Bà+Điểm,+Hóc+Môn,+Hồ+Chí+Minh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-brand-olive text-white font-semibold hover:bg-brand-olive-dark transition-all duration-300 hover:scale-[1.02] shadow-md"
                >
                  📍 Chỉ Đường Ngay
                </a>
                <a
                  href="tel:0984586248"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-brand-clay text-white font-semibold hover:bg-brand-clay-dark transition-all duration-300 hover:scale-[1.02] shadow-md"
                >
                  📞 Gọi Đặt Bàn
                </a>
                <a
                  href="https://zalo.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-zalo text-white font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-[1.02] shadow-md"
                >
                  💬 Nhắn Tin Zalo
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
