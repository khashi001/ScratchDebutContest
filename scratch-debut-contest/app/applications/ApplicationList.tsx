"use client"

import type React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { StarRating } from "../components/StarRating"
import { updateApplication } from "../actions/updateApplication"

type Application = {
  id: number
  sequence_number: number
  title: string
  description: string
  age: number
  file_path: string
  movie_path: string
  creation_level: number
  uniqueness_level: number
  appearance_level: number
  free_comment: string
}

export default function ApplicationList({ applications }: { applications: Application[] }) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<Application>>({})

  const handleEdit = (app: Application) => {
    setEditingId(app.id)
    setEditData(app)
  }

  const handleSave = async (id: number) => {
    try {
      await updateApplication(id, editData)
      setEditingId(null)
      setEditData({})
      // Here you would typically update the local state or refetch the data
      // For simplicity, we're just closing the edit mode
    } catch (error) {
      console.error("Error updating application:", error)
      alert("更新中にエラーが発生しました。もう一度お試しください。")
    }
  }

  const handleRatingChange = (name: string, value: number) => {
    setEditData((prev) => ({ ...prev, [name]: value }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditData((prev) => ({ ...prev, [name]: value }))
  }

  // Sort applications by sequence_number in descending order
  const sortedApplications = [...applications].sort((a, b) => b.sequence_number - a.sequence_number)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>番号</TableHead>
          <TableHead>作品名</TableHead>
          <TableHead>説明</TableHead>
          <TableHead>年齢</TableHead>
          <TableHead>sb3ファイル</TableHead>
          <TableHead>動画ファイル</TableHead>
          <TableHead>アクション</TableHead>
          <TableHead>創造性</TableHead>
          <TableHead>独自性</TableHead>
          <TableHead>外観</TableHead>
          <TableHead>コメント</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedApplications.map((app) => (
          <TableRow key={app.id}>
            <TableCell>{app.sequence_number}</TableCell>
            <TableCell>{app.title}</TableCell>
            <TableCell>{app.description}</TableCell>
            <TableCell>{app.age}</TableCell>
            <TableCell>
              {app.file_path && (
                <a
                  href={`/api/download?path=${app.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  ダウンロード
                </a>
              )}
            </TableCell>
            <TableCell>
              {app.movie_path && (
                <a
                  href={`/api/download?path=${app.movie_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  ダウンロード
                </a>
              )}
            </TableCell>
            <TableCell>
              {editingId === app.id ? (
                <Button onClick={() => handleSave(app.id)} className="bg-rose-700 hover:bg-rose-800 text-white">
                  保存
                </Button>
              ) : (
                <Button onClick={() => handleEdit(app)} className="bg-rose-700 hover:bg-rose-800 text-white">
                  編集
                </Button>
              )}
            </TableCell>
            <TableCell>
              <StarRating
                rating={editingId === app.id ? editData.creation_level || app.creation_level : app.creation_level}
                onRatingChange={(value) => handleRatingChange("creation_level", value)}
                editable={editingId === app.id}
              />
            </TableCell>
            <TableCell>
              <StarRating
                rating={editingId === app.id ? editData.uniqueness_level || app.uniqueness_level : app.uniqueness_level}
                onRatingChange={(value) => handleRatingChange("uniqueness_level", value)}
                editable={editingId === app.id}
              />
            </TableCell>
            <TableCell>
              <StarRating
                rating={editingId === app.id ? editData.appearance_level || app.appearance_level : app.appearance_level}
                onRatingChange={(value) => handleRatingChange("appearance_level", value)}
                editable={editingId === app.id}
              />
            </TableCell>
            <TableCell>
              {editingId === app.id ? (
                <Textarea
                  name="free_comment"
                  value={editData.free_comment || ""}
                  onChange={handleInputChange}
                  className="w-full"
                />
              ) : (
                app.free_comment
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

