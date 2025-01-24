import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    // Fetch all entries and their reviews
    const { data: entries, error: entriesError } = await supabase.from("contest_entry").select(`
        id,
        review (
          creation_level,
          uniqueness_level,
          appearance_level
        )
      `)

    if (entriesError) throw entriesError

    // Calculate total scores
    const scoredEntries = entries.map((entry) => {
      const totalScore = entry.review.reduce((sum, review) => {
        return sum + review.creation_level + review.uniqueness_level + review.appearance_level
      }, 0)
      return { id: entry.id, totalScore }
    })

    // Sort entries by total score in descending order
    scoredEntries.sort((a, b) => b.totalScore - a.totalScore)

    // Assign ranks
    const rankedEntries = scoredEntries.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }))

    // Store results in the database
    const { error: resultsError } = await supabase.from("result").upsert(
      rankedEntries.map(({ id, totalScore, rank }) => ({
        contest_entry_id: id,
        total_score: totalScore,
        rank,
      })),
    )

    if (resultsError) throw resultsError

    return NextResponse.json({ message: "Results calculated and stored successfully" })
  } catch (error) {
    console.error("Error calculating results:", error)
    return NextResponse.json({ error: "An error occurred while calculating results" }, { status: 500 })
  }
}

