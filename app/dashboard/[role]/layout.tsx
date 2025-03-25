import type React from "react"
import DashboardLayout from "@/components/dashboard-layout"

export default function RoleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { role: "admin" | "doctor" | "patient" | "nurse" | "reception" | "outpatient" }
}) {
  return <DashboardLayout role={params.role}>{children}</DashboardLayout>
}

