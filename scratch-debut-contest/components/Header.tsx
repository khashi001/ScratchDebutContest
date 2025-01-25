import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Scratch Debut Contest
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/info">コンテスト情報</Link>
          </li>
          <li>
            <Link href="/entry">応募する</Link>
          </li>
          <li>
            <Link href="/judge/login">審査する</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

