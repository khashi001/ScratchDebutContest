"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function JudgeLogin() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ username: "", password: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      username: credentials.username,
      password: credentials.password,
      redirect: false,
    })

    if (result?.error) {
      alert("Invalid credentials. Please try again.")
    } else {
      router.push("/judge/dashboard")
    }
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Judge Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        <div>
          <Label htmlFor="username">Judge ID</Label>
          <Input id="username" name="username" value={credentials.username} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>
    </div>
  )
}

