"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function ConfirmEntry() {
  const router = useRouter()

  const handleSubmit = () => {
    // Here you would typically send the data to your API
    // For now, we'll just redirect to the completion page
    router.push("/entry/complete")
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Confirm Your Entry</h1>
      <div className="space-y-4 mb-8">
        <p>
          <strong>Name:</strong> John Doe
        </p>
        <p>
          <strong>Age:</strong> 12
        </p>
        <p>
          <strong>Email:</strong> john@example.com
        </p>
        <p>
          <strong>Phone Number:</strong> 123-456-7890
        </p>
        <p>
          <strong>Project Title:</strong> My Awesome Scratch Game
        </p>
        <p>
          <strong>Project Description:</strong> A fun adventure game created with Scratch.
        </p>
        <p>
          <strong>File:</strong> my_awesome_game.sb3
        </p>
      </div>
      <div className="flex justify-between">
        <Button onClick={() => router.back()} variant="outline">
          Edit Submission
        </Button>
        <Button onClick={handleSubmit}>Confirm and Submit</Button>
      </div>
    </div>
  )
}

