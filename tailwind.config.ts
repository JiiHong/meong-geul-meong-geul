import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
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
      fontSize: {
        '2xs': '0.7rem',
        '3xs': '0.65rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        base: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'pofile-border':
          'linear-gradient(133.91deg, #FFCE4F 8.49%, #FFC175 49.01%, #6788FF 92.03%);',
        'orange-gradient':
          'linear-gradient(177.92deg, #FFF3E6 1.7%, #FFFEF9 98.25%)',
        ddong: `url('/ddong.png')`,
      },
    },
  },
  plugins: [],
};
export default config;
