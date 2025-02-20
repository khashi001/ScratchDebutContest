import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">応募ありがとうございます！</h1>
      <p className="text-xl mb-8">あなたの応募を受け付けました。</p>
      <Link href="/">
        <Button>トップページに戻る</Button>
      </Link>
    </div>
  )
}


