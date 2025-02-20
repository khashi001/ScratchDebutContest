import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function Navbar() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <nav className="bg-rose-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Scratchチャレンジ！はじめの一歩コンテスト
        </Link>
        <div>
          <Link href="/apply" className="mr-4 hover:text-orange-200">
            応募する
          </Link>
          {session && (
            <Link href="/applications" className="hover:text-orange-200">
              応募一覧
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}


