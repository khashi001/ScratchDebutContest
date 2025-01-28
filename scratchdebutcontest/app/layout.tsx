import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Scratchチャレンジ！はじめの一歩コンテスト",
  description: "小中学生のためのScratchプログラミングコンテスト",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">{children}</div>
      </body>
    </html>
  )
}


