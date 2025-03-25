"use client"

import { type ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Calendar, ChevronDown, ClipboardList, FileText, Home, LogOut, Settings, User, Users } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/contexts/auth-context"

interface DashboardLayoutProps {
  children: ReactNode
  role: "admin" | "doctor" | "patient" | "nurse" | "reception" | "outpatient"
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [notifications] = useState(5)

  const menuItems = getMenuItemsByRole(role)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-lg font-bold text-primary-foreground">HMS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">Hospital Management</span>
                <span className="text-xs text-muted-foreground capitalize">{role} Portal</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center justify-between px-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 w-full justify-start px-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                      <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user?.name || "User Name"}</span>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger />
            <div className="flex flex-1 items-center justify-between">
              <div></div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  {notifications > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                      {notifications}
                    </span>
                  )}
                </Button>
                <ModeToggle />
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function getMenuItemsByRole(role: string) {
  const commonItems = [
    { label: "Dashboard", href: `/dashboard/${role}`, icon: Home },
    { label: "Profile", href: `/dashboard/${role}/profile`, icon: User },
    { label: "Settings", href: `/dashboard/${role}/settings`, icon: Settings },
  ]

  const roleSpecificItems = {
    admin: [
      { label: "Staff Management", href: `/dashboard/admin/staff`, icon: Users },
      { label: "Reports", href: `/dashboard/admin/reports`, icon: FileText },
    ],
    doctor: [
      { label: "Appointments", href: `/dashboard/doctor/appointments`, icon: Calendar },
      { label: "Patients", href: `/dashboard/doctor/patients`, icon: Users },
      { label: "Medical Records", href: `/dashboard/doctor/records`, icon: ClipboardList },
    ],
    patient: [
      { label: "Appointments", href: `/dashboard/patient/appointments`, icon: Calendar },
      { label: "Medical Records", href: `/dashboard/patient/records`, icon: ClipboardList },
      { label: "Prescriptions", href: `/dashboard/patient/prescriptions`, icon: FileText },
    ],
    nurse: [
      { label: "Patients", href: `/dashboard/nurse/patients`, icon: Users },
      { label: "Tasks", href: `/dashboard/nurse/tasks`, icon: ClipboardList },
    ],
    reception: [
      { label: "Appointments", href: `/dashboard/reception/appointments`, icon: Calendar },
      { label: "Patients", href: `/dashboard/reception/patients`, icon: Users },
    ],
    outpatient: [
      { label: "Appointments", href: `/dashboard/outpatient/appointments`, icon: Calendar },
      { label: "Patients", href: `/dashboard/outpatient/patients`, icon: Users },
    ],
  }

  return [...commonItems, ...(roleSpecificItems[role as keyof typeof roleSpecificItems] || [])]
}

