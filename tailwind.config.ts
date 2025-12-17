import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        fantasy: ['var(--font-cinzel)', 'serif'],
        medieval: ['var(--font-medieval)', 'cursive'],
        body: ['var(--font-philosopher)', 'sans-serif'],
      },
      colors: {
        game: {
          gold: 'hsl(51deg 100% 50%)',
          'gold-muted': 'hsl(36deg 57% 53%)',
          copper: 'hsl(30deg 34% 41%)',
          'copper-muted': 'hsl(30deg 19% 44%)',
          wood: 'hsl(30deg 52% 10%)',
          'wood-dark': 'hsl(30deg 52% 4%)',
          success: 'hsl(120deg 43% 59%)',
          danger: 'hsl(0deg 100% 64%)',
          info: 'hsl(199deg 92% 69%)',
          magic: 'hsl(280deg 50% 63%)',
        },
        rarity: {
          common: 'hsl(0deg 0% 70%)',
          uncommon: 'hsl(120deg 43% 59%)',
          rare: 'hsl(199deg 92% 69%)',
          epic: 'hsl(280deg 50% 63%)',
          legendary: 'hsl(51deg 100% 50%)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInWave: {
          '0%': { opacity: '0', transform: 'translateY(10px)', filter: 'blur(4px)' },
          '50%': { opacity: '0.7', filter: 'blur(2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px) rotate(-2deg)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px) rotate(2deg)' },
        },
        floatUp: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-40px) scale(1.2)' },
          '100%': { opacity: '0', transform: 'translateY(-80px) scale(0.8)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(212, 165, 116, 0.5)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 40px rgba(212, 165, 116, 0.7)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-wave': 'fadeInWave 0.6s ease-out',
        shake: 'shake 0.5s',
        'float-up': 'floatUp 1.5s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
