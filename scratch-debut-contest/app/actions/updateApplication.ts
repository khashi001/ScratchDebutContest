"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function updateApplication(
  id: number,
  data: {
    creation_level?: number
    uniqueness_level?: number
    appearance_level?: number
    free_comment?: string
  },
) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const { error } = await supabase.from("applications").update(data).eq("id", id)

  if (error) {
    console.error("Error updating application:", error)
    throw new Error("応募の更新中にエラーが発生しました")
  }

  revalidatePath("/applications")
}


