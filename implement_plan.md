# IMPLEMENTATION PLAN (v2 — NÂNG CẤP)
## "Quán Ăn Gia Đình & Nhậu Hiện Đại" — High-Energy Kinetic Website

**Vai trò:** Principal Frontend Engineer & Creative Motion Designer
**Tech Stack:** Next.js + Tailwind CSS + Framer Motion / GSAP (ScrollTrigger)
**Cảm hứng thị giác:** quannhautudo.com — quán nhậu vỉa hè năng động, ánh đèn chợ đêm, ấm áp nhưng "bén lửa"
**Slogan định vị:** "Ăn Hết Mình, Uống Nhiệt Tình"

> Đây là bản nâng cấp thay thế định hướng "mộc mạc/nostalgic" của v1 bằng định hướng **high-energy, kinetic, night-market glow**, tập trung vào ảnh cutout PNG nền trong suốt (`/images/image_rvbg/`), motion mạnh và các chi tiết "sống động" hơn.

---

## 1. Định Hướng Thị Giác Tổng Thể (Core Visual Identity)

### 1.1 Vibe & Bảng Màu
- **Nền chủ đạo:** Charcoal đêm chợ (`#1A1714`, `#211C18`) — tạo chiều sâu, làm nền cho ánh sáng nổi bật.
- **Accent màu nóng:**
  - Hổ phách/vàng ấm (amber) — `#F5A623` / `#FFB74D`: glow, border neon, nút CTA.
  - Vàng neon — `#FFE14D`: text nhấn, badge "Best Seller".
  - Đỏ ớt cay (chili red) — `#E8452C`: badge "Cay Nồng", nút primary "Đặt Bàn".
- **Nguyên tắc phối màu:** Nền tối tuyệt đối để ảnh món ăn cutout + ánh glow "nổ" ra, tương phản mạnh — không dùng nền sáng như bản v1.

### 1.2 Typography
- **Headline:** Font condensed đậm (vd: "Anton", "Bebas Neue", hoặc "Be Vietnam Pro ExtraBold" kéo `letter-spacing` âm nhẹ) — cảm giác bảng hiệu quán nhậu, poster đường phố.
- **Body/UI:** Sans-serif rõ ràng (vd: "Inter" / "Be Vietnam Pro") giữ độ tương phản tốt trên nền tối.
- **Badge/Tag:** Chữ in hoa, bo góc nhỏ, viền glow mỏng 1px màu amber/neon, nền bán trong suốt tối.

### 1.3 Chi Tiết Thị Giác Đặc Trưng
- **Neon micro-border:** border 1–2px với `box-shadow` glow (`0 0 8px rgba(245,166,35,0.6)`) quanh badge, card viền, số liệu nổi bật.
- **Industrial tag:** nhãn dạng "sticker" xoay nhẹ góc (`-4deg` đến `4deg`) đính trên góc ảnh món ăn, giả lập tem dán quán ăn đường phố.

---

## 2. Quy Tắc Ảnh Cutout (Transparent Image System)

### 2.1 Cấu trúc thư mục & convention
```
public/
└── images/
    └── image_rvbg/
        ├── hero-dish.png
        ├── lau-rieu-cua.png
        ├── bo-nuong.png
        ├── ga-nuong-muoi-ot.png
        ├── thap-suon-cay.png
        ├── beer-mug.png
        ├── chili-garnish.png
        ├── lime-slice.png
        └── grill-smoke.png
```
- Toàn bộ ảnh món ăn/đồ uống/prop **bắt buộc** là PNG/WebP nền trong suốt, path chuẩn `/images/image_rvbg/[filename].png`.
- Không dùng ảnh có nền/background còn dính lại — mọi hiệu ứng shadow/glow được xử lý bằng CSS, không phải trong ảnh gốc.

### 2.2 Kỹ Thuật Xử Lý Ảnh Cutout

**a) Layered Hero Composite**
- Ảnh món chủ đạo (`hero-dish.png`) đặt chồng lên badge tròn tối màu có radial glow phía sau.
- CSS: `filter: drop-shadow(0 20px 30px rgba(0,0,0,0.6));`
- Cấu trúc layer (z-index từ dưới lên): radial glow blob → badge tròn (nền tối, viền neon) → ảnh món ăn cutout → particle trang trí (ớt/chanh/khói) bay phía trước.

**b) Card Border-Break Effect (Menu Grid)**
- Ảnh món trong mỗi card menu phải "tràn" ra khỏi mép trên và mép phải của card, tạo cảm giác nổi khối 3D thật.
- Implementation: card container dùng `overflow-visible`, ảnh dùng `absolute -top-6 -right-4 w-[130%]` (margin âm/định vị tuyệt đối lệch ra ngoài khung card).
- Kết hợp `filter: drop-shadow(...)` đổ bóng xuống card bên dưới để ảnh trông như đang "nhô" lên khỏi bề mặt.

**c) Ambient Floating Particles**
- 2–3 prop nhỏ (`chili-garnish.png`, `lime-slice.png`, `grill-smoke.png`) trôi nổi nhẹ nhàng trong nền các section (đặc biệt Hero và Signature Showcase).
- Framer Motion: `animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}`.
- Đặt `opacity` thấp (0.6–0.85) và `blur-[0.5px]` nhẹ để tạo chiều sâu (depth-of-field), không cạnh tranh với nội dung chính.

---

## 3. Sitemap & Motion Spec Chi Tiết Theo Section

### 3.1 Sticky Dynamic Header & Top Marquee Banner

**Marquee Ticker (trên cùng, trước navbar):**
- Dải chữ chạy ngang vô hạn, nền đỏ/amber gradient, chữ trắng đậm in hoa:
  `🔥 ĐẶT BÀN TRƯỚC GIẢM 10% • HƠN 100+ MÓN NHẬU BÉN • PHÒNG RIÊNG VIP CÓ HÁT KARAOKE • ĐẶT TIỆC LIÊN HOAN - SINH NHẬT 🔥`
- Kỹ thuật: CSS `@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }` trên 1 dải nội dung lặp 2 lần (duplicate) để loop liền mạch, `animation: marquee 25s linear infinite`. Pause khi hover (`animation-play-state: paused`).

**Navbar:**
- `backdrop-blur-md bg-charcoal/70`, sticky top-0, border-bottom viền glow mỏng amber.
- Logo: badge tròn glow nhẹ pulse chậm.
- Quick links: "Menu", "Không Gian", "Ưu Đãi", "Chi Nhánh" — scroll-spy active state dùng gạch dưới glow neon.
- CTA "ĐẶT BÀN NGAY": nút đỏ/amber gradient, `box-shadow` glow ring pulse liên tục (`animate-pulse` custom keyframe scale + opacity ring bên ngoài nút).
- Mobile: thu gọn thành hamburger, marquee ticker vẫn giữ (thu nhỏ font) hoặc ẩn khi scroll xuống để tiết kiệm không gian.

---

### 3.2 Hero Section (Kinetic & Appetite-Inducing)

**Layout:** 2 cột (desktop) — trái: text kinetic; phải: stage ảnh món ăn 3D tương tác.

**Nội dung placeholder:**
- Headline kinetic reveal: **"MỒI BÉN BẠN HIỀN — VUI HẾT NẮC"** (chia từng chữ/từ, chạy animation stagger).
- Sub-text: "Quán nhậu gia đình đúng chất — mồi ngon, bia lạnh, không khí tưng bừng mỗi tối."
- Quick Action Bar (mini booking bar) ngay dưới headline:
  ```
  [ Số người: 2-4 ▾ ]  [ Khung giờ: 19:00 ▾ ]  [ Check Bàn Trống → ]
  ```

**Motion Spec:**
- Headline: Framer Motion `staggerChildren` — mỗi từ fade-up + slight skew khi load (`initial={{ y: 40, opacity: 0, skewY: 3 }}`).
- Ảnh món chính (`hero-dish.png`): 
  - Xoay nhẹ theo scroll: dùng GSAP ScrollTrigger `scrub` map `scrollYProgress` → `rotate: [-5deg, 5deg]`.
  - Mouse-reactive tilt: track `mousemove`, áp `rotateX/rotateY` nhẹ (max ±8deg) theo vị trí con trỏ so với tâm ảnh, dùng `perspective` trên container cha.
- Particles nền (ớt, chanh, khói) bay nhẹ như mô tả mục 2.2c.
- Quick Action Bar: entrance slide-up + fade sau headline (delay 0.4s), border glow amber mỏng, dropdown mở với animation height auto + fade.

---

### 3.3 Signature Showcase (Interactive Card Slider)

**Mục đích:** Giới thiệu 3–5 món chủ lực (Lẩu riêu cua bắp bò, Gà nướng muối ớt, Tháp sườn cay...) dạng carousel tương tác mạnh.

**Wireframe:**
```
◀  [Card 1]   [Card 2 - active/scale lớn]   [Card 3]  ▶
        ● ● ○ ○ ○   (dot indicator)
```

**Nội dung mỗi card:**
- Ảnh cutout món ăn (drop-shadow đổ theo hình dạng đĩa, không phải bóng chữ nhật).
- Tên món (font condensed), mô tả 1 dòng, giá.
- Badge góc: "Best Seller" / "Cay Nồng" / "Món Mới".

**Motion Spec:**
- Slider dùng `Framer Motion drag` (swipe ngang) hoặc thư viện `embla-carousel` + Framer Motion cho hiệu ứng scale.
- Card đang active: `scale-110`, các card lân cận `scale-90 opacity-70` — hiệu ứng "coverflow" nhẹ.
- Hover (desktop): ảnh món scale-up thêm với `spring physics` (`type: "spring", stiffness: 300, damping: 15`), đồng thời bóng đổ (`drop-shadow`) giãn ra và làm mờ nhẹ hơn để giả lập đĩa "nhấc lên".
- Chuyển card: transition dùng spring, không dùng ease tuyến tính, tạo cảm giác nảy nhẹ tự nhiên.

---

### 3.4 Interactive Categorized Menu (Tabbed & Dynamic)

**Category Tabs:**
```
[ Mồi Lai Rai ]  [ Món Nhậu Đậm Vị ]  [ Lẩu & Nướng Bốc Khói ]  [ Bia Lạnh & Giải Khát ]
```

**Wireframe grid (3 cột responsive → 1 cột mobile):**
```
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ [ảnh tràn góc]│ │ [ảnh tràn góc]│ │ [ảnh tràn góc]│
│ Tên món       │ │ Tên món       │ │ Tên món       │
│ 🏆 Best Seller│ │ 🌶️ Cay Nồng  │ │ 🆕 Món Mới    │
│ 129.000đ      │ │ 149.000đ      │ │ 99.000đ       │
└───────────────┘ └───────────────┘ └───────────────┘
```

**Motion Spec:**
- **Animated tab pill:** dùng Framer Motion `layoutId="activePill"` — khi chuyển tab, nền pill trượt mượt từ vị trí tab cũ sang tab mới (shared layout animation), không cần custom easing thủ công.
- **Filter transition:** khi đổi category, danh sách món cũ fade-out + scale-down nhẹ (`exit={{ opacity: 0, scale: 0.95 }}`), món mới fade-in + stagger từng card (`AnimatePresence mode="popLayout"`).
- Mỗi `CutoutFoodCard`: áp dụng kỹ thuật "Card Border-Break Effect" (mục 2.2b) — ảnh tràn góc trên-phải ra khỏi khung card.
- Badge tag: viền glow theo màu ngữ nghĩa — vàng neon cho "Best Seller", đỏ cho "Cay Nồng", xanh mint cho "Món Mới".

---

### 3.5 Atmosphere & Private Rooms ("Không Gian Tiệc Tùng")

**Wireframe (split 2 khối):**
```
┌─────────────────────────┬─────────────────────────┐
│  KHÔNG GIAN MỞ           │  PHÒNG RIÊNG VIP         │
│  NGOÀI TRỜI THOÁNG MÁT   │  MÁY LẠNH                │
│  [photo grid 2x2]        │  [photo grid 2x2]        │
└─────────────────────────┴─────────────────────────┘
```

**Nội dung placeholder:**
- Khối trái: "Không Gian Mở Ngoài Trời Thoáng Mát" — ảnh sân/khu bàn ghế ngoài trời, đèn dây ấm, không khí đông vui.
- Khối phải: "Phòng Riêng VIP Máy Lạnh" — ảnh phòng riêng có karaoke, phù hợp gia đình/tiệc sinh nhật/công ty.

**Motion Spec:**
- Hover từng ảnh trong photo grid: zoom nhẹ (`scale-105`) kèm overlay ánh sáng amber ambient (`bg-gradient-to-t from-amber-500/20 to-transparent` fade in khi hover) — mô phỏng ánh đèn quán ấm lên khi rê chuột.
- Scroll-in: 2 khối trái/phải trượt vào từ 2 hướng đối lập (trái từ x:-40, phải từ x:+40) hội tụ về vị trí gốc, dùng GSAP ScrollTrigger `toggleActions: "play none none reverse"`.

---

### 3.6 High-Converting Booking Modal & Zalo Webhook

**Flow 3 bước (modal, không chuyển trang):**
```
Bước 1: Chọn loại nhóm       Bước 2: Chọn ngày & giờ      Bước 3: Nhập thông tin
[Gia đình] [Nhậu bạn bè]     [Date picker] [Time slots]    [Tên] [SĐT] [Xác nhận →]
[Tiệc công ty]
```

**Motion Spec:**
- Modal mở: backdrop fade-in (`bg-black/70 backdrop-blur-sm`) + modal box scale-up từ 0.9 → 1 kèm spring nhẹ.
- Chuyển bước: dùng progress indicator dạng 3 chấm/thanh, nội dung bước chuyển bằng slide-horizontal (bước sau trượt từ phải vào, bước trước trượt sang trái ra) — giống pattern stepper native app.
- Nút lựa chọn (loại nhóm, khung giờ): khi chọn → border glow amber tức thì + tick icon animate scale-in.

**Xử lý kỹ thuật (Action):**
- Submit form (bước 3) → gọi API route Next.js nội bộ (`/api/booking`) → route này POST dữ liệu (tên, SĐT, loại nhóm, ngày giờ) tới **webhook Zalo OA / Telegram Bot** của chủ quán để nhận thông báo tức thời.
- Sau khi submit thành công: hiển thị màn hình xác nhận trong modal + nút "Mở Zalo Xác Nhận" (deep-link `https://zalo.me/...`) để khách chủ động nhắn thêm nếu cần.
- Lưu ý bảo mật: không hardcode webhook URL ở phía client — xử lý qua API route server-side để tránh lộ token webhook.

---

### 3.7 Floating Mobile Quick-Action Dock

**Wireframe (cố định đáy màn hình, mobile):**
```
┌─────────────────────────────────────────────────────────┐
│  [ 📞 Gọi Hotline ]  [ 📍 Chỉ Đường Maps ]  [ 🍖 Đặt Bàn Nhanh ] │
└─────────────────────────────────────────────────────────┘
```

**Motion Spec:**
- Nút "Đặt Bàn Nhanh": màu đỏ/amber nổi bật nhất trong 3 nút, có `pulsing glow ring` liên tục (giống nút CTA trong navbar) để dẫn mắt.
- Dock nền `bg-charcoal/90 backdrop-blur-md`, viền trên glow amber mỏng 1px.
- Ẩn/hiện theo hướng scroll (ẩn khi scroll xuống nhanh, hiện lại khi scroll lên) để không che nội dung liên tục.
- Tap feedback: `scale-95` tức thời khi nhấn, kèm haptic-like visual flash nhẹ (brightness tăng chớp nhoáng 100ms).

---

## 4. Kiến Trúc Component (Next.js) Đề Xuất

```
src/
├── app/
│   ├── page.tsx                    # Trang chủ SPA, ghép các section
│   ├── api/
│   │   └── booking/route.ts        # API route xử lý & forward tới Zalo/Telegram webhook
│   └── layout.tsx
├── components/
│   ├── layout/
│   │   ├── MarqueeTicker.tsx
│   │   ├── Navbar.tsx
│   │   └── FloatingActionDock.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── SignatureShowcase.tsx
│   │   ├── MenuGrid.tsx
│   │   ├── AtmosphereRooms.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── CutoutFoodCard.tsx      # Card menu với hiệu ứng border-break
│   │   ├── CategoryTabs.tsx        # Tabs với layoutId="activePill"
│   │   ├── FloatingParticle.tsx    # Component particle trôi nổi tái sử dụng
│   │   ├── GlowBadge.tsx
│   │   └── MagneticButton.tsx      # Nút CTA hiệu ứng magnetic hover
│   └── modals/
│       └── BookingModal.tsx        # Modal 3 bước
├── hooks/
│   ├── useScrollSpy.ts
│   ├── useScrollDirection.ts
│   └── useMouseTilt.ts             # Hook tilt ảnh hero theo con trỏ chuột
├── data/
│   ├── menuItems.ts
│   ├── signatureDishes.ts
│   └── rooms.ts
├── lib/
│   └── webhook.ts                  # Helper gửi dữ liệu booking tới Zalo/Telegram
└── styles/
    └── globals.css                 # Tailwind + custom keyframes (marquee, glow-pulse, float)
```

---

## 5. Custom Tailwind / CSS Cần Bổ Sung

```js
// tailwind.config.js (trích đoạn liên quan)
theme: {
  extend: {
    colors: {
      charcoal: { DEFAULT: '#1A1714', light: '#211C18' },
      amber: { DEFAULT: '#F5A623', soft: '#FFB74D' },
      neonYellow: '#FFE14D',
      chiliRed: '#E8452C',
    },
    keyframes: {
      marquee: {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-50%)' },
      },
      glowPulse: {
        '0%, 100%': { boxShadow: '0 0 0 0 rgba(245,166,35,0.5)' },
        '50%': { boxShadow: '0 0 0 10px rgba(245,166,35,0)' },
      },
      floatY: {
        '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
        '50%': { transform: 'translateY(-15px) rotate(5deg)' },
      },
    },
    animation: {
      marquee: 'marquee 25s linear infinite',
      'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      float: 'floatY 6s ease-in-out infinite',
    },
  },
}
```

---

## 6. Thứ Tự Triển Khai (Roadmap Kỹ Thuật)

1. **Setup nền tảng:** Next.js (App Router) + Tailwind + Framer Motion + GSAP, cấu hình theme màu/keyframes ở trên.
2. **Layout khung:** MarqueeTicker + Navbar + FloatingActionDock (static, chưa gắn logic scroll-hide).
3. **Hero Section:** dựng layout 2 cột, headline kinetic reveal, ảnh hero cutout + mouse-tilt hook + particles nền.
4. **CutoutFoodCard component:** chuẩn hoá kỹ thuật border-break effect + drop-shadow — đây là component lõi tái sử dụng ở cả Signature Showcase và MenuGrid.
5. **Signature Showcase:** carousel + spring hover, dùng CutoutFoodCard.
6. **MenuGrid + CategoryTabs:** tabs với `layoutId`, filter transition, grid responsive.
7. **AtmosphereRooms:** split layout + hover ambient glow + scroll-in từ 2 hướng.
8. **BookingModal + API route:** xây stepper 3 bước, nối API `/api/booking` → webhook Zalo/Telegram (dùng biến môi trường `.env` cho URL webhook, không hardcode).
9. **FloatingActionDock logic:** hook `useScrollDirection` để ẩn/hiện, gắn pulsing CTA.
10. **Polish chuyển động toàn trang:** rà soát timing, đảm bảo animation không gây giật trên thiết bị tầm trung (test throttle CPU 4x trong DevTools).
11. **Responsive & Accessibility QA:** kiểm tra tương phản chữ trên nền tối (WCAG AA), đảm bảo particles/motion có thể tắt được nếu người dùng bật `prefers-reduced-motion`.
12. **Performance pass:** nén ảnh cutout (WebP), preload ảnh hero, kiểm tra Lighthouse (đặc biệt CLS do ảnh tràn khung ở MenuGrid).

---

## 7. Ghi Chú Cần Khách Hàng / Design Cung Cấp

- [ ] Bộ ảnh món ăn đã tách nền (cutout) chất lượng cao cho toàn bộ file trong `image_rvbg/` liệt kê ở mục 2.1.
- [ ] Danh sách đầy đủ món theo 4 category (Mồi Lai Rai / Món Nhậu Đậm Vị / Lẩu & Nướng / Bia Lạnh & Giải Khát) kèm giá.
- [ ] Ảnh không gian ngoài trời + phòng VIP karaoke (độ phân giải cao, ánh sáng thật của quán).
- [ ] URL webhook Zalo OA hoặc Telegram Bot token để tích hợp nhận thông báo đặt bàn.
- [ ] Nội dung khuyến mãi hiện tại cho marquee ticker (ưu đãi, chương trình theo mùa).
- [ ] Xác nhận số chi nhánh (nếu >1) để thiết kế phần "Chi Nhánh" trong navbar.

---

## 8. So Sánh Nhanh Với Bản v1 (Tham Chiếu)

| Tiêu chí | v1 (Mộc mạc, ấm cúng) | v2 — Bản Nâng Cấp (Kinetic, Night-market) |
|---|---|---|
| Nền chủ đạo | Be/bamboo sáng | Charcoal tối, ánh đèn glow |
| Motion | Fade/slide nhẹ nhàng | Parallax, marquee, magnetic button, spring physics |
| Ảnh món ăn | Ảnh thường trong khung bo góc | Cutout PNG tràn khung, drop-shadow 3D |
| Đặt bàn | Modal đơn giản | Stepper 3 bước + webhook Zalo/Telegram real-time |
| Tương tác nổi bật | Hover nâng nhẹ card | Tilt theo chuột, coverflow slider, glow-pulse CTA |
