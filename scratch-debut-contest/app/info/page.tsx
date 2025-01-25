import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ContestInfo() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Scratchチャレンジ！はじめの一歩コンテスト</h1>
      <div className="prose max-w-none">
        <h2>はじめての挑戦、大歓迎！</h2>
        <p>
          "プログラミングって面白そうだけど、コンテストに出すのはちょっと不安…" そんなあなたのためのコンテスト、それが
          <strong>Scratchチャレンジ！はじめの一歩コンテスト</strong> です！
        </p>
        <p>
          Scratchを使ったオリジナル作品を応募して、あなたのアイデアや工夫をみんなに見てもらいませんか？
          <strong>はじめてのコンテスト出品</strong> を応援するための特別なコンテストなので、ぜひ気軽に挑戦してください！
        </p>
        <p>
          優秀な作品には <strong>賞状と特製アクリルキーホルダー</strong> などの賞品をプレゼント！ あなたの "はじめの一歩" を応援します！
        </p>
        <hr />
        <h2>募集要項</h2>
        <h3>応募資格</h3>
        <ul>
          <li><strong>小学生・中学生</strong></li>
          <li><strong>Scratchの作品をはじめてコンテストに出品する人</strong></li>
          <li><strong>通っている学校、塾、またはプログラミング教室からの紹介が必要</strong>（クローズドのコンテストです）</li>
        </ul>
        <h3>応募作品のルール</h3>
        <ul>
          <li><strong>Scratchを使ったオリジナル作品</strong></li>
          <li><strong>自由なテーマでOK！</strong> ゲームでも、アニメーションでも、アイデア次第！</li>
        </ul>
        <h3>審査基準</h3>
        <ul>
          <li><strong>完成度</strong>（しっかり動くかな？ 使いやすいかな？）</li>
          <li><strong>デザイン性</strong>（見た目や動きが魅力的か）</li>
          <li><strong>ユニークさ</strong>（アイデアや工夫が光っているか）</li>
        </ul>
        <hr />
        <h2>応募方法</h2>
        <h3>提出物</h3>
        <ul>
          <li><strong>作品（sb3ファイル）</strong></li>
          <li><strong>作品のタイトル</strong></li>
          <li><strong>応募者の名前</strong></li>
          <li><strong>eメールアドレス</strong></li>
          <li><strong>電話番号</strong></li>
        </ul>
        <p><strong>応募締め切り：2025年3月31日</strong></p>
        <p><strong>審査結果発表：2025年5月3日</strong></p>
        <p>受賞者には個別にご連絡します！</p>
        <hr />
        <h2>賞品</h2>
        <p>受賞者には <strong>賞状と特製アクリルキーホルダー</strong> などをプレゼント！</p>
        <p>あなたの努力の証を手に入れよう！</p>
        <hr />
        <h2>主催・運営</h2>
        <p><strong>主催：Scratch Debut Contest 委員会</strong></p>
        <p><strong>協力団体：株式会社コーディエンス、PCN川越、PCN幕張</strong></p>
        <p><strong>サイト運営：OrangeForest (<a href="https://orangfeforest.jp">https://orangfeforest.jp</a>)</strong></p>
        <p><strong>お問い合わせ：xxxxx@yy.com</strong></p>
        <hr />
        <p>はじめの一歩を踏み出すみんなのチャレンジを待っています！</p>
        <p><strong>ふるってご参加ください！</strong></p>
      </div>
      <div className="mt-8 space-x-4">
        <Link href="/entry">
          <Button size="lg">Submit Your Entry</Button>
        </Link>
        <Link href="/privacy">
          <Button size="lg" variant="outline">
            Privacy Policy
          </Button>
        </Link>
      </div>
    </div>
  )
}

