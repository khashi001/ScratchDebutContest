import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ContestInfo() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Contest Information</h1>
      <div className="prose max-w-none">
        <p>
          The Scratch Debut Contest is an exciting opportunity for young developers to showcase their skills using the
          Scratch programming platform.
        </p>
        <h2>Contest Rules</h2>
        <ul>
          <li>Open to participants aged 8-16</li>
          <li>Projects must be created using Scratch</li>
          <li>Submissions must be original work</li>
          <li>One entry per participant</li>
        </ul>
        <h2>Judging Criteria</h2>
        <ul>
          <li>Creativity</li>
          <li>Technical skill</li>
          <li>Presentation</li>
          <li>Originality</li>
        </ul>
        <h2>Important Dates</h2>
        <ul>
          <li>Submission Start: July 1, 2023</li>
          <li>Submission Deadline: August 31, 2023</li>
          <li>Judging Period: September 1-15, 2023</li>
          <li>Results Announcement: September 30, 2023</li>
        </ul>
      </div>
      <div className="mt-8 space-x-4">
        <Link href="/entry">
          <Button size="lg">Submit Your Entry</Button>
        </Link>
        <Link href="/privacy">
          <Button size="lg" variant="outline">
            Privacy Policy
          </Button>
        </Link>
      </div>
    </div>
  )
}

