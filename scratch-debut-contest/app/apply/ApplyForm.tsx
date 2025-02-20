"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitApplication } from "../actions/submitApplication"
import { Upload, Loader2 } from "lucide-react"
import type React from "react"

const MAX_SB3_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes
const MAX_MOVIE_FILE_SIZE = 400 * 1024 * 1024 // 400MB in bytes

export default function ApplyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState("")
  const [sb3FileName, setSb3FileName] = useState<string | null>(null)
  const [movieFileName, setMovieFileName] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const sb3FileInputRef = useRef<HTMLInputElement>(null)
  const movieFileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isSubmitting && uploadProgress >= 90) {
      setUploadStatus("大きなファイルをアップロード中です。しばらくお待ちください...")
    }
  }, [isSubmitting, uploadProgress])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setUploadProgress(0)
    setUploadStatus("アップロードを開始しています...")
    setErrorMessage(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      // Simulate file upload progress
      const uploadSimulation = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(uploadSimulation)
            return 90
          }
          const increment = prev < 50 ? 10 : prev < 80 ? 5 : 1
          return Math.min(prev + increment, 90)
        })
      }, 500)

      const result = await submitApplication(formData)

      clearInterval(uploadSimulation)
      setUploadProgress(100)
      setUploadStatus("アップロード完了！")

      if (result.success) {
        router.push("/thank-you")
      } else {
        setErrorMessage(result.error || "応募中にエラーが発生しました。")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      setErrorMessage(error instanceof Error ? error.message : "応募中にエラーが発生しました。もう一度お試しください。")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSb3FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > MAX_SB3_FILE_SIZE) {
        alert("sb3ファイルのサイズが大きすぎます。10MB以下のファイルを選択してください。")
        e.target.value = ""
        setSb3FileName(null)
      } else {
        setSb3FileName(file.name)
      }
    } else {
      setSb3FileName(null)
    }
  }

  const handleMovieFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith("video/")) {
        if (file.size > MAX_MOVIE_FILE_SIZE) {
          alert("動画ファイルのサイズが大きすぎます。400MB以下のファイルを選択してください。")
          e.target.value = ""
          setMovieFileName(null)
        } else {
          setMovieFileName(file.name)
        }
      } else {
        alert("動画ファイルを選択してください。")
        e.target.value = ""
        setMovieFileName(null)
      }
    } else {
      setMovieFileName(null)
    }
  }

  const handleSb3FileButtonClick = () => {
    sb3FileInputRef.current?.click()
  }

  const handleMovieFileButtonClick = () => {
    movieFileInputRef.current?.click()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div>
        <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
          名前
        </Label>
        <Input id="name" name="name" required className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
      </div>
      <div>
        <Label htmlFor="age" className="text-gray-700 dark:text-gray-300">
          年齢
        </Label>
        <Input
          id="age"
          name="age"
          type="number"
          required
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
          e-mailアドレス
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
      <div>
        <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">
          作品名
        </Label>
        <Input
          id="title"
          name="title"
          required
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
      <div>
        <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
          作品の説明
        </Label>
        <Textarea
          id="description"
          name="description"
          required
          className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>
      <div>
        <Label htmlFor="sb3_file" className="text-gray-700 dark:text-gray-300">
          作品（sb3ファイル）
        </Label>
        <div className="flex items-center space-x-2">
          <Button type="button" onClick={handleSb3FileButtonClick} className="bg-rose-700 hover:bg-rose-800 text-white">
            <Upload className="w-4 h-4 mr-2" />
            sb3ファイルを選択
          </Button>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {sb3FileName ? sb3FileName : "ファイルが選択されていません"}
          </span>
        </div>
        <Input
          id="sb3_file"
          name="sb3_file"
          type="file"
          accept=".sb3"
          required
          className="hidden"
          ref={sb3FileInputRef}
          onChange={handleSb3FileChange}
        />
      </div>
      <div>
        <Label htmlFor="movie_file" className="text-gray-700 dark:text-gray-300">
          作品紹介動画（400MB以内）
        </Label>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            onClick={handleMovieFileButtonClick}
            className="bg-rose-700 hover:bg-rose-800 text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            動画ファイルを選択
          </Button>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {movieFileName ? movieFileName : "ファイルが選択されていません"}
          </span>
        </div>
        <Input
          id="movie_file"
          name="movie_file"
          type="file"
          accept="video/*"
          required
          className="hidden"
          ref={movieFileInputRef}
          onChange={handleMovieFileChange}
        />
      </div>
      {isSubmitting && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
            <Loader2 className="animate-spin mr-2" size={16} />
            <span>{uploadStatus}</span>
          </div>
        </div>
      )}
      <Button type="submit" disabled={isSubmitting} className="bg-rose-700 hover:bg-rose-800 text-white w-full">
        {isSubmitting ? "送信中..." : "応募する"}
      </Button>
      {errorMessage && (
        <div className="text-red-500 dark:text-red-400 font-bold mt-4 p-4 bg-red-100 dark:bg-red-900 rounded-md">
          {errorMessage}
          <p className="text-sm mt-2">
            エラーが続く場合は、ファイルサイズを小さくするか、ネットワーク接続を確認してから再度お試しください。
          </p>
        </div>
      )}
    </form>
  )
}

