'use client';

export default function Footer() {
  return (
    <footer className="bg-[#1A1714] border-t border-white/5 pt-12 pb-8 md:pb-12 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img
                src="/images/Logo/main_logo-removebg-preview.png"
                alt="Dốc Mơ Quán Logo"
                className="h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(245,166,35,0.4)]"
              />
              <span className="ml-3 font-headline font-bold text-amber-400 text-2xl tracking-wider">DỐC MƠ QUÁN</span>
            </div>
            <p className="text-gray-400 italic">"Ăn Hết Mình, Uống Nhiệt Tình"</p>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-4 uppercase">Liên Hệ</h3>
            <ul className="text-gray-400 space-y-2">
              <li>📍 22 Đ. Nguyễn Ảnh Thủ, Bà Điểm, Hóc Môn, TP.HCM</li>
              <li>📞 Hotline: <a href="tel:0984586248" className="text-amber-400 hover:underline">0984 586 248</a></li>
              <li>⏰ Giờ mở cửa: 16:00 - 23:00</li>
            </ul>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-bold text-lg mb-4 uppercase">Kết Nối</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:opacity-80 transition font-bold">FB</a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white hover:opacity-80 transition font-bold">ZL</a>
            </div>
            <div className="w-full max-w-[250px] h-24 bg-zinc-800 border border-white/10 rounded flex items-center justify-center text-gray-500 text-sm">
              [ Bản đồ Google Maps ]
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-8 pt-8 text-center mb-16 md:mb-0">
          <p className="text-gray-500 text-sm">© 2024 Dốc Mơ Quán. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
