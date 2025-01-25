"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function EvaluateWork({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [evaluation, setEvaluation] = useState({
    creationLevel: "",
    uniquenessLevel: "",
    appearanceLevel: "",
    comments: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEvaluation((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the evaluation data to your API
    console.log("Evaluation submitted:", evaluation)
    router.push(`/judge/works/${params.id}/complete`)
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Evaluate Work</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <div>
          <Label htmlFor="creationLevel">Creation Level (1-10)</Label>
          <Input
            id="creationLevel"
            name="creationLevel"
            type="number"
            min="1"
            max="10"
            value={evaluation.creationLevel}
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
            value={evaluation.uniquenessLevel}
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
            value={evaluation.appearanceLevel}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="comments">Comments</Label>
          <Textarea id="comments" name="comments" value={evaluation.comments} onChange={handleInputChange} rows={4} />
        </div>
        <Button type="submit" className="w-full">
          Submit Evaluation
        </Button>
      </form>
    </div>
  )
}

