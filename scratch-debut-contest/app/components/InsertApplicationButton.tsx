"use client"

import { useState } from "react"
import { insertApplication } from "../actions/insertApplication"

export default function InsertApplicationButton() {
  const [result, setResult] = useState<string | null>(null)

  const handleInsert = async () => {
    const response = await insertApplication()
    if (response.success) {
      setResult("データが正常に挿入されました。")
    } else {
      setResult(`エラーが発生しました: ${response.error}`)
    }
  }

  return (
    <div>
      <button onClick={handleInsert} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        アプリケーションデータを挿入
      </button>
      {result && <p className="mt-4">{result}</p>}
    </div>
  )
}

