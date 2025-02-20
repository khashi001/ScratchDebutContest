"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function submitApplication(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  try {
    const name = formData.get("name") as string
    const age = Number.parseInt(formData.get("age") as string)
    const email = formData.get("email") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const sb3File = formData.get("sb3_file") as File
    const movieFile = formData.get("movie_file") as File

    if (!name || !age || !email || !title || !description || !sb3File || !movieFile) {
      throw new Error("必須フィールドが入力されていません。")
    }

    let sb3FilePath = null
    let movieFilePath = null

    if (sb3File.size > 0) {
      const fileExt = sb3File.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      const { data: sb3Data, error: sb3Error } = await supabase.storage.from("scratch-files").upload(fileName, sb3File)

      if (sb3Error) throw new Error(`sb3ファイルのアップロードエラー: ${sb3Error.message}`)
      sb3FilePath = sb3Data.path
    }

    if (movieFile.size > 0) {
      const fileExt = movieFile.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      const { data: movieData, error: movieError } = await supabase.storage
        .from("scratch-files")
        .upload(fileName, movieFile)

      if (movieError) throw new Error(`動画ファイルのアップロードエラー: ${movieError.message}`)
      movieFilePath = movieData.path
    }

    const { error: insertError } = await supabase
      .from("applications")
      .insert([{ name, age, email, title, description, file_path: sb3FilePath, movie_path: movieFilePath }])

    if (insertError) throw new Error(`データベース挿入エラー: ${insertError.message}`)

    revalidatePath("/applications")
    return { success: true }
  } catch (error) {
    console.error("Application submission error:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error occurred" }
  }
}

