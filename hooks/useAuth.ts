"use client"

import { useRouter } from "next/navigation"
import { useContext } from "react"
import { AuthContext } from "@/contexts/auth-context"

export function useAuth() {
  const router = useRouter()
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  const { user, setUser } = context

  const logout = async () => {
    // Here you would typically call your API to invalidate the session
    // For now, we'll just clear the user from the context
    setUser(null)

    // Redirect to login page
    router.push("/login")
  }

  return {
    user,
    logout,
  }
}

