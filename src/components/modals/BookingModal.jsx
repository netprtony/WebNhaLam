'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreBill, formatCurrency } from '../../context/PreBillContext';

const groupTypes = [
  { id: 'family', label: 'Gia đình', emoji: '👨‍👩‍👧‍👦', desc: 'Bàn ấm cúng, phù hợp cả nhà' },
  { id: 'friends', label: 'Nhậu bạn bè', emoji: '🍻', desc: 'Nhóm 4-10 người, vui tới bến' },
  { id: 'corporate', label: 'Tiệc công ty', emoji: '🏢', desc: 'Phòng VIP, có karaoke' },
];

const timeSlots = [
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00',
];

// Danh sách gợi ý món nhanh để chọn ngay trong modal đặt bàn
const QUICK_DISH_SUGGESTIONS = [
  { name: 'Lẩu Đặc Biệt Dốc Mơ Quán', price: '199K', image: '/images/foods/lau.png' },
  { name: 'Tôm Sốt Thái', price: '99K', image: '/images/image_rvbg/tomsotthai.png' },
  { name: 'Gỏi Bò Tái Chanh', price: '75K', image: '/images/image_rvbg/goibo.png' },
  { name: 'Cánh Gà Chiên Nước Mắm', price: '85K', image: '/images/foods/657806482_122186972114474964_8937428043533625050_n.jpg' },
  { name: 'Bò Lúc Lắc', price: '119K', image: '/images/foods/boluclac.png' },
  { name: 'Bia Tiger Nâu (Lon)', price: '18K', image: '/images/foods/475105117_122135548196474964_5587806538350282918_n.jpg' },
];

function StepIndicator({ current }) {
  const labels = ['Loại nhóm', 'Ngày & giờ', 'Chọn món', 'Thông tin'];
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6">
      {labels.map((label, i) => (
        <div key={i} className="flex items-center gap-1 sm:gap-2">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${
              i <= current
                ? 'bg-amber-500 text-charcoal shadow-glow-amber'
                : 'bg-charcoal-surface text-gray-500'
            }`}
          >
            {i < current ? '✓' : i + 1}
          </div>
          <span className={`text-[11px] sm:text-xs hidden md:block ${i <= current ? 'text-amber-400 font-bold' : 'text-gray-500'}`}>
            {label}
          </span>
          {i < labels.length - 1 && (
            <div className={`w-4 sm:w-6 h-0.5 ${i < current ? 'bg-amber-500' : 'bg-charcoal-surface'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// Bước 1: Loại nhóm
function Step1({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="font-headline text-2xl text-white text-center mb-4">Bạn đi tiệc với ai?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {groupTypes.map((group) => (
          <motion.button
            key={group.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange({ ...data, groupType: group.id })}
            className={`p-4 sm:p-5 rounded-2xl text-center transition-all duration-300 ${
              data.groupType === group.id
                ? 'neon-border-strong bg-amber-500/10'
                : 'bg-charcoal border border-white/5 hover:border-amber-500/20'
            }`}
          >
            <div className="text-3xl mb-2">{group.emoji}</div>
            <div className="font-bold text-white text-sm sm:text-base">{group.label}</div>
            <div className="text-xs text-gray-400 mt-1 leading-snug">{group.desc}</div>
            {data.groupType === group.id && (
              <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center mx-auto mt-2.5">
                <span className="text-charcoal text-xs font-bold">✓</span>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="mt-5">
        <label className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-2 block">
          Số lượng khách dự kiến
        </label>
        <div className="flex gap-2 flex-wrap">
          {['2-4', '5-8', '9-15', '16-30', '30+'].map((size) => (
            <button
              key={size}
              onClick={() => onChange({ ...data, partySize: size })}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                data.partySize === size
                  ? 'bg-amber-500 text-charcoal shadow-sm'
                  : 'bg-charcoal-surface text-gray-400 hover:text-white'
              }`}
            >
              {size} người
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Bước 2: Ngày & Giờ
function Step2({ data, onChange }) {
  const today = new Date().toISOString().split('T')[0];
  return (
    <div className="space-y-5">
      <h3 className="font-headline text-2xl text-white text-center mb-4">Chọn ngày & khung giờ</h3>
      <div>
        <label className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-2 block">
          Ngày đến quán
        </label>
        <input
          type="date"
          min={today}
          value={data.date || ''}
          onChange={(e) => onChange({ ...data, date: e.target.value })}
          className="w-full p-3 rounded-xl bg-charcoal-surface text-white border border-white/10 focus:border-amber-500 focus:outline-none transition text-sm"
        />
      </div>

      <div>
        <label className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-2 block">
          Khung giờ (Quán mở 16:00 – 23:00)
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => onChange({ ...data, time })}
              className={`p-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                data.time === time
                  ? 'bg-amber-500 text-charcoal font-black shadow-sm'
                  : 'bg-charcoal-surface text-gray-400 hover:text-white hover:border-amber-500/20 border border-transparent'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Bước 3: CHỌN MÓN ĂN TRƯỚC (Tạm tính)
function Step3PreOrder() {
  const { items, addItem, updateQuantity, removeItem, totalQuantity, totalPrice } = usePreBill();

  return (
    <div className="space-y-4">
      <div className="text-center mb-3">
        <h3 className="font-headline text-2xl text-white">Chọn món trước (Tạm tính)</h3>
        <p className="text-xs text-gray-400 mt-1">
          Bếp sẽ chuẩn bị sẵn nguyên liệu tươi để phục vụ bạn nhanh nhất khi đến bàn!
        </p>
      </div>

      {/* Danh sách món hiện tại trong bill */}
      {items.length > 0 ? (
        <div className="bg-charcoal p-3.5 rounded-2xl border border-amber-500/30 max-h-48 overflow-y-auto space-y-2.5">
          <div className="flex items-center justify-between text-xs text-gray-400 pb-1.5 border-b border-white/5">
            <span className="font-bold text-amber-300">Đã chọn {totalQuantity} món:</span>
            <span className="font-headline text-amber-400 text-sm">{formatCurrency(totalPrice)}</span>
          </div>

          {items.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-2 text-xs">
              <span className="text-white truncate flex-1">{item.name}</span>
              <span className="text-amber-400/90 whitespace-nowrap">{item.rawPrice}</span>

              <div className="flex items-center gap-1.5 bg-charcoal-surface rounded-lg px-1.5 py-0.5">
                <button
                  onClick={() => updateQuantity(item.name, -1)}
                  className="text-gray-300 hover:text-amber-400 px-1 font-bold"
                >
                  -
                </button>
                <span className="font-bold text-white px-1">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.name, 1)}
                  className="text-gray-300 hover:text-amber-400 px-1 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.name)}
                className="text-gray-500 hover:text-red-400 px-1"
                title="Bỏ món"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-charcoal/60 p-3.5 rounded-2xl border border-white/5 text-center text-xs text-gray-400">
          Chưa có món nào được chọn trước. Bạn có thể chọn nhanh các món đặc sản bên dưới hoặc chọn tại quán.
        </div>
      )}

      {/* Gợi ý món nhanh */}
      <div>
        <label className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-2 block">
          Gợi ý món mồi bén khuyên dùng:
        </label>
        <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
          {QUICK_DISH_SUGGESTIONS.map((dish) => {
            const inCart = items.find((i) => i.name === dish.name);
            return (
              <div
                key={dish.name}
                className="bg-charcoal p-2.5 rounded-xl border border-white/5 flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-white text-xs font-bold truncate">{dish.name}</p>
                  <p className="text-amber-400 text-[11px]">{dish.price}</p>
                </div>
                {inCart ? (
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                    ✓ {inCart.quantity}
                  </span>
                ) : (
                  <button
                    onClick={() => addItem(dish)}
                    className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-charcoal text-[11px] font-bold rounded-lg transition"
                  >
                    + Chọn
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Bước 4: Thông tin liên hệ & Tổng kết
function Step4({ data, onChange }) {
  const { items, totalQuantity, totalPrice } = usePreBill();

  return (
    <div className="space-y-4">
      <h3 className="font-headline text-2xl text-white text-center mb-3">Thông tin người đặt</h3>

      {/* Tóm tắt đặt bàn & món đã chọn */}
      <div className="bg-charcoal p-3.5 rounded-2xl border border-amber-500/20 text-xs space-y-1.5">
        <div className="flex justify-between text-gray-300">
          <span>Thời gian:</span>
          <span className="text-white font-bold">{data.date} lúc {data.time} ({data.partySize} khách)</span>
        </div>
        {items.length > 0 && (
          <div className="flex justify-between text-gray-300 pt-1 border-t border-white/5">
            <span>Món đặt trước ({totalQuantity} món):</span>
            <span className="text-amber-400 font-bold">{formatCurrency(totalPrice)}</span>
          </div>
        )}
      </div>

      <div>
        <label className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Họ và tên *</label>
        <input
          type="text"
          placeholder="Ví dụ: Anh Tuấn / Chị Lan"
          value={data.name || ''}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          className="w-full p-3 rounded-xl bg-charcoal-surface text-white border border-white/10 focus:border-amber-500 focus:outline-none transition text-sm placeholder:text-gray-600"
        />
      </div>

      <div>
        <label className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Số điện thoại *</label>
        <input
          type="tel"
          placeholder="0984 xxx xxx"
          value={data.phone || ''}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
          className="w-full p-3 rounded-xl bg-charcoal-surface text-white border border-white/10 focus:border-amber-500 focus:outline-none transition text-sm placeholder:text-gray-600"
        />
      </div>

      <div>
        <label className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Ghi chú (Tùy chọn)</label>
        <input
          type="text"
          placeholder="Yêu cầu phòng VIP, ghế trẻ em, tiệc sinh nhật..."
          value={data.note || ''}
          onChange={(e) => onChange({ ...data, note: e.target.value })}
          className="w-full p-3 rounded-xl bg-charcoal-surface text-white border border-white/10 focus:border-amber-500 focus:outline-none transition text-sm placeholder:text-gray-600"
        />
      </div>
    </div>
  );
}

// Màn hình thành công
function SuccessScreen({ data, onClose }) {
  const { items, totalPrice, clearBill } = usePreBill();
  const [copied, setCopied] = useState(false);

  const groupLabel = groupTypes.find((g) => g.id === data.groupType)?.label || 'Bàn tiệc';
  
  // Chuẩn bị nội dung gửi Zalo
  const dishesSummary = items.length > 0
    ? items.map((i) => `${i.name} (x${i.quantity})`).join(', ')
    : 'Chọn món tại quán';

  const bookingText = `[ĐẶT BÀN DỐC MƠ QUÁN]\n- Khách: ${data.name} (${data.phone})\n- Thời gian: ${data.time} ngày ${data.date}\n- Nhóm: ${groupLabel} (${data.partySize} người)\n- Món đã chọn trước: ${dishesSummary}\n- Tạm tính: ${items.length > 0 ? formatCurrency(totalPrice) : 'Tính tại quán'}\n- Ghi chú: ${data.note || 'Không'}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bookingText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFinish = () => {
    clearBill();
    onClose();
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center py-4 font-body"
    >
      <div className="text-5xl mb-3">🎉</div>
      <h3 className="font-headline text-2xl sm:text-3xl text-amber-400 mb-1">ĐÃ GHI NHẬN ĐẶT BÀN!</h3>
      <p className="text-gray-300 text-xs sm:text-sm mb-4">
        Dốc Mơ Quán sẽ gọi điện xác nhận bàn cho bạn trong ít phút.
      </p>

      {/* Chi tiết đơn đặt bàn */}
      <div className="bg-charcoal p-4 rounded-2xl text-left space-y-2 text-xs sm:text-sm border border-white/10 mb-5 max-h-52 overflow-y-auto">
        <p className="text-gray-300"><span className="text-gray-500">Khách hàng:</span> <strong className="text-white">{data.name}</strong> — {data.phone}</p>
        <p className="text-gray-300"><span className="text-gray-500">Thời gian:</span> <strong className="text-amber-400">{data.time}</strong> ngày <strong className="text-amber-400">{data.date}</strong></p>
        <p className="text-gray-300"><span className="text-gray-500">Số lượng:</span> {data.partySize} khách ({groupLabel})</p>
        
        {items.length > 0 && (
          <div className="pt-2 border-t border-white/10 space-y-1">
            <span className="text-gray-500 block">Thực đơn chọn trước ({items.length} món):</span>
            <ul className="list-disc pl-4 space-y-0.5 text-gray-200">
              {items.map((i) => (
                <li key={i.name}>
                  {i.name} <span className="text-amber-400">x{i.quantity}</span> ({i.rawPrice})
                </li>
              ))}
            </ul>
            <p className="text-amber-300 font-bold pt-1">
              Tổng tạm tính: {formatCurrency(totalPrice)}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
        <a
          href="https://zalo.me/0984586248"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 bg-[#0068FF] text-white rounded-xl font-bold text-xs sm:text-sm hover:brightness-110 transition flex items-center justify-center gap-2 shadow"
        >
          <span>💬</span>
          <span>Nhắn Zalo Quán Xác Nhận</span>
        </a>
        <button
          onClick={copyToClipboard}
          className="px-4 py-3 bg-charcoal-surface text-gray-300 rounded-xl font-bold text-xs sm:text-sm hover:text-white transition flex items-center justify-center gap-1.5 border border-white/10"
        >
          <span>📋</span>
          <span>{copied ? 'Đã sao chép!' : 'Sao chép thông tin'}</span>
        </button>
        <button
          onClick={handleFinish}
          className="px-4 py-3 bg-charcoal-mid text-gray-400 rounded-xl font-bold text-xs sm:text-sm hover:text-white transition"
        >
          Hoàn tất
        </button>
      </div>
    </motion.div>
  );
}

export default function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    groupType: 'friends',
    partySize: '5-8',
    date: new Date().toISOString().split('T')[0],
    time: '18:30',
    name: '',
    phone: '',
    note: '',
  });

  const canNext = useCallback(() => {
    if (step === 0) return data.groupType && data.partySize;
    if (step === 1) return data.date && data.time;
    if (step === 2) return true; // Bước chọn món (có thể bỏ qua)
    if (step === 3) return data.name?.trim() && data.phone?.trim();
    return false;
  }, [step, data]);

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setSubmitted(true);
      } catch (err) {
        console.error('Booking error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleClose = () => {
    setStep(0);
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 font-body">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal box */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-charcoal-light rounded-3xl p-5 sm:p-7 border border-amber-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[92vh] overflow-y-auto z-10"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-charcoal-surface flex items-center justify-center text-gray-400 hover:text-white transition text-xs font-bold"
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center mb-5">
              <h2 className="font-headline text-3xl text-amber-400 tracking-wide">
                🍖 ĐẶT BÀN GIỮ CHỖ
              </h2>
              <p className="text-gray-400 text-xs mt-0.5">
                Dốc Mơ Quán • 22 Đ. Nguyễn Ảnh Thủ, Hóc Môn • Hotline: 0984 586 248
              </p>
            </div>

            {submitted ? (
              <SuccessScreen data={data} onClose={handleClose} />
            ) : (
              <>
                <StepIndicator current={step} />

                {/* Step contents */}
                <div className="min-h-[290px]">
                  {step === 0 && <Step1 data={data} onChange={setData} />}
                  {step === 1 && <Step2 data={data} onChange={setData} />}
                  {step === 2 && <Step3PreOrder />}
                  {step === 3 && <Step4 data={data} onChange={setData} />}
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                  <button
                    onClick={handleBack}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition ${
                      step === 0
                        ? 'invisible'
                        : 'bg-charcoal-surface text-gray-300 hover:text-white'
                    }`}
                  >
                    ← Quay lại
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!canNext() || loading}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 ${
                      canNext() && !loading
                        ? 'bg-gradient-to-r from-chiliRed to-amber-500 text-white shadow-glow-amber hover:brightness-110 active:scale-95'
                        : 'bg-charcoal-surface text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {loading ? (
                      <span>Đang gửi thông tin...</span>
                    ) : step === 3 ? (
                      'Xác nhận đặt bàn →'
                    ) : step === 2 ? (
                      'Tiếp tục điền thông tin →'
                    ) : (
                      'Tiếp theo →'
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
