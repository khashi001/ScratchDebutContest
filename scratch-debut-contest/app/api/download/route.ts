import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path")

  if (!path) {
    return new NextResponse("File path is required", { status: 400 })
  }

  const supabase = createRouteHandlerClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { data, error } = await supabase.storage.from("scratch-files").download(path)

  if (error) {
    console.error("Error downloading file:", error)
    return new NextResponse("Error downloading file", { status: 500 })
  }

  const headers = new Headers()
  headers.append("Content-Type", "application/octet-stream")
  headers.append("Content-Disposition", `attachment; filename=${path.split("/").pop()}`)

  return new NextResponse(data, { headers })
}


