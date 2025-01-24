import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EvaluationComplete() {
  return (
    <div className="container mx-auto py-12 text-center">
      <h1 className="text-3xl font-bold mb-6">Evaluation Complete!</h1>
      <p className="mb-8 text-xl">Thank you for your valuable input.</p>
      <div className="space-x-4">
        <Link href="/judge/works">
          <Button size="lg">Back to Works List</Button>
        </Link>
        <Link href="/judge/dashboard">
          <Button size="lg" variant="outline">
            Judge Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}

