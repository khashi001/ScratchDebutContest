import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WorksList() {
  // In a real application, you would fetch this data from your API
  const works = [
    { id: 1, title: "Space Adventure", author: "Alice", status: "Not Reviewed" },
    { id: 2, title: "Maze Runner", author: "Bob", status: "Reviewed" },
    { id: 3, title: "Music Maker", author: "Charlie", status: "Not Reviewed" },
  ]

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Submitted Works</h1>
      <div className="space-y-4">
        {works.map((work) => (
          <div key={work.id} className="flex items-center justify-between p-4 border rounded">
            <div>
              <h2 className="text-xl font-semibold">{work.title}</h2>
              <p>By: {work.author}</p>
              <p>Status: {work.status}</p>
            </div>
            <Link href={`/judge/works/${work.id}`}>
              <Button>View Details</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

