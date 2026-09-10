'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = ['group', 'datetime', 'info'];

const groupTypes = [
  { id: 'family', label: 'Gia đình', emoji: '👨‍👩‍👧‍👦', desc: 'Bàn ấm cúng, phù hợp cả nhà' },
  { id: 'friends', label: 'Nhậu bạn bè', emoji: '🍻', desc: 'Nhóm 4-10 người, vui tới bến' },
  { id: 'corporate', label: 'Tiệc công ty', emoji: '🏢', desc: 'Phòng VIP, có karaoke' },
];

const timeSlots = [
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00',
];

function StepIndicator({ current }) {
  const labels = ['Loại nhóm', 'Ngày & giờ', 'Thông tin'];
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {labels.map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              i <= current
                ? 'bg-amber text-charcoal shadow-glow-amber'
                : 'bg-charcoal-surface text-gray-500'
            }`}
          >
            {i < current ? '✓' : i + 1}
          </div>
          <span className={`text-xs hidden sm:block ${i <= current ? 'text-amber-400' : 'text-gray-500'}`}>
            {label}
          </span>
          {i < labels.length - 1 && (
            <div className={`w-8 h-0.5 ${i < current ? 'bg-amber' : 'bg-charcoal-surface'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Step1({ data, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="font-headline text-2xl text-white text-center mb-6">Bạn đi với ai?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {groupTypes.map((group) => (
          <motion.button
            key={group.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange({ ...data, groupType: group.id })}
            className={`p-6 rounded-2xl text-center transition-all duration-300 ${
              data.groupType === group.id
                ? 'neon-border-strong bg-amber/10'
                : 'card-surface hover:border-amber/20'
            }`}
          >
            <div className="text-4xl mb-3">{group.emoji}</div>
            <div className="font-bold text-white">{group.label}</div>
            <div className="text-xs text-gray-400 mt-1">{group.desc}</div>
            {data.groupType === group.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 bg-amber rounded-full flex items-center justify-center mx-auto mt-3"
              >
                <span className="text-charcoal text-xs font-bold">✓</span>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
      <div className="mt-6">
        <label className="text-gray-400 text-sm mb-2 block">Số người</label>
        <div className="flex gap-2 flex-wrap">
          {['2-4', '5-8', '9-15', '15+'].map((size) => (
            <button
              key={size}
              onClick={() => onChange({ ...data, partySize: size })}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                data.partySize === size
                  ? 'bg-amber text-charcoal'
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

function Step2({ data, onChange }) {
  const today = new Date().toISOString().split('T')[0];
  return (
    <div className="space-y-6">
      <h3 className="font-headline text-2xl text-white text-center mb-6">Chọn ngày & giờ</h3>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">Ngày đặt</label>
        <input
          type="date"
          min={today}
          value={data.date || ''}
          onChange={(e) => onChange({ ...data, date: e.target.value })}
          className="w-full p-3 rounded-xl bg-charcoal-surface text-white border border-white/10 focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/30 transition"
        />
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">Khung giờ</label>
        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => onChange({ ...data, time })}
              className={`p-3 rounded-xl text-sm font-bold transition-all ${
                data.time === time
                  ? 'bg-amber text-charcoal neon-border-strong'
                  : 'bg-charcoal-surface text-gray-400 hover:text-white hover:border-amber/20 border border-transparent'
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

function Step3({ data, onChange }) {
  return (
    <div className="space-y-6">
      <h3 className="font-headline text-2xl text-white text-center mb-6">Thông tin liên hệ</h3>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">Họ tên</label>
        <input
          type="text"
          placeholder="Nguyễn Văn A"
          value={data.name || ''}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          className="w-full p-3 rounded-xl bg-charcoal-surface text-white border border-white/10 focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/30 transition placeholder:text-gray-600"
        />
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">Số điện thoại</label>
        <input
          type="tel"
          placeholder="0912 345 678"
          value={data.phone || ''}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
          className="w-full p-3 rounded-xl bg-charcoal-surface text-white border border-white/10 focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/30 transition placeholder:text-gray-600"
        />
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">Ghi chú (không bắt buộc)</label>
        <textarea
          rows={3}
          placeholder="Yêu cầu đặc biệt, sinh nhật, dị ứng..."
          value={data.note || ''}
          onChange={(e) => onChange({ ...data, note: e.target.value })}
          className="w-full p-3 rounded-xl bg-charcoal-surface text-white border border-white/10 focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/30 transition resize-none placeholder:text-gray-600"
        />
      </div>
    </div>
  );
}

function SuccessScreen({ data, onClose }) {
  const groupLabel = groupTypes.find((g) => g.id === data.groupType)?.label || '';
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center py-8"
    >
      <div className="text-6xl mb-4">🎉</div>
      <h3 className="font-headline text-3xl text-amber-400 mb-2">Đặt bàn thành công!</h3>
      <p className="text-gray-400 mb-6">Chúng tôi sẽ xác nhận qua điện thoại trong vài phút.</p>
      <div className="card-surface p-4 rounded-xl text-left space-y-2 mb-6">
        <p className="text-gray-300"><span className="text-gray-500">Loại:</span> {groupLabel}</p>
        <p className="text-gray-300"><span className="text-gray-500">Số người:</span> {data.partySize}</p>
        <p className="text-gray-300"><span className="text-gray-500">Ngày:</span> {data.date}</p>
        <p className="text-gray-300"><span className="text-gray-500">Giờ:</span> {data.time}</p>
        <p className="text-gray-300"><span className="text-gray-500">Tên:</span> {data.name}</p>
        <p className="text-gray-300"><span className="text-gray-500">SĐT:</span> {data.phone}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="https://zalo.me/0984586248"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-[#0068FF] text-white rounded-full font-bold hover:brightness-110 transition"
        >
          💬 Nhắn Zalo Xác Nhận
        </a>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-charcoal-surface text-gray-300 rounded-full font-bold hover:text-white transition"
        >
          Đóng
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
    groupType: '',
    partySize: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    note: '',
  });

  const canNext = useCallback(() => {
    if (step === 0) return data.groupType && data.partySize;
    if (step === 1) return data.date && data.time;
    if (step === 2) return data.name && data.phone;
    return false;
  }, [step, data]);

  const handleNext = async () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Submit
      setLoading(true);
      try {
        // In production, this would POST to /api/booking
        // For now, simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
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
    setData({ groupType: '', partySize: '', date: '', time: '', name: '', phone: '', note: '' });
    onClose();
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
  };

  const [direction, setDirection] = useState(1);

  const goNext = () => {
    setDirection(1);
    handleNext();
  };

  const goBack = () => {
    setDirection(-1);
    handleBack();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-charcoal-light rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-charcoal-surface flex items-center justify-center text-gray-400 hover:text-white transition"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="font-headline text-3xl text-amber-400 text-center mb-2">
              🍖 ĐẶT BÀN
            </h2>
            <p className="text-gray-500 text-sm text-center mb-6">
              Đặt trước giảm 10% — xác nhận nhanh qua Zalo
            </p>

            {submitted ? (
              <SuccessScreen data={data} onClose={handleClose} />
            ) : (
              <>
                <StepIndicator current={step} />

                {/* Step content with slide animation */}
                <div className="min-h-[300px] relative overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      {step === 0 && <Step1 data={data} onChange={setData} />}
                      {step === 1 && <Step2 data={data} onChange={setData} />}
                      {step === 2 && <Step3 data={data} onChange={setData} />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={goBack}
                    className={`px-6 py-3 rounded-full font-bold transition ${
                      step === 0
                        ? 'invisible'
                        : 'bg-charcoal-surface text-gray-300 hover:text-white'
                    }`}
                  >
                    ← Quay lại
                  </button>
                  <button
                    onClick={goNext}
                    disabled={!canNext() || loading}
                    className={`px-8 py-3 rounded-full font-bold transition ${
                      canNext() && !loading
                        ? 'bg-gradient-to-r from-chiliRed to-amber text-white shadow-glow-amber hover:brightness-110'
                        : 'bg-charcoal-surface text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Đang gửi...
                      </span>
                    ) : step === 2 ? (
                      'Xác nhận đặt bàn →'
                    ) : (
                      'Tiếp theo →'
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
