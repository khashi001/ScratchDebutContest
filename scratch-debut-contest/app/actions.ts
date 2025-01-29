"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function submitApplication(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const age = Number.parseInt(formData.get("age") as string)
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const file = formData.get("file") as File

    let filePath = ""
    if (file.size > 0) {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      const { data, error } = await supabase.storage.from("scratch-files").upload(fileName, file)

      if (error) throw error

      filePath = data.path
    }

    const { error } = await supabase
      .from("applications")
      .insert({ name, age, email, phone, title, description, file_path: filePath })
      .select()
      

    if (error) throw error

    return { success: true, message: "データとファイルが正常に挿入されました。" }
  } catch (error) {
    console.error("Error inserting data:", error)
    return { success: false, message: `エラーが発生しました: ${(error as Error).message}` }
  }
}

