"use client"
import { FileText, Home, Users, Activity, Pill, Bed } from "lucide-react"

const sidebarItems = [
  {
    title: "Nursing",
    items: [
      {
        title: "Dashboard",
        href: "/nurse/dashboard",
        icon: Home
      },
      {
        title: "Patient Care",
        href: "/nurse/patients",
        icon: Users
      },
      {
        title: "Medications",
        href: "/nurse/medications",
        icon: Pill
      },
      {
        title: "Vital Signs",
        href: "/nurse/vitals",
        icon: Activity
      }
    ]
  },
  {
    title: "Management",
    items: [
      {
        title: "Bed Management",
        href: "/nurse/beds",
        icon: Bed
      },
      {
        title: "Reports",
        href: "/nurse/reports",
        icon: FileText
      },
      {
        title: "Messages",
        href: "/nurse/messages",
        icon:\

