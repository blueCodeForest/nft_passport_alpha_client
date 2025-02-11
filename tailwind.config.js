const {
  iconsPlugin,
  getIconCollections,
  dynamicIconsPlugin,
} = require('@egoist/tailwindcss-icons');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Vite用
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F9F8',
        lightGray: '#d5d9dd',
        darkGray: '#536471',
        text: '#0f141a',
      },
      screens: {
        xs: '360px', // モバイルデバイスのカスタムブレイクポイント
        '2xl': '1440px', // 大画面用
      },
      fontSize: {
        responsive: ['clamp(1rem, 2.5vw, 2rem)', '1.5'],
      },
    },
    container: {
      center: true, // 自動的に中央揃え
      padding: '0rem', // デフォルトのパディング
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    iconsPlugin({
      collections: getIconCollections([
        'material-symbols',
        'majesticons',
        'tabler',
        'streamline',
        'iconamoon',
        'proicons',
        'fluent',
        'teenyicons',
        'emojione-monotone',
        'solar',
        'lucide',
        'mdi',
      ]),
    }),
    dynamicIconsPlugin(),
  ],
};
