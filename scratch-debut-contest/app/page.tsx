import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto py-12 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Scratch Debut Contest</h1>
      <p className="mb-8 text-xl">Showcase your Scratch skills and compete with young developers!</p>
      <div className="space-x-4">
        <Link href="/info">
          <Button size="lg">Learn More</Button>
        </Link>
        <Link href="/entry">
          <Button size="lg" variant="outline">
            Submit Your Entry
          </Button>
        </Link>
      </div>
    </div>
  )
}

