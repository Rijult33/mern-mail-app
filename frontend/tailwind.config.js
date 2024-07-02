module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1976d2',
        secondary: '#dc004e',
        background: '#f5f5f5',
        surface: '#ffffff',
        error: '#f44336',
        textPrimary: '#212121',
        textSecondary: '#757575',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
