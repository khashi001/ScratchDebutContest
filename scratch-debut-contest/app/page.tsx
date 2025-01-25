import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto py-12 text-center">
      <h1 className="text-4xl font-bold mb-6">Scratchチャレンジ！はじめの一歩コンテスト</h1>
      <p className="mb-8 text-xl">Showcase your Scratch skills and compete with young developers!</p>
      <div className="space-x-4">
        <Link href="/info">
          <Button size="lg">コンテスト詳細</Button>
        </Link>
        <Link href="/entry">
          <Button size="lg" variant="outline">
            応募する
          </Button>
        </Link>
      </div>
    </div>
  )
}

