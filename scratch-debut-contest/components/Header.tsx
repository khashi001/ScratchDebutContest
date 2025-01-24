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
            <Link href="/info">Contest Info</Link>
          </li>
          <li>
            <Link href="/entry">Submit Entry</Link>
          </li>
          <li>
            <Link href="/judge/login">Judge Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

