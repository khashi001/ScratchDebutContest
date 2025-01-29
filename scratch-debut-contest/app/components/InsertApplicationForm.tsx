"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function InsertApplicationForm() {
  const [result, setResult] = useState<string | null>(null)

  const handleInsert = async () => {
    const { error } = await supabase
      .from("applications")
      .insert({
        name: "あああ",
        age: 10,
        email: "aaa@bb.cc",
        phone: "00000000000",
        title: "aaa",
        description: "aaa",
      })
      .select()

    if (error) {
      console.error("Error inserting data:", error)
      setResult(`エラーが発生しました: ${error.message}`)
    } else {
      setResult("データが正常に挿入されました。")
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

