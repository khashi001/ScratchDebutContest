import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WorkDetail({ params }: { params: { id: string } }) {
  // In a real application, you would fetch this data from your API
  const work = {
    id: params.id,
    title: "Space Adventure",
    author: "Alice",
    description: "An exciting space exploration game created with Scratch.",
    fileUrl: "/path/to/space_adventure.sb3",
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">{work.title}</h1>
      <div className="space-y-4 mb-8">
        <p>
          <strong>Author:</strong> {work.author}
        </p>
        <p>
          <strong>Description:</strong> {work.description}
        </p>
        <p>
          <strong>File:</strong>
          <Link href={work.fileUrl} className="text-primary hover:underline ml-2">
            Download Scratch Project
          </Link>
        </p>
      </div>
      <Link href={`/judge/works/${params.id}/evaluate`}>
        <Button size="lg">Evaluate Work</Button>
      </Link>
    </div>
  )
}

