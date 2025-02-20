import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "./components/Navbar"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Scratchチャレンジ！はじめの一歩コンテスト",
  description: "Scratchチャレンジ！はじめの一歩コンテストの応募サイト",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-300 via-sky-200 to-indigo-100 dark:from-indigo-900 dark:via-blue-800 dark:to-sky-900`}
      >
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}


