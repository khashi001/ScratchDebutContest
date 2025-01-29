import ApplicationForm from "@/app/components/ApplicationForm"

export default function EntryForm() {
  /*
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    email: "",
    phone: "",
    title: "",
    description: "",
    file: null,
  })
*/
//  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//    const { name, value } = e.target
//    setFormData((prev) => ({ ...prev, [name]: value }))
//  }

//  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//    if (e.target.files && e.target.files.length > 0) {
//      setFormData((prev) => ({ ...prev, file: e.target.files![0] }))
//    }
//  }

  // const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault()
    // ここでフォームデータの送信処理を実装します
    // console.log("Form submitted:", formData)
    // Supabaseを使用してデータを保存する処理をここに追加します
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">作品応募フォーム</h1>
      <h2 className="text-4xl font-bold mb-8">すべて入力したら「送信」ボタンをおしてください。sb3ファイルをわすれずに！</h2>
      <ApplicationForm />
    </div>
  )
}



