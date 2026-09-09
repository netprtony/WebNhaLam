# IMPLEMENTATION PLAN
## Website Nhà Hàng "Nhậu" Gia Đình Việt Nam — Single Page Application

**Vai trò:** Senior UI/UX Architect & Full-Stack Frontend Engineer
**Tech Stack:** React + Tailwind CSS (SPA tĩnh, zero-latency, scroll-spy navigation)
**Cảm hứng:** "Dau Homemade" — mộc mạc, hoài niệm, nâng cấp bằng thẩm mỹ hiện đại và micro-interaction tinh tế
**Đối tượng:** Gia đình địa phương, nhóm tụ họp cuối tuần, dân nhậu sau giờ làm

---

## 1. Định Hướng Thiết Kế Tổng Thể

### 1.1 Brand Vibe
- **Màu sắc chủ đạo:** Tông đất nung (clay) #B8654A, tre nứa (bamboo) #C9A876, be ấm #F5EDE0, xanh lá đậm điểm nhấn #3E5641, đen than #2A2420 cho text.
- **Typography:**
  - Heading: Font serif/display có nét thư pháp nhẹ (vd: "Playfair Display" hoặc "Be Vietnam Pro" weight 700) — gợi cảm giác truyền thống.
  - Body: Sans-serif hiện đại, dễ đọc trên mobile (vd: "Inter" / "Be Vietnam Pro" regular).
- **Texture:** Nền vân tre/mây đan xen nhẹ (subtle SVG pattern, opacity thấp), khung ảnh bo góc mềm (rounded-2xl), shadow ấm (warm-toned shadow thay vì xám lạnh).
- **Photography style:** Ảnh món ăn cận cảnh, hơi nước bốc lên, ánh sáng vàng ấm (golden hour lighting), AI-upscale để nét căng trên retina display.

### 1.2 Nguyên Tắc Kỹ Thuật
- Mobile-first, breakpoint: `sm 640px / md 768px / lg 1024px / xl 1280px`.
- Scroll-spy: dùng `IntersectionObserver` để active-state nav link theo section đang xem.
- Lazy-load ảnh (`loading="lazy"`, `next/image` hoặc `react-lazy-load-image-component`).
- Animation: `Framer Motion` cho fade-in/slide-up khi scroll vào viewport (`whileInView`), giữ threshold nhẹ để không giật trên mobile yếu.
- Performance target: LCP < 2.5s, CLS < 0.1, ảnh nén WebP/AVIF.

---

## 2. Sitemap Blueprint (Section-by-Section)

```
[Navbar - Sticky/Transparent]
  |
[1. Hero Section]
  |
[2. Highlight Menu / Signature Combos]
  |
[3. Ambiance & Dining Spaces]
  |
[4. Social Proof & Google Rating]
  |
[5. Location & Quick Contact]
  |
[Footer]
  |
[Floating Action Dock - Mobile Sticky]
```

---

## 3. Chi Tiết Từng Section

### 3.1 Navigation Bar (Sticky/Transparent)

**Mục đích:** Điều hướng nhanh, giữ CTA gọi món/liên hệ luôn trong tầm tay, không che khuất hero ảnh lúc đầu.

**Wireframe:**
```
┌─────────────────────────────────────────────────────────┐
│ [Logo/Icon]  Món Ngon | Không Gian | Đánh Giá | Vị Trí   │
│                                    [📞 Gọi Ngay] [Zalo]   │
└─────────────────────────────────────────────────────────┘
```

**Nội dung placeholder:**
- Logo: icon lồng đèn/chén đũa cách điệu + tên quán "Quán Nhậu Sum Vầy" (placeholder).
- Menu items (scroll-spy anchor): `#mon-ngon`, `#khong-gian`, `#danh-gia`, `#vi-tri`.
- CTA phải: nút "📞 Gọi Ngay" (viền outline, ghost button) + nút "Zalo" (filled, màu xanh Zalo #0068FF hoặc theo brand).

**Hành vi tương tác:**
- Trạng thái ban đầu (trên Hero): nền `transparent`, chữ trắng, logo trắng.
- Khi scroll > 80px: nền chuyển `bg-white/90 backdrop-blur-md` với shadow nhẹ, chữ đổi màu đất nung, transition 300ms ease.
- Active link: gạch chân động (underline animate `scaleX`) hoặc chấm tròn nhỏ dưới label khi section tương ứng đang trong viewport.
- Mobile: menu items ẩn vào hamburger icon (☰), CTA gọi/Zalo vẫn hiện dạng icon compact trên thanh navbar; hamburger mở drawer trượt từ phải với overlay mờ nền.

---

### 3.2 Hero Section

**Mục đích:** Tạo ấn tượng "thèm ăn" ngay giây đầu, truyền tải cảm xúc sum vầy, thúc đẩy đặt bàn nhanh (one-tap).

**Wireframe:**
```
┌─────────────────────────────────────────────────────────┐
│  [Background: video/ảnh lẩu sôi, khói bốc nghi ngút]     │
│                                                           │
│        🏮 Hương Vị Sum Vầy                               │
│        Đậm Vị Mồi Ngon                                   │
│        (sub-headline mô tả ngắn)                         │
│                                                           │
│   [⏰ Mở cửa: 10:00 - 23:00 hằng ngày]  (badge nổi)      │
│                                                           │
│   [ 🍽️ Đặt Bàn Ngay ]   [ Xem Thực Đơn ↓ ]              │
│                                                           │
│                    ↓ scroll indicator                    │
└─────────────────────────────────────────────────────────┘
```

**Nội dung placeholder:**
- Background: ảnh/video loop (muted, autoplay) nồi lẩu sôi sục, đĩa mồi nhậu bốc khói — overlay gradient tối dần từ dưới lên (`from-black/70 via-black/30 to-transparent`) để chữ nổi bật.
- Headline: **"Hương Vị Sum Vầy — Đậm Vị Mồi Ngon"** (font display lớn, có thể chia 2 dòng, màu be sáng #F5EDE0).
- Sub-headline: "Nơi gia đình quây quần, bạn bè nâng ly — mỗi món ăn là một câu chuyện quê nhà."
- Badge giờ mở cửa: pill-shape, nền vàng bamboo bán trong suốt, icon đồng hồ, "Đang mở cửa" (dot xanh nhấp nháy nếu trong giờ hoạt động).
- CTA chính: "🍽️ Đặt Bàn Ngay" (filled, màu đất nung, bo tròn full, có shadow nổi) — one-tap scroll tới form đặt bàn hoặc mở modal đặt bàn nhanh (tên, SĐT, số người, giờ đến).
- CTA phụ: "Xem Thực Đơn ↓" (ghost/outline) — scroll mượt xuống section Highlight Menu.

**Hành vi tương tác:**
- Text headline: entrance animation fade-up + stagger từng dòng (delay 150ms/dòng) khi load trang.
- Background video/ảnh: subtle Ken Burns zoom chậm (scale 1 → 1.05 trong 20s loop).
- Badge giờ mở cửa: pulse animation nhẹ trên chấm trạng thái "đang mở".
- Nút CTA: hover → scale 1.05 + đổi shadow đậm hơn; tap trên mobile → ripple effect nhẹ.
- Scroll indicator (mũi tên/chuột) ở đáy: bounce animation loop, click/tap → smooth scroll tới section kế tiếp.

---

### 3.3 Highlight Menu / Signature Combos

**Mục đích:** Trưng bày 4–6 món/set "best-seller" theo bố cục bento, khơi gợi cảm giác thèm ăn và thúc đẩy quyết định đặt món/đặt bàn.

**Wireframe (Bento Grid — desktop 3 cols, mobile 1 col scroll/stack):**
```
┌───────────────┬───────────────┬───────────────┐
│  [Ảnh lớn]    │  [Ảnh]        │  [Ảnh]        │
│  Lẩu Thái     │  Combo Nhậu   │  Gà Nướng     │
│  Hải Sản      │  4 Món        │  Muối Ớt      │
│  🔥 Best-seller│  🍻 Combo bạn │  🌶️ Cay nhẹ   │
│  299.000đ     │  399.000đ     │  189.000đ     │
├───────────────┴───────┬───────┴───────────────┤
│  [Ảnh ngang - rộng]   │  [Ảnh]                │
│  Set Đồ Uống Giải Nhiệt│  Ốc Hương Rang Muối   │
│  🍹 Mát lạnh          │  🦪 Đặc sản            │
│  149.000đ             │  169.000đ             │
└───────────────────────┴───────────────────────┘
```

**Nội dung placeholder cho mỗi card:**
- Ảnh AI-upscale món ăn (aspect ratio linh hoạt theo bento: 1:1, 4:3, hoặc 16:9 cho card rộng).
- Tag nổi góc trên trái: "🔥 Best-seller" / "🍻 Combo Nhậu" / "🌶️ Cay" / "🆕 Món Mới" (badge màu tương phản, bo tròn).
- Tên món (font đậm), mô tả ngắn 1 dòng (vd: "Lẩu Thái chua cay đậm đà, đầy ắp hải sản tươi").
- Giá (font số nổi bật, màu đất nung).
- Nút nhỏ "Xem chi tiết" hoặc icon "+" thêm vào đặt bàn (tuỳ chọn nâng cao).

**Hành vi tương tác:**
- Grid layout dùng CSS Grid với `grid-template-areas` khác nhau để tạo hiệu ứng bento không đều (1 ô lớn + nhiều ô nhỏ).
- Hover (desktop): ảnh zoom nhẹ (`scale-110` trong container `overflow-hidden`), overlay gradient tối dần hiện lên, card nâng lên (`translateY(-4px)` + shadow đậm hơn).
- Mobile: horizontal snap-scroll carousel cho các card (nếu không dùng grid dọc), dùng `scroll-snap-type: x mandatory`.
- Entrance animation: các card fade-up + stagger khi vào viewport (delay tăng dần theo index).
- Badge tag: micro pulse hoặc shimmer nhẹ để thu hút mắt vào "Best-seller".

---

### 3.4 Ambiance & Dining Spaces

**Mục đích:** Truyền tải cảm giác không gian — vừa ấm cúng cho gia đình (trong nhà, máy lạnh), vừa thoáng đãng cho nhóm nhậu (bán ngoài trời).

**Wireframe (Photo Grid + Tab/Toggle):**
```
┌─────────────────────────────────────────────────────────┐
│         Không Gian Sum Vầy — Cho Mọi Khoảnh Khắc         │
│                                                           │
│   [ Tab: Khu Gia Đình (Mát Lạnh) ]  [ Tab: Khu Nhậu (Thoáng) ] │
│                                                           │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐                │
│  │ Ảnh 1 │ │ Ảnh 2 │ │ Ảnh 3 │ │ Ảnh 4 │  (masonry grid) │
│  └───────┘ └───────┘ └───────┘ └───────┘                │
└─────────────────────────────────────────────────────────┘
```

**Nội dung placeholder:**
- Heading: "Không Gian Sum Vầy — Cho Mọi Khoảnh Khắc".
- Toggle/Tab 2 lựa chọn:
  - **"Khu Gia Đình (Mát Lạnh)"**: ảnh phòng máy lạnh, bàn tròn rộng, trang trí ấm cúng, phù hợp trẻ em/người lớn tuổi.
  - **"Khu Nhậu (Thoáng Mát)"**: ảnh khu bán ngoài trời/sân vườn, đèn lồng, bàn ghế gỗ mộc, không gian mở cho nhóm đông vui.
- Photo grid dạng masonry (ảnh cao thấp không đều tạo cảm giác tự nhiên, không cứng nhắc như grid đều).
- Caption nhỏ dưới mỗi ảnh (optional): "Phòng VIP máy lạnh 6-10 khách", "Sân vườn ngoài trời view cây xanh"...

**Hành vi tương tác:**
- Chuyển tab: crossfade animation giữa 2 bộ ảnh (opacity transition 300ms, không giật layout — dùng `AnimatePresence` của Framer Motion).
- Click vào ảnh: mở lightbox/gallery fullscreen (swipe để xem ảnh kế trên mobile).
- Hover ảnh (desktop): overlay nhẹ tối + icon kính lúp phóng to xuất hiện giữa ảnh.
- Scroll-in: ảnh xuất hiện theo hiệu ứng stagger từ dưới lên, mỗi ảnh delay 80–100ms.

---

### 3.5 Social Proof & Google Maps Rating

**Mục đích:** Xây dựng niềm tin qua đánh giá thực tế, giảm rào cản quyết định của khách mới.

**Wireframe:**
```
┌─────────────────────────────────────────────────────────┐
│     ⭐⭐⭐⭐⭐ 4.8/5 — 1.200+ đánh giá trên Google         │
│                                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │ "Món ăn..." │  │ "Không gian.."│ │ "Phục vụ..." │      │
│  │ ⭐⭐⭐⭐⭐    │  │ ⭐⭐⭐⭐⭐     │  │ ⭐⭐⭐⭐⭐    │      │
│  │ - Anh Minh  │  │ - Chị Lan     │  │ - Anh Đức    │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
│              [Badge: Google Verified]                    │
└─────────────────────────────────────────────────────────┘
```

**Nội dung placeholder:**
- Header lớn: rating tổng hợp "⭐ 4.8/5 — 1.200+ đánh giá trên Google" kèm logo Google nhỏ để tăng độ tin cậy.
- 3 review card mẫu (placeholder text ngắn, chân thực, có tên khách + avatar tròn/emoji, số sao):
  - "Món lẩu ở đây đậm đà, y hệt vị nhà nấu, cả nhà mình ăn xong còn đòi quay lại." — Anh Minh
  - "Không gian ngoài trời mát mẻ, nhậu với bạn bè cuối tuần cực đã." — Chị Lan
  - "Nhân viên nhiệt tình, phục vụ nhanh dù cuối tuần đông khách." — Anh Đức
- Trust badge: "Google Verified Business" hoặc icon xác thực.

**Hành vi tương tác:**
- Trên mobile: carousel horizontal swipe qua từng review card, dot indicator bên dưới.
- Trên desktop: 3 card hiển thị song song, hover → card nhấc nhẹ lên + border sáng màu bamboo.
- Rating tổng: đếm số animate (count-up từ 0 → 4.8) khi section vào viewport lần đầu.
- Optional: nhúng Google Reviews widget thực (qua Google Places API) để tự động cập nhật đánh giá mới nhất thay vì hard-code.

---

### 3.6 Location & Quick Contact

**Mục đích:** Giúp khách tìm đường nhanh nhất, giảm ma sát giữa "muốn đến" và "đến được".

**Wireframe:**
```
┌─────────────────────────────────────────────────────────┐
│  [ Google Maps Embed - interactive ]  │  Thông tin liên hệ│
│                                        │  📍 Địa chỉ...    │
│                                        │  🕒 10:00-23:00   │
│                                        │  📞 09xx xxx xxx  │
│                                        │  [Chỉ Đường Ngay] │
└─────────────────────────────────────────────────────────┘
```

**Nội dung placeholder:**
- Bản đồ nhúng Google Maps (iframe interactive, pin đỏ tại vị trí quán) — chiếm ~60% chiều rộng trên desktop, full-width trên mobile (dưới phần thông tin).
- Panel thông tin bên phải/dưới:
  - 📍 Địa chỉ: "123 Đường ABC, Phường XYZ, Quận..." (placeholder)
  - 🕒 Giờ hoạt động: "10:00 – 23:00, tất cả các ngày trong tuần"
  - 📞 Hotline: "090 xxx xxx"
  - Nút "📍 Chỉ Đường Ngay" — deep-link mở Google Maps app (native) hoặc web.
  - Nút "📞 Gọi Đặt Bàn" — `tel:` link.

**Hành vi tương tác:**
- Map: click vào pin → hiện info-window mini (tên quán + ảnh thumbnail + nút "Xem trên Google Maps").
- Nút "Chỉ Đường Ngay": detect device — mobile mở app Maps native (`geo:` hoặc `maps://`), desktop mở tab mới Google Maps web.
- Panel thông tin: fade-in từ phải khi scroll vào viewport.
- Optional: hiển thị trạng thái "Đang mở cửa" / "Đã đóng cửa" real-time dựa theo giờ hệ thống so với giờ hoạt động.

---

### 3.7 Floating Action Dock (Mobile Sticky Footer)

**Mục đích:** Giữ 3 hành động chuyển đổi quan trọng nhất luôn trong tầm ngón tay cái trên mobile — nơi phần lớn traffic tới từ.

**Wireframe (chỉ hiện trên mobile, `hidden md:hidden` desktop, hoặc desktop dùng floating button nhỏ góc phải):**
```
┌─────────────────────────────────────────────────────────┐
│   [ 📞 Gọi Ngay ]   [ 💬 Zalo Chat ]   [ 🍽️ Đặt Bàn ]    │
└─────────────────────────────────────────────────────────┘
        (thanh cố định đáy màn hình, luôn hiển thị)
```

**Nội dung placeholder:**
- 3 nút chia đều chiều ngang (`grid-cols-3`), mỗi nút icon + label ngắn:
  1. **📞 Gọi Ngay** — `tel:` link trực tiếp, màu nền đất nung.
  2. **💬 Zalo Chat** — mở Zalo app/link chat trực tiếp (`https://zalo.me/...`), màu xanh Zalo.
  3. **🍽️ Đặt Bàn** — nút nổi bật nhất (accent color khác biệt, có thể to hơn 2 nút kia hoặc icon nổi lên trên thanh dock kiểu FAB), mở modal/form đặt bàn nhanh.

**Hành vi tương tác:**
- Thanh dock: `position: fixed; bottom: 0`, nền trắng/be với `backdrop-blur` + shadow hắt lên trên, an toàn vùng `safe-area-inset-bottom` cho iPhone có home indicator.
- Ẩn/hiện thông minh: ẩn khi scroll xuống nhanh (đọc nội dung), hiện lại khi scroll lên hoặc dừng scroll — tránh che nội dung liên tục nhưng vẫn luôn sẵn sàng.
- Nút "Đặt Bàn" trung tâm: có thể thiết kế nổi bật hơn (elevated circle button nhô lên khỏi thanh dock) để nhấn mạnh CTA chuyển đổi chính, kèm subtle pulse animation định kỳ (vd mỗi 8s) để thu hút chú ý.
- Tap feedback: scale-down nhẹ khi nhấn (active state) cho cảm giác phản hồi tức thì.
- Trên desktop: thay bằng 1 nút tròn floating góc dưới phải ("Đặt Bàn Ngay") mở rộng thành menu mini khi hover (hiện thêm icon Gọi/Zalo).

---

## 4. Cấu Trúc Component (React) Đề Xuất

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── FloatingActionDock.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── HighlightMenu.jsx
│   │   ├── AmbianceSpaces.jsx
│   │   ├── SocialProof.jsx
│   │   └── LocationContact.jsx
│   ├── ui/
│   │   ├── MenuCard.jsx
│   │   ├── ReviewCard.jsx
│   │   ├── SectionHeading.jsx
│   │   ├── Badge.jsx
│   │   └── Button.jsx
│   └── modals/
│       └── ReservationModal.jsx
├── hooks/
│   ├── useScrollSpy.js
│   └── useScrollDirection.js
├── data/
│   ├── menuItems.js
│   ├── reviews.js
│   └── gallery.js
├── App.jsx
└── index.css (Tailwind config + custom CSS vars màu brand)
```

---

## 5. Thứ Tự Triển Khai (Roadmap)

1. **Setup:** Khởi tạo project React + Tailwind, cấu hình theme màu/font brand trong `tailwind.config.js`.
2. **Layout khung:** Navbar + Footer + Floating Dock (static trước, chưa animation).
3. **Hero Section:** Ảnh nền, headline, CTA — đây là first impression, ưu tiên polish sớm.
4. **Highlight Menu:** Bento grid + dữ liệu mẫu (data/menuItems.js).
5. **Ambiance Section:** Tab toggle + photo grid/masonry.
6. **Social Proof:** Review cards + rating counter.
7. **Location Section:** Nhúng Google Maps + panel thông tin.
8. **Scroll-spy + animation pass:** Gắn `IntersectionObserver`/Framer Motion cho toàn bộ section.
9. **Responsive QA:** Test kỹ trên mobile 360px–430px (nhóm khách hàng chính dùng điện thoại).
10. **Performance pass:** Nén ảnh, lazy-load, kiểm tra Lighthouse score.

---

## 6. Ghi Chú Nội Dung Cần Khách Hàng Cung Cấp

- [ ] Tên quán chính thức + logo vector.
- [ ] Ảnh món ăn chất lượng cao (tối thiểu 6 món signature).
- [ ] Ảnh không gian thật (khu gia đình + khu nhậu ngoài trời).
- [ ] Địa chỉ chính xác + toạ độ Google Maps.
- [ ] Số điện thoại hotline + link Zalo OA chính thức.
- [ ] Giờ hoạt động chi tiết (có ngày lễ/nghỉ riêng không).
- [ ] Đánh giá khách hàng thật (screenshot Google Reviews để xin phép sử dụng).
