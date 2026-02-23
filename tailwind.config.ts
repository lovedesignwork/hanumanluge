import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          DEFAULT: '#ff9600',
          dark: '#e68600',
          light: '#ffb340',
        },
        navy: {
          DEFAULT: '#0A1628',
          light: '#0F1E32',
          lighter: '#162A46',
        },
        electric: '#0066FF',
        hotpink: '#FF3366',
        cyan: '#00E5FF',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        'google-sans': ['Outfit', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 45s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-arrow': 'bounce-arrow 1s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(205, 255, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(205, 255, 0, 0.6)' },
        },
        'bounce-arrow': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(5px)' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
