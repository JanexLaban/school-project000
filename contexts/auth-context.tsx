"use client"

import { useContext } from "react"

import type React from "react"
import { createContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  role: string
  avatar?: string
} | null

type AuthContextType = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    // Here you would typically check for an existing session
    // and set the user if one exists
    // Example:
    // const storedUser = localStorage.getItem('user');
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // }
  }, [])

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

