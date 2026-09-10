/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1A1714',
          light: '#211C18',
          mid: '#2A2520',
          surface: '#332E28',
        },
        amber: {
          DEFAULT: '#F5A623',
          soft: '#FFB74D',
          dim: '#C4841C',
        },
        neonYellow: '#FFE14D',
        chiliRed: {
          DEFAULT: '#E8452C',
          dark: '#C13820',
        },
        mintGreen: '#4AECC0',
        zalo: '#0068FF',
      },
      fontFamily: {
        headline: ['var(--font-headline)', 'Anton', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'Be Vietnam Pro', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(245,166,35,0.5)' },
          '50%': { boxShadow: '0 0 0 12px rgba(245,166,35,0)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(5deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        float: 'floatY 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        kenburns: 'kenburns 20s ease-in-out infinite alternate',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'amber-glow': 'radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-amber': '0 0 15px rgba(245,166,35,0.3)',
        'glow-amber-lg': '0 0 30px rgba(245,166,35,0.4)',
        'glow-red': '0 0 15px rgba(232,69,44,0.3)',
        'glow-neon': '0 0 15px rgba(255,225,77,0.3)',
        'cutout': '0 20px 30px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
};
