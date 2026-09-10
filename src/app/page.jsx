'use client';

import { useState } from 'react';
import { PreBillProvider } from '../context/PreBillContext';
import MarqueeTicker from '../components/layout/MarqueeTicker';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/sections/HeroSection';
import SignatureShowcase from '../components/sections/SignatureShowcase';
import MenuGrid from '../components/sections/MenuGrid';
import AtmosphereRooms from '../components/sections/AtmosphereRooms';
import PromoBanners from '../components/sections/PromoBanners';
import SocialProof from '../components/sections/SocialProof';
import Footer from '../components/layout/Footer';
import FloatingActionDock from '../components/layout/FloatingActionDock';
import BookingModal from '../components/modals/BookingModal';
import PreBillDrawer from '../components/modals/PreBillDrawer';
import PreBillFloatingBar from '../components/layout/PreBillFloatingBar';

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <PreBillProvider>
      <MarqueeTicker />
      <Navbar onBooking={openBooking} />

      <main>
        <section id="hero">
          <HeroSection onBooking={openBooking} />
        </section>

        <section id="dac-san">
          <SignatureShowcase />
        </section>

        <section id="thuc-don">
          <MenuGrid onProceedBooking={openBooking} />
        </section>

        <section id="khuyen-mai">
          <PromoBanners />
        </section>

        <section id="khong-gian">
          <AtmosphereRooms />
        </section>

        <section id="danh-gia">
          <SocialProof />
        </section>
      </main>

      <Footer />
      <FloatingActionDock onBooking={openBooking} />
      
      {/* Drawer tính tiền tạm tính */}
      <PreBillDrawer onProceedBooking={openBooking} />

      {/* Thanh dock hiển thị tiền tạm tính nổi */}
      <PreBillFloatingBar onProceedBooking={openBooking} />

      {/* Modal đặt bàn 4 bước kèm chọn món trước */}
      <BookingModal isOpen={bookingOpen} onClose={closeBooking} />
    </PreBillProvider>
  );
}
