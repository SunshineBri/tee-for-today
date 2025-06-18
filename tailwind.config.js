import textShadow from 'tailwindcss-textshadow'

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#FF3CAC",
        secondary: "#00F0FF",
        accent: "#7B2FF7",
        highlight: "#F8FF00",
        base: "#0E0E10",
      },
      backgroundImage: {
        funGradient: "linear-gradient(to right, #FF3CAC, #784BA0, #2B86C5)",
        'paint-splash': "url('/paint-splash.png')",
        'order-now': "url('/order-now.png')",
      },
      textShadow: {
        'white-outline': '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, 0 0 8px rgba(255,255,255,0.6)',
      },
      keyframes: {
  fadeIn: {
    '0%': { opacity: '0', transform: 'translateY(12px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  fadeInOnce: {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
},
animation: {
  fadeIn: 'fadeIn 0.6s ease-out forwards',
  fadeInOnce: 'fadeInOnce 1s ease-out forwards',
},
    },
  },
  plugins: [textShadow],
}
