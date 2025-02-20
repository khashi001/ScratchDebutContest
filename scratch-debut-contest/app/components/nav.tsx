import Link from "next/link"

export default function Nav() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <Link href="/" className="text-xl font-bold">
        Scratchチャレンジ！はじめの一歩コンテスト
        </Link>
      </div>
    </nav>
  )
}


