"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { submitApplication } from "../actions"

export default function ApplicationForm() {
  const [result, setResult] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    const response = await submitApplication(formData)
    setResult(response.message)
  }

  return (
    <form action={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <Label htmlFor="name">名前</Label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="age">年齢</Label>
        <Input id="age" name="age" type="number" required />
      </div>
      <div>
        <Label htmlFor="email">メールアドレス</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="phone">電話番号</Label>
        <Input id="phone" name="phone" required />
      </div>
      <div>
        <Label htmlFor="title">タイトル</Label>
        <Input id="title" name="title" required />
      </div>
      <div>
        <Label htmlFor="description">説明</Label>
        <Textarea id="description" name="description" />
      </div>
      <div>
        <Label htmlFor="file">Scratchファイル（.sb3）</Label>
        <Input id="file" name="file" type="file" accept=".sb3" />
      </div>
      <Button type="submit">送信</Button>
      {result && <p className="mt-4 text-sm text-green-600">{result}</p>}
    </form>
  )
}

