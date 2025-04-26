/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'curious-blue': {
          100: '#e0f2ff',
          200: '#badeff',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'curious-purple': {
          100: '#f5e9ff',
          200: '#e4ccff',
          300: '#a78bfa',
          400: '#8b5cf6',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#2e1065',
        },
        'curious-dark': {
          100: '#e6e8ea',
          200: '#bbc1c7',
          300: '#8e99a3',
          400: '#636e7a',
          500: '#3f4955',
          600: '#1f2937',
          700: '#0f172a',
          800: '#0c1325',
          900: '#070C1A',
          950: '#030508',
        },
        'deep-black': '#0a0a0a',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-blob': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(5px, -5px) scale(1.02)' },
          '66%': { transform: 'translate(-5px, 5px) scale(0.98)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'glow-text': {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.2)' },
        },
        'scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.33%)' },
        },
        'cursor-glow': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '0.6', transform: 'scale(1)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 10s ease-in-out infinite',
        'float-blob': 'float-blob 12s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'fade-in-down': 'fade-in-down 0.6s ease-out',
        'fade-in-left': 'fade-in-left 0.6s ease-out',
        'fade-in-right': 'fade-in-right 0.6s ease-out',
        'glow-text': 'glow-text 3s ease-in-out infinite',
        'scroll': 'scroll 60s linear infinite',
        'cursor-glow': 'cursor-glow 0.5s ease-out forwards',
      },
      backgroundImage: {
        'circuit-pattern': "url('/images/circuit-pattern.svg')",
        'noise-texture': "url('/images/noise-texture.svg')",
      },
    },
  },
  plugins: [],
}
