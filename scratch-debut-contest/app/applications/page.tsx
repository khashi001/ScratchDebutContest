import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import ApplicationList from "./ApplicationList"

export default async function Applications() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { data: applications, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching applications:", error)
    return <div>エラーが発生しました。もう一度お試しください。</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">応募一覧</h1>
      <ApplicationList applications={applications} />
    </div>
  )
}

