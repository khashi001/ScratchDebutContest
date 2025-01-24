import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function JudgeDashboard() {
  const session = await getServerSession()

  if (!session) {
    redirect("/judge/login")
  }

  const { data: entriesToReview, error } = await supabase
    .from('contest_entry')
    .select('id, work_title')
    .not('review.judge_id', 'eq', session.user.id)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching entries to review:', error)
    return <div>Error loading entries. Please try again later.</div>
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Judge Dashboard</h1>
      <h2 className="text-2xl font-semibold mb-4">Entries to Review</h2>
      {entriesToReview.length > 0 ? (
        <ul className="space-y-4">
          {entriesToReview.map((entry) => (
            <li key={entry.id}>
              <Link href={`/judge/works/${entry.id}`}>
                <Button variant="outline">{entry.work_title}</Button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No entries to review at the moment.</p>
      )}
      <div className="space-y-4 mt-8">
        <Link href="/judge/works">
          <Button size="lg" className="w-full">
            View Submitted Works
          </Button>
        </Link>
        <Link href="/judge/works/filter">
          <Button size="lg" className="w-full" variant="outline">
            Filter Works
          </Button>
        </Link>
      </div>
    </div>
  )
}

