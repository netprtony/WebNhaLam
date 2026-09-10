'use client';

export default function Footer() {
  return (
    <footer className="bg-[#1A1714] border-t border-white/5 pt-12 pb-8 md:pb-12 font-body text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center md:text-left">
          
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img
                src="/images/Logo/main_logo-removebg-preview.png"
                alt="Dốc Mơ Quán Logo"
                className="h-14 w-auto object-contain drop-shadow-[0_0_12px_rgba(245,166,35,0.4)]"
              />
              <span className="ml-3 font-headline font-bold text-amber-400 text-2xl tracking-wider">
                DỐC MƠ QUÁN
              </span>
            </div>
            <p className="text-amber-300/80 italic text-base mb-4">"Ăn Hết Mình, Uống Nhiệt Tình"</p>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-4">
              Quán nhậu gia đình ấm cúng, thoáng đãng tại Hóc Môn. Hơn 100 món nhậu bén, lẩu nướng bốc khói cùng không gian phòng riêng VIP karaoke hiện đại.
            </p>
            
            {/* Mạng xã hội */}
            <div className="flex items-center gap-3">
              <a
                href="https://zalo.me/0984586248"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#0068FF] hover:bg-blue-600 text-white text-xs font-bold px-3.5 py-2 rounded-full transition shadow-sm"
              >
                <span>💬</span>
                <span>Zalo Quán</span>
              </a>
              <a
                href="tel:0984586248"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-charcoal text-xs font-bold px-3.5 py-2 rounded-full transition shadow-sm"
              >
                <span>📞</span>
                <span>Gọi Đặt Bàn</span>
              </a>
            </div>
          </div>
          
          {/* Cột 2: Thông tin liên hệ & giờ phục vụ */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-headline text-xl mb-4 tracking-wide uppercase text-amber-400">
              Thông Tin Liên Hệ
            </h3>
            <ul className="text-gray-300 space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5 justify-center md:justify-start">
                <span className="text-amber-400 text-lg">📍</span>
                <div>
                  <strong className="text-white">Địa chỉ:</strong>
                  <p className="text-gray-400 mt-0.5">22 Đ. Nguyễn Ảnh Thủ, Bà Điểm, Hóc Môn, TP.HCM</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5 justify-center md:justify-start">
                <span className="text-amber-400 text-lg">📞</span>
                <div>
                  <strong className="text-white">Hotline:</strong>
                  <p className="mt-0.5">
                    <a href="tel:0984586248" className="text-amber-400 font-bold hover:underline">
                      0984 586 248
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2.5 justify-center md:justify-start">
                <span className="text-amber-400 text-lg">⏰</span>
                <div>
                  <strong className="text-white">Giờ mở cửa:</strong>
                  <p className="text-green-400 font-semibold mt-0.5">16:00 – 23:00 (Mỗi ngày)</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Cột 3: Bản đồ Google Maps */}
          <div className="flex flex-col items-center md:items-start w-full">
            <div className="flex items-center justify-between w-full max-w-[340px] mb-3">
              <h3 className="text-white font-headline text-xl tracking-wide uppercase text-amber-400">
                Vị Trí Bản Đồ
              </h3>
              <a
                href="https://maps.google.com/?q=22+Nguyễn+Ảnh+Thủ+Bà+Điểm+Hóc+Môn"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-amber-400 hover:text-amber-300 font-medium underline"
              >
                Mở Google Maps ↗
              </a>
            </div>
            
            <div className="w-full max-w-[340px] h-48 rounded-xl overflow-hidden border border-amber-500/30 shadow-[0_6px_25px_rgba(0,0,0,0.5)] relative group bg-charcoal-mid">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8!2d106.606!3d10.865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b6c59ba4c67%3A0x535e784ed2a26458!2s22%20%C4%90.%20Nguy%E1%BB%85n%20%E1%BA%A2nh%20Th%E1%BB%A7%2C%20B%C3%A0%20%C4%90i%E1%BB%83m%2C%20H%C3%B3c%20M%C3%B4n%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vietnam!5e0!3m2!1svi!2s!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ vị trí Dốc Mơ Quán"
                className="w-full h-full"
              />
              <a
                href="https://maps.google.com/?q=22+Nguyễn+Ảnh+Thủ+Bà+Điểm+Hóc+Môn"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-2 right-2 bg-charcoal/90 hover:bg-amber-500 hover:text-charcoal text-white text-[11px] font-bold px-2.5 py-1 rounded-md border border-white/20 transition-all shadow"
              >
                📍 Chỉ đường
              </a>
            </div>
          </div>

        </div>
        
        {/* Bản quyền */}
        <div className="border-t border-white/5 mt-10 pt-6 text-center mb-16 md:mb-0">
          <p className="text-gray-500 text-xs md:text-sm">
            © 2024 Dốc Mơ Quán • 22 Đ. Nguyễn Ảnh Thủ, Hóc Môn, TP.HCM • Hotline: 0984 586 248
          </p>
        </div>
      </div>
    </footer>
  );
}
