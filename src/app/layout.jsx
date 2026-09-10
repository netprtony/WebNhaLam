import { Anton, Be_Vietnam_Pro } from 'next/font/google';
import '../styles/globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-headline',
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata = {
  title: 'Dốc Mơ Quán — Ăn Hết Mình, Uống Nhiệt Tình',
  description:
    'Quán nhậu gia đình đúng chất — mồi ngon, bia lạnh, không khí tưng bừng mỗi tối. Hơn 100+ món nhậu bén tại 22 Nguyễn Ảnh Thủ, Hóc Môn, TP.HCM.',
  keywords: 'quán nhậu, quán ăn gia đình, Hóc Môn, Dốc Mơ Quán, lẩu nướng, bia lạnh',
  openGraph: {
    title: 'Dốc Mơ Quán — Ăn Hết Mình, Uống Nhiệt Tình',
    description: 'Quán nhậu gia đình đúng chất — mồi ngon, bia lạnh, không khí tưng bừng mỗi tối.',
    type: 'website',
    locale: 'vi_VN',
    url: 'https://docmoquan.vn',
    siteName: 'Dốc Mơ Quán',
  },
  icons: {
    icon: '/images/Logo/main_logo-removebg-preview.png',
    apple: '/images/Logo/main_logo-removebg-preview.png',
  },
};

export const viewport = {
  themeColor: '#1A1714',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${anton.variable} ${beVietnamPro.variable}`}>
      <body className="bg-charcoal text-gray-200 font-body antialiased">
        {children}
      </body>
    </html>
  );
}
