import Link from "next/link"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import fs from "fs"
import path from "path"

export default function Home() {
  // Markdownファイルを読み込む
  const overviewMarkdown = fs.readFileSync(path.join(process.cwd(), "contents", "overview.md"), "utf-8")

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg">
      <div className="prose prose-rose dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-900 dark:prose-p:text-gray-200 prose-strong:text-rose-700 dark:prose-strong:text-rose-300 prose-li:text-gray-900 dark:prose-li:text-gray-200">
        <ReactMarkdown>{overviewMarkdown}</ReactMarkdown>
      </div>
      <div className="space-x-4 pt-4">
        <Link href="/apply">
          <Button className="bg-rose-700 hover:bg-rose-800 text-white">応募する</Button>
        </Link>
        <Link href="/applications">
          <Button className="bg-rose-600 hover:bg-rose-700 text-white">応募一覧を見る</Button>
        </Link>
      </div>
    </div>
  )
}

