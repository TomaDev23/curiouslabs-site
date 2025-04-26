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
          300: '#90caff',
          400: '#5dabff',
          500: '#2e8cff',
          600: '#0070f3',
          700: '#0056d6',
          800: '#003eb3',
          900: '#00299c',
        },
        'curious-purple': {
          100: '#f5e9ff',
          200: '#e4ccff',
          300: '#c9a5ff',
          400: '#a66dff',
          500: '#8c42ff',
          600: '#7928ca',
          700: '#6020a6',
          800: '#45187d',
          900: '#301253',
        },
        'curious-dark': {
          100: '#e6e8ea',
          200: '#bbc1c7',
          300: '#8e99a3',
          400: '#636e7a',
          500: '#3f4955',
          600: '#1f2937',
          700: '#111827',
          800: '#0b111e',
          900: '#050a14',
          950: '#030508',
        },
        'deep-black': '#0a0a0a',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-25px)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.4' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 15px 5px rgba(139, 92, 246, 0.15)',
            transform: 'scale(1)' 
          },
          '50%': { 
            boxShadow: '0 0 25px 8px rgba(139, 92, 246, 0.25)',
            transform: 'scale(1.02)' 
          }
        },
        'glow-text': {
          '0%, 100%': { 
            textShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
          },
          '50%': { 
            textShadow: '0 0 12px rgba(255, 255, 255, 0.8)',
          }
        }
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float-slow 12s ease-in-out infinite',
        'float-fast': 'float-fast 6s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 45s linear infinite',
        'pulse-subtle': 'pulse-subtle 15s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 1s ease-out forwards',
        'fadeInRight': 'fadeInRight 1s ease-out forwards',
        'fadeInLeft': 'fadeInLeft 1s ease-out forwards',
        'glow': 'glow 4s ease-in-out infinite',
        'glow-text': 'glow-text 3s ease-in-out infinite',
      },
      backgroundImage: {
        'circuit-pattern': "url('/images/circuit-pattern.svg')",
        'noise-texture': "url('/images/noise-texture.svg')",
      }
    },
  },
  plugins: [],
}
