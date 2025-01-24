import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EntryComplete() {
  return (
    <div className="container mx-auto py-12 text-center">
      <h1 className="text-3xl font-bold mb-6">Thank You for Your Submission!</h1>
      <p className="mb-8 text-xl">Your Scratch project has been successfully submitted to the contest.</p>
      <p className="mb-8">We'll review your entry and get back to you soon.</p>
      <Link href="/">
        <Button size="lg">Return to Home</Button>
      </Link>
    </div>
  )
}

