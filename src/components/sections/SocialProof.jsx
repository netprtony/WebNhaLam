'use client';

import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
  { id: 1, name: 'Anh Minh T.', avatar: '🧑', rating: 5, text: 'Mồi ngon, bia lạnh, phục vụ nhanh — đúng chất quán nhậu gia đình. 10 điểm!', date: '2 tuần trước' },
  { id: 2, name: 'Chị Hương L.', avatar: '👩', rating: 5, text: 'Đặt tiệc sinh nhật cho bé, phòng VIP rộng rãi, có karaoke. Cả nhà ai cũng vui!', date: '1 tháng trước' },
  { id: 3, name: 'Thanh Phong', avatar: '👨', rating: 4, text: 'Lẩu Changmai chua cay đỉnh lắm! Giá hợp lý, không gian ngoài trời thoáng.', date: '3 tuần trước' },
  { id: 4, name: 'Ngọc Anh', avatar: '👩🦰', rating: 5, text: 'Cánh gà chiên mắm ở đây ăn một lần là ghiền. Nhân viên nhiệt tình.', date: '1 tuần trước' },
  { id: 5, name: 'Đức Hùng', avatar: '🧔', rating: 5, text: 'Mỗi tuần đều ra đây nhậu với anh em. Giò heo giòn rụm chấm mắm me tuyệt vời!', date: '5 ngày trước' },
];

const overallRating = { score: 4.8, total: 5, reviewCount: '1.200' };

const SocialProof = () => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-charcoal overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <h2 className="font-headline text-4xl md:text-5xl text-center text-white mb-8 uppercase">KHÁCH NÓI GÌ?</h2>
        
        {/* Overall Rating Badge */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex items-end gap-2 mb-2">
            <span className="text-6xl md:text-7xl text-amber-400 font-headline drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">{overallRating.score}</span>
            <span className="text-2xl text-gray-400 font-headline mb-1">/ {overallRating.total}</span>
          </div>
          <div className="flex text-amber-400 text-2xl gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < Math.floor(overallRating.score) ? '★' : '☆'}</span>
            ))}
          </div>
          <p className="text-gray-400 font-body text-sm md:text-base">
            {overallRating.reviewCount}+ đánh giá trên Google & Facebook
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-charcoal-light border border-gray-800 rounded-2xl p-6 hover:border-amber-500/30 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center text-3xl shrink-0 border border-gray-700">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
                <div className="flex text-amber-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed font-body">
                "{review.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
