"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FilterWorks() {
  const router = useRouter()
  const [filters, setFilters] = useState({
    keyword: "",
    status: "",
    ageGroup: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically apply these filters to your works list
    console.log("Filters applied:", filters)
    router.push("/judge/works")
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Filter Works</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <div>
          <Label htmlFor="keyword">Keyword</Label>
          <Input
            id="keyword"
            name="keyword"
            value={filters.keyword}
            onChange={handleInputChange}
            placeholder="Search by title or author"
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select name="status" onValueChange={(value) => handleSelectChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="not-reviewed">Not Reviewed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="ageGroup">Age Group</Label>
          <Select name="ageGroup" onValueChange={(value) => handleSelectChange("ageGroup", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="8-10">8-10 years</SelectItem>
              <SelectItem value="11-13">11-13 years</SelectItem>
              <SelectItem value="14-16">14-16 years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">
          Apply Filters
        </Button>
      </form>
    </div>
  )
}

