import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ContestDetails() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">コンテスト詳細</h1>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">応募要項</h2>
        <ul className="list-disc list-inside mb-6">
          <li>対象: 小学生・中学生</li>
          <li>テーマ: 自由（あなたの想像力を活かした作品）</li>
          <li>応募期間: 2025年3月末日まで</li>
          <li>結果発表: 2025年5月3日</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4">審査基準</h2>
        <ul className="list-disc list-inside mb-6">
          <li>完成度（5点満点）</li>
          <li>ユニーク度（5点満点）</li>
          <li>見た目度（5点満点）</li>
        </ul>
        <div className="text-center">
          <Link href="/entry">
            <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">応募する</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


