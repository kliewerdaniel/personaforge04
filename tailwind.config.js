/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,mdx}",  // Cover Markdown/MDX files
    "./public/**/*.{html}",   // Cover index & static pages
    './src/**/*.{js,ts,jsx,tsx}', // adjust to match your folders
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6A6AFE',
          200: '#DADAFF',
          800: '#3535B0',
        },
        secondary: '#8E8EFF',
        neutral: {
          100: '#FFFFFF',
          200: '#F8F8F8',
          300: '#E0E0E0',
          400: '#A0A0A0',
          500: '#333333',
        },
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FFC107',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Montserrat', 'Roboto', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0px 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0px 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0px 10px 15px rgba(0, 0, 0, 0.15)',
      },
      keyframes: {
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        slideInFromRight: 'slideInFromRight 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
  safelist: [
    'text-3xl',
    'md:text-3xl',
    'text-{xs,sm,md,lg,xl,2xl}',
    'md:text-{sm,md,lg}',
  ],
}
