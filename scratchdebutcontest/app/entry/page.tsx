"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function EntryForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    title: "",
    description: "",
    file: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // ここでフォームデータの送信処理を実装します
    console.log("Form submitted:", formData)
    // Supabaseを使用してデータを保存する処理をここに追加します
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">作品応募フォーム</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="mb-4">
          <Label htmlFor="name">氏名</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="age">年齢</Label>
          <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">メールアドレス</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="phone">電話番号</Label>
          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="title">作品タイトル</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="description">作品説明</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <Label htmlFor="file">作品ファイル（.sb3）</Label>
          <Input id="file" name="file" type="file" accept=".sb3" onChange={handleFileChange} required />
        </div>
        <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          応募する
        </Button>
      </form>
    </div>
  )
}



