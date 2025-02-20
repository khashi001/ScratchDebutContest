import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // アプリケーションの全てのファイルを含める
    './pages/**/*.{js,ts,jsx,tsx}', // ページの全てのファイルを含める
    './components/**/*.{js,ts,jsx,tsx}', // コンポーネントの全てのファイルを含める
    './src/**/*.{js,ts,jsx,tsx}', // srcディレクトリの全てのファイルを含める
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
