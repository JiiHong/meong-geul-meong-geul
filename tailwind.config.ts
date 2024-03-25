import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: { max: '639px' },
      md: { max: '767px' },
      lg: { max: '1023px' },
      xl: { max: '1279px' },
      '2xl': { max: '1535px' },
    },
    extend: {
      colors: {
        gray: {
          50: '#f7f7f7',
          100: '#eaeaea',
          200: '#dddddd',
          300: '#d3d3d3',
          400: '#cacaca',
          500: '#b0b0b0',
          600: '#999999',
          700: '#363939',
          800: '#353535',
          900: '#050505',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        base: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
export default config;
