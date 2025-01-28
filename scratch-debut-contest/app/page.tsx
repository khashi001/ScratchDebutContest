import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Scratchチャレンジ！はじめの一歩コンテスト</h1>
      <div className="text-center mb-8">
        <p className="text-xl mb-4">小中学生のみなさん、Scratchで素晴らしい作品を作りませんか？</p>
        <p className="text-lg mb-4">あなたのアイデアと創造力で、驚きと感動を与える作品を待っています！</p>
      </div>
      <div className="flex justify-center space-x-4">
        <Link href="/contest">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            コンテスト詳細
          </Button>
        </Link>
        <Link href="/entry">
          <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">応募する</Button>
        </Link>
      </div>
    </div>
  )
}


