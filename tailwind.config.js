/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          glow: '#D4A853',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'amber-glow': '0 0 0 1px rgba(212, 168, 83, 0.5), 0 0 20px rgba(212, 168, 83, 0.15)',
        'amber-glow-sm': '0 0 0 1px rgba(212, 168, 83, 0.4)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'slide-down': 'slide-down 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
