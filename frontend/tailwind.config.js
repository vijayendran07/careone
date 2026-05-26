export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      maxWidth: {
        'container-max': '1152px', // Equal to max-w-6xl for a tighter, premium packed layout
      },
      colors: {
        primary: '#006a6a',
        'primary-container': '#14a1a1',
        secondary: '#795914',
      },
    },
  },
  plugins: [],
}
