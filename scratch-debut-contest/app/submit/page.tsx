"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function SubmitEntryPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phoneNumber: "",
    workTitle: "",
    workDescription: "",
    sb3File: null as File | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, sb3File: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.sb3File) {
      alert("Please upload your Scratch project file.")
      return
    }

    // Upload the Scratch project file
    const { data: fileData, error: fileError } = await supabase.storage
      .from("scratch-projects")
      .upload(`${Date.now()}-${formData.sb3File.name}`, formData.sb3File)

    if (fileError) {
      console.error("Error uploading file:", fileError)
      alert("Error uploading file. Please try again.")
      return
    }

    // Insert the contest entry
    const { error: entryError } = await supabase.from("contest_entry").insert({
      contest_announcement_id: "00000000-0000-0000-0000-000000000000", // Replace with actual contest ID
      name: formData.name,
      age: Number.parseInt(formData.age),
      email: formData.email,
      phone_number: formData.phoneNumber,
      work_title: formData.workTitle,
      work_description: formData.workDescription,
      sb3_file_path: fileData?.path,
    })

    if (entryError) {
      console.error("Error submitting entry:", entryError)
      alert("Error submitting entry. Please try again.")
      return
    }

    alert("Your entry has been submitted successfully!")
    router.push("/thank-you")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Submit Your Scratch Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="workTitle">Project Title</Label>
          <Input id="workTitle" name="workTitle" value={formData.workTitle} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="workDescription">Project Description</Label>
          <Textarea
            id="workDescription"
            name="workDescription"
            value={formData.workDescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="sb3File">Scratch Project File (.sb3)</Label>
          <Input id="sb3File" name="sb3File" type="file" accept=".sb3" onChange={handleFileChange} required />
        </div>
        <Button type="submit">Submit Entry</Button>
      </form>
    </div>
  )
}

