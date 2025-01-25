"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Entry {
  id: string
  work_title: string
  work_description: string
  sb3_file_path: string
  // Add other necessary fields
}

export default function ReviewEntryPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [entry, setEntry] = useState<Entry | null>(null)
  const [review, setReview] = useState({
    creationLevel: 0,
    uniquenessLevel: 0,
    appearanceLevel: 0,
    freeComment: "",
  })

  useEffect(() => {
    const fetchEntry = async () => {
      const { data, error } = await supabase.from("contest_entry").select("*").eq("id", params.id).single()

      if (error) {
        console.error("Error fetching entry:", error)
        alert("Error loading entry. Please try again.")
        router.push("/judge/dashboard")
      } else {
        setEntry(data)
      }
    }

    fetchEntry()
  }, [params.id, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setReview((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.from("review").insert({
      contest_entry_id: params.id,
      judge_id: "JUDGE_ID", // Replace with actual judge ID from session
      creation_level: Number.parseInt(review.creationLevel.toString()),
      uniqueness_level: Number.parseInt(review.uniquenessLevel.toString()),
      appearance_level: Number.parseInt(review.appearanceLevel.toString()),
      free_comment: review.freeComment,
      review_status: "completed",
      review_start_date: new Date().toISOString(),
      review_end_date: new Date().toISOString(),
    })

    if (error) {
      console.error("Error submitting review:", error)
      alert("Error submitting review. Please try again.")
    } else {
      alert("Review submitted successfully!")
      router.push("/judge/dashboard")
    }
  }

  if (!entry) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Review Entry: {entry.work_title}</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
        <p>
          <strong>Title:</strong> {entry.work_title}
        </p>
        <p>
          <strong>Description:</strong> {entry.work_description}
        </p>
        <p>
          <strong>Scratch File:</strong>{" "}
          <a
            href={entry.sb3_file_path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View Project
          </a>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="creationLevel">Creation Level (1-10)</Label>
          <Input
            id="creationLevel"
            name="creationLevel"
            type="number"
            min="1"
            max="10"
            value={review.creationLevel}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="uniquenessLevel">Uniqueness Level (1-10)</Label>
          <Input
            id="uniquenessLevel"
            name="uniquenessLevel"
            type="number"
            min="1"
            max="10"
            value={review.uniquenessLevel}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="appearanceLevel">Appearance Level (1-10)</Label>
          <Input
            id="appearanceLevel"
            name="appearanceLevel"
            type="number"
            min="1"
            max="10"
            value={review.appearanceLevel}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="freeComment">Comments</Label>
          <Textarea
            id="freeComment"
            name="freeComment"
            value={review.freeComment}
            onChange={handleInputChange}
            rows={4}
          />
        </div>
        <Button type="submit">Submit Review</Button>
      </form>
    </div>
  )
}
