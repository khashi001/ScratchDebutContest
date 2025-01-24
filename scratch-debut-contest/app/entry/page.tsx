"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function EntryForm() {
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
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    setIsSubmitting(true)

    try {
      if (!formData.sb3File) {
        throw new Error("Please select a Scratch project file")
      }

      // Generate a unique file name
      const fileExt = formData.sb3File.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      // Upload file to Supabase Storage
      const { data: fileData, error: fileError } = await supabase.storage
        .from("scratch-projects")
        .upload(fileName, formData.sb3File, {
          cacheControl: "3600",
          upsert: false,
        })

      if (fileError) {
        console.error("Error uploading file:", fileError)
        throw new Error("Error uploading file. Please try again.")
      }

      // Get the public URL for the uploaded file
      const {
        data: { publicUrl },
      } = supabase.storage.from("scratch-projects").getPublicUrl(fileName)

      // Save entry data to database
      const { data: entryData, error: entryError } = await supabase
        .from("contest_entry")
        .insert({
          name: formData.name,
          age: Number.parseInt(formData.age),
          email: formData.email,
          phone_number: formData.phoneNumber,
          work_title: formData.workTitle,
          work_description: formData.workDescription,
          sb3_file_path: publicUrl,
        })
        .select()
        .single()

      if (entryError) {
        console.error("Error submitting entry:", entryError)
        throw new Error("Error submitting entry. Please try again.")
      }

      // Store the entry data in localStorage for the confirmation page
      localStorage.setItem(
        "entryData",
        JSON.stringify({
          ...formData,
          sb3FilePath: publicUrl,
        }),
      )

      router.push("/entry/confirm")
    } catch (error) {
      console.error("Error:", error)
      alert(error instanceof Error ? error.message : "An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Submit Your Entry</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            min="8"
            max="16"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
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
        <div className="flex justify-between items-center">
          <Link href="/privacy">
            <Button type="button" variant="link">
              Privacy Policy
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Review Submission"}
          </Button>
        </div>
      </form>
    </div>
  )
}

