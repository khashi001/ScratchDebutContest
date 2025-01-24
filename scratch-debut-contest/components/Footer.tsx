import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Scratch Debut Contest. All rights reserved.</p>
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}

