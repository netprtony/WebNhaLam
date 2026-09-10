/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Nền xanh rêu đậm / xanh lục quân đội (Dark Olive / Army Green)
          bg: '#3D4726',
          'bg-deep': '#2E361C',
          'bg-alt': '#3B4423',
          'bg-surface': '#47532D',
          'bg-card': '#444F2B',
          'bg-elevated': '#515F33',

          // Chữ & hoạ tiết màu be / vàng kem nhạt (Cream / Pale Beige)
          cream: '#F7DFBF',
          'cream-light': '#F9E2C4',
          'cream-muted': '#E4CCA9',
          'cream-dim': '#CDB28E',

          // Điểm nhấn đường phố & mồi nhậu
          clay: '#D45D38',        // Màu đất nung đường phố cho CTA / giá hot
          'clay-dark': '#B84A27',
          amber: '#EAA838',       // Vàng đèn lồng / neon đường phố
          red: '#D83838',         // Đỏ biển hiệu
        },
        zalo: '#0068FF',
      },
      fontFamily: {
        retro: ['Syne', '"Be Vietnam Pro"', 'sans-serif'],
        display: ['Syne', '"Be Vietnam Pro"', 'sans-serif'],
        stencil: ['"Chakra Petch"', '"Be Vietnam Pro"', 'sans-serif'],
        body: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
        'street-flicker': 'streetFlicker 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        streetFlicker: {
          '0%, 100%': { opacity: '1' },
          '41%': { opacity: '1' },
          '42%': { opacity: '0.85' },
          '43%': { opacity: '1' },
          '80%': { opacity: '1' },
          '81%': { opacity: '0.9' },
          '82%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
