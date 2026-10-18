/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F5F2EC',
        surface: '#FBFAF7',
        elevated: '#FFFFFF',
        ink: {
          DEFAULT: '#1C2625',
          2: '#4B5754',
          3: '#6F7976',
        },
        line: {
          DEFAULT: '#DAD6CC',
          strong: '#C3BEB0',
        },
        primary: {
          DEFAULT: '#1F4B47',
          hover: '#183D3A',
          active: '#122F2C',
          tint: '#E3EBE8',
        },
        secondary: '#5E7A74',
        accent: {
          DEFAULT: '#B38442',
          text: '#8A6128',
          tint: '#EFE3CF',
        },
        status: {
          success: '#3F7D58',
          warning: '#B7791F',
          error: '#A8432F',
          info: '#3F6C86',
        },
        dark: {
          ground: '#14201F',
          ink: '#EDEAE2',
          ink2: '#A9B3B0',
        }
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        pill: '9999px',
      },
      boxShadow: {
        'sh-1': '0 1px 2px rgba(28,38,37,.06)',
        'sh-2': '0 6px 20px -8px rgba(28,38,37,.14)',
        'sh-3': '0 24px 60px -24px rgba(28,38,37,.28)',
      },
      maxWidth: {
        content: '1280px',
        wide: '1440px',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        emph: 'cubic-bezier(0.16, 1, 0.3, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        med: '280ms',
        slow: '520ms',
        page: '320ms',
      }
    },
  },
  plugins: [],
}
