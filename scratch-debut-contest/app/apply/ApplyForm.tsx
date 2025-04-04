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

// ファイルサイズ制限（バイト単位）
const MAX_SB3_FILE_SIZE = 20 * 1024 * 1024 // 20MB
const MAX_MOVIE_FILE_SIZE = 150 * 1024 * 1024 // 150MB（希望サイズ）

export default function ApplyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState("")
  const [sb3FileName, setSb3FileName] = useState<string | null>(null)
  const [movieFileName, setMovieFileName] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [sb3File, setSb3File] = useState<File | null>(null)
  const [movieFile, setMovieFile] = useState<File | null>(null)
  const sb3FileInputRef = useRef<HTMLInputElement>(null)
  const movieFileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  // 大きなファイルの処理時にユーザーに状況を知らせる
  useEffect(() => {
    if (isSubmitting) {
      if (uploadProgress >= 90) {
        setUploadStatus("大きなファイルをアップロード中です。しばらくお待ちください...")
      } else if (uploadProgress >= 60) {
        setUploadStatus("ファイルを処理中です...")
      } else if (uploadProgress >= 30) {
        setUploadStatus("サーバーにファイルを送信中...")
      }
    }
  }, [isSubmitting, uploadProgress])

  // 署名付きURLを取得してファイルをアップロードする関数
  const uploadFileWithSignedUrl = async (file: File) => {
    const fileExt = file.name.split(".").pop() || "";
    
    // 署名付きURLの取得
    const response = await fetch('/api/upload-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        fileType: file.type,
        fileExt
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`ファイルアップロードURLの取得に失敗しました: ${error.error || '不明なエラー'}`);
    }
    
    const { signedUrl, path } = await response.json();
    
    // 署名付きURLを使用してファイルを直接アップロード
    const uploadResponse = await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });
    
    if (!uploadResponse.ok) {
      throw new Error(`ファイルのアップロードに失敗しました: ${uploadResponse.statusText}`);
    }
    
    return path;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setUploadProgress(0)
    setUploadStatus("アップロードを開始しています...")
    setErrorMessage(null)

    if (!formRef.current || !sb3File || !movieFile) {
      setErrorMessage("必須フィールドが入力されていないか、ファイルが選択されていません。")
      setIsSubmitting(false)
      return
    }

    const formData = new FormData(formRef.current)

    try {
      // アップロード進捗の更新関数
      const updateProgress = (progress: number) => {
        setUploadProgress(progress)
      }

      // フォームデータから必要な情報を取得
      const name = formData.get("name") as string
      const age = Number.parseInt(formData.get("age") as string)
      const email = formData.get("email") as string
      const title = formData.get("title") as string
      const description = formData.get("description") as string

      if (!name || !age || !email || !title || !description) {
        throw new Error("必須フィールドが入力されていません。")
      }

      // ファイルサイズチェック
      if (sb3File.size > MAX_SB3_FILE_SIZE) {
        throw new Error(`sb3ファイルのサイズが大きすぎます。${(MAX_SB3_FILE_SIZE/1024/1024).toFixed(0)}MB以下のファイルを選択してください。`)
      }

      if (movieFile.size > MAX_MOVIE_FILE_SIZE) {
        throw new Error(`動画ファイルのサイズが大きすぎます。${(MAX_MOVIE_FILE_SIZE/1024/1024).toFixed(0)}MB以下のファイルを選択してください。`)
      }

      // sb3ファイルのアップロード（進捗：0% → 40%）
      updateProgress(10)
      setUploadStatus("sb3ファイルをアップロード中...")
      const sb3FilePath = await uploadFileWithSignedUrl(sb3File)
      updateProgress(40)

      // 動画ファイルのアップロード（進捗：40% → 90%）
      setUploadStatus("動画ファイルをアップロード中...")
      const movieFilePath = await uploadFileWithSignedUrl(movieFile)
      updateProgress(90)

      // 応募情報の送信（進捗：90% → 100%）
      setUploadStatus("応募情報を登録中...")
      const result = await submitApplication({
        name,
        age,
        email,
        title,
        description,
        sb3FilePath,
        movieFilePath
      })

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
        alert(`sb3ファイルのサイズが大きすぎます。${(MAX_SB3_FILE_SIZE/1024/1024).toFixed(0)}MB以下のファイルを選択してください。`)
        e.target.value = ""
        setSb3FileName(null)
        setSb3File(null)
      } else {
        setSb3FileName(file.name)
        setSb3File(file)
      }
    } else {
      setSb3FileName(null)
      setSb3File(null)
    }
  }

  const handleMovieFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith("video/")) {
        if (file.size > MAX_MOVIE_FILE_SIZE) {
          alert(`動画ファイルのサイズが大きすぎます。${(MAX_MOVIE_FILE_SIZE/1024/1024).toFixed(0)}MB以下のファイルを選択してください。`)
          e.target.value = ""
          setMovieFileName(null)
          setMovieFile(null)
        } else {
          setMovieFileName(file.name)
          setMovieFile(file)
        }
      } else {
        alert("動画ファイルを選択してください。")
        e.target.value = ""
        setMovieFileName(null)
        setMovieFile(null)
      }
    } else {
      setMovieFileName(null)
      setMovieFile(null)
    }
  }

  const handleSb3FileButtonClick = () => {
    sb3FileInputRef.current?.click()
  }

  const handleMovieFileButtonClick = () => {
    movieFileInputRef.current?.click()
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
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
        <div className="text-xs text-gray-500 mt-1">最大ファイルサイズ: 20MB</div>
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
          作品紹介動画
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
        <div className="text-xs text-gray-500 mt-1">最大ファイルサイズ: 150MB</div>
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
