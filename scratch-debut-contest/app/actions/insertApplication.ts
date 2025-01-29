"use server"

import { createClient } from "@supabase/supabase-js"

export async function insertApplication() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const { data, error } = await supabase
    .from("applications")
    .insert({
      name: "あああ",
      age: 10,
      email: "aaa@bb.cc",
      phone: "00000000000",
      title: "aaa",
      description: "aaa",
    })
    .select()

  if (error) {
    console.error("Error inserting data:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

