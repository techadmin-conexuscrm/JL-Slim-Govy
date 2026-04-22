import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0d3252',
        cta: '#00da98',
        'cta-hover': '#00bf86',
        'sg-pink': '#c2185b',
        'sg-magenta': '#8e1560',
        'off-white': '#f8f8ff',
        'border-gray': '#e5e7eb',
        muted: '#6b7280',
        'fb-blue': '#1877f2',
        'breaking-red': '#d60000',
        'news-red': '#e30613',
        'timer-red': '#d32929',
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
        'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
      },
      maxWidth: {
        page: '1140px',
        narrow: '687px',
      },
      keyframes: {
        tkScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        bChev: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        handPulse: {
          '0%, 100%': { transform: 'scale(1) rotate(-8deg)' },
          '50%': { transform: 'scale(1.1) rotate(0deg)' },
        },
      },
      animation: {
        ticker: 'tkScroll 18s linear infinite',
        'chevron-bounce': 'bChev 1.2s ease-in-out infinite',
        'hand-pulse': 'handPulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
