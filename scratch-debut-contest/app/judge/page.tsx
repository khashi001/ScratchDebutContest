"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// 仮のデータ構造（実際にはSupabaseから取得します）
const mockSubmissions = [
  { id: 1, title: "宇宙冒険", applicantName: "山田太郎", age: 10 },
  { id: 2, title: "海底探検", applicantName: "佐藤花子", age: 12 },
]

interface Submission {
  id: number
  title: string
  applicantName: string
  age: number
}

interface Scores {
  completion: number
  uniqueness: number
  appearance: number
}

export default function JudgePage() {
  const [submissions] = useState<Submission[]>(mockSubmissions)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [scores, setScores] = useState<Scores>({ completion: 0, uniqueness: 0, appearance: 0 })
  const [comment, setComment] = useState("")

  const handleSubmissionSelect = (submission: Submission) => {
    setSelectedSubmission(submission)
    setScores({ completion: 0, uniqueness: 0, appearance: 0 })
    setComment("")
  }

  const handleScoreChange = (category: keyof Scores, value: string) => {
    setScores((prev) => ({ ...prev, [category]: Number.parseInt(value) }))
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const handleSubmitReview = () => {
    // ここで審査結果をSupabaseに送信します
    console.log("Review submitted:", { submissionId: selectedSubmission?.id, scores, comment })
    // 送信後、選択をリセットします
    setSelectedSubmission(null)
    setScores({ completion: 0, uniqueness: 0, appearance: 0 })
    setComment("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">審査員ページ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">応募作品一覧</h2>
          <ul>
            {submissions.map((submission) => (
              <li key={submission.id} className="mb-2">
                <Button onClick={() => handleSubmissionSelect(submission)} className="w-full text-left">
                  {submission.title} - {submission.applicantName} ({submission.age}歳)
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {selectedSubmission && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">審査フォーム</h2>
              <h3 className="text-xl mb-2">{selectedSubmission.title}</h3>
              <p className="mb-4">
                {selectedSubmission.applicantName} ({selectedSubmission.age}歳)
              </p>
              <div className="mb-4">
                <Label htmlFor="completion">完成度 (1-5)</Label>
                <Input
                  id="completion"
                  type="number"
                  min="1"
                  max="5"
                  value={scores.completion}
                  onChange={(e) => handleScoreChange("completion", e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="uniqueness">ユニーク度 (1-5)</Label>
                <Input
                  id="uniqueness"
                  type="number"
                  min="1"
                  max="5"
                  value={scores.uniqueness}
                  onChange={(e) => handleScoreChange("uniqueness", e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="appearance">見た目度 (1-5)</Label>
                <Input
                  id="appearance"
                  type="number"
                  min="1"
                  max="5"
                  value={scores.appearance}
                  onChange={(e) => handleScoreChange("appearance", e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="comment">コメント</Label>
                <Textarea id="comment" value={comment} onChange={handleCommentChange} />
              </div>
              <Button
                onClick={handleSubmitReview}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                審査結果を送信
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



