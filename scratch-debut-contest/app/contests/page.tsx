import { supabase } from "@/lib/supabase"
import { ContestAnnouncement } from "@/components/ContestAnnouncement"

export default async function ContestsPage() {
  const { data: contests, error } = await supabase
    .from("contest_announcement")
    .select("*")
    .order("start_date", { ascending: false })

  if (error) {
    console.error("Error fetching contests:", error)
    return <div>Error loading contests. Please try again later.</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Scratch Debut Contests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest) => (
          <ContestAnnouncement
            key={contest.id}
            id={contest.id}
            title={contest.title}
            description={contest.description}
            startDate={contest.start_date}
            endDate={contest.end_date}
            resultAnnouncementDate={contest.result_announcement_date}
          />
        ))}
      </div>
    </div>
  )
}

