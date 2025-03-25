"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, DollarSign, Users, Trash2, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { addDays } from "date-fns"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/contexts/auth-context"

// Mocked data for the staff list
const initialStaffList = [
  { id: 1, name: "Dr. John Smith", role: "Doctor", department: "Cardiology", status: "Active" },
  { id: 2, name: "Nurse Sarah Johnson", role: "Nurse", department: "Emergency", status: "Active" },
  { id: 3, name: "Dr. Emily Brown", role: "Doctor", department: "Pediatrics", status: "On Leave" },
  { id: 4, name: "Admin Tom Wilson", role: "Admin", department: "Management", status: "Active" },
  { id: 5, name: "Nurse Michael Lee", role: "Nurse", department: "Surgery", status: "Active" },
]

interface RecentActivity {
  id: number
  type: string
  description: string
  timestamp: Date
  details: {
    [key: string]: string
  }
}

export default function AdminDashboard() {
  const router = useRouter()
  const { logout } = useAuth()
  const [staffList, setStaffList] = useState(initialStaffList)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("All")
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "",
    department: "",
    status: "Active",
  })

  const [totalPatients, setTotalPatients] = useState(0)
  const [totalStaff, setTotalStaff] = useState(0)
  const [revenue, setRevenue] = useState(0)
  const [activeAppointments, setActiveAppointments] = useState(0)
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<RecentActivity | null>(null)

  useEffect(() => {
    // Simulate fetching data
    const fetchData = () => {
      setTotalPatients(2853)
      setTotalStaff(145)
      setRevenue(48395)
      setActiveAppointments(124)
    }

    fetchData()
    // Simulate fetching recent activities
    const fetchRecentActivities = () => {
      const activities: RecentActivity[] = [
        {
          id: 1,
          type: "New patient admitted",
          description: "Patient #12345 admitted to Emergency",
          timestamp: new Date(Date.now() - 10 * 60000), // 10 minutes ago
          details: {
            "Patient Name": "John Doe",
            Age: "45",
            "Admitted To": "Emergency Department",
            Reason: "Chest Pain",
            "Attending Doctor": "Dr. Smith",
          },
        },
        {
          id: 2,
          type: "Staff schedule updated",
          description: "Dr. Johnson's schedule modified",
          timestamp: new Date(Date.now() - 25 * 60000), // 25 minutes ago
          details: {
            "Staff Name": "Dr. Emily Johnson",
            Department: "Cardiology",
            Change: "Shift changed from Morning to Evening",
            "Date Affected": "Next Monday",
            Reason: "Personal request",
          },
        },
        {
          id: 3,
          type: "New appointment scheduled",
          description: "Appointment #A789 scheduled for tomorrow",
          timestamp: new Date(Date.now() - 40 * 60000), // 40 minutes ago
          details: {
            "Patient Name": "Sarah Williams",
            "Appointment Type": "Follow-up",
            Department: "Orthopedics",
            Doctor: "Dr. Michael Brown",
            Time: "10:30 AM",
          },
        },
        {
          id: 4,
          type: "Equipment maintenance",
          description: "MRI machine scheduled for maintenance",
          timestamp: new Date(Date.now() - 55 * 60000), // 55 minutes ago
          details: {
            Equipment: "MRI Machine",
            Location: "Radiology Department",
            "Maintenance Type": "Routine Check",
            "Scheduled Date": "Next Tuesday",
            Duration: "4 hours",
          },
        },
        {
          id: 5,
          type: "Inventory update",
          description: "New medical supplies received",
          timestamp: new Date(Date.now() - 70 * 60000), // 70 minutes ago
          details: {
            Items: "Surgical masks, gloves, and syringes",
            Quantity: "5000 units each",
            Supplier: "MedSupply Co.",
            "Storage Location": "Main Warehouse",
            "Received By": "John Smith (Inventory Manager)",
          },
        },
      ]
      setRecentActivities(activities)
    }

    fetchData()
    fetchRecentActivities()
    // In a real application, you might want to set up an interval to refresh this data periodically
    // const interval = setInterval(fetchData, 60000) // Refresh every minute
    // return () => clearInterval(interval)
  }, [])

  const filteredStaff = staffList.filter((staff) => {
    return (
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filterRole === "All" || staff.role === filterRole)
    )
  })

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault()
    setStaffList([...staffList, { id: staffList.length + 1, ...newStaff }])
    setNewStaff({ name: "", role: "", department: "", status: "Active" })
    toast({
      title: "Staff Added",
      description: "New staff member has been successfully added.",
    })
  }

  const handleDeleteStaff = (id: number) => {
    setStaffList(staffList.filter((staff) => staff.id !== id))
    toast({
      title: "Staff Deleted",
      description: "Staff member has been successfully removed.",
      variant: "destructive",
    })
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/patients")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">{totalPatients.toLocaleString()}</h3>
              <div className="text-xs text-green-500">+12.5%</div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/staff")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Total Staff</p>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">{totalStaff.toLocaleString()}</h3>
              <div className="text-xs text-green-500">+3.2%</div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/revenue")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Revenue</p>
              <span className="text-sm font-semibold text-muted-foreground">KES</span>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">{revenue.toLocaleString()}</h3>
              <div className="text-xs text-green-500">+7.4%</div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/appointments")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Active Appointments</p>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">{activeAppointments.toLocaleString()}</h3>
              <div className="text-xs text-red-500">-2.5%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="staff">Staff Management</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Hospital Overview</CardTitle>
                <CardDescription>Hospital performance and statistics for the selected date range</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <DatePickerWithRange date={dateRange} setDate={setDateRange} />
                  <div className="h-[300px] w-full">
                    {/* This is a placeholder for the chart. In a real application, you'd use a charting library like recharts or Chart.js */}
                    <div className="flex h-full items-end gap-2">
                      {[40, 60, 30, 70, 50, 80, 45].map((value, index) => (
                        <div key={index} className="bg-primary" style={{ height: `${value}%`, width: "14%" }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest activities in the hospital</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <Dialog key={activity.id}>
                      <DialogTrigger asChild>
                        <div className="flex items-center gap-4 cursor-pointer hover:bg-muted p-2 rounded-md">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{activity.type}</p>
                            <p className="text-xs text-muted-foreground">{activity.description}</p>
                          </div>
                          <div className="text-xs text-muted-foreground">{formatTimeAgo(activity.timestamp)}</div>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{activity.type}</DialogTitle>
                          <DialogDescription>{activity.description}</DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 space-y-2">
                          {Object.entries(activity.details).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="font-medium">{key}:</span>
                              <span>{value}</span>
                            </div>
                          ))}
                          <div className="flex justify-between">
                            <span className="font-medium">Timestamp:</span>
                            <span>{activity.timestamp.toLocaleString()}</span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Management</CardTitle>
              <CardDescription>Manage hospital staff and their information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Search staff..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Roles</SelectItem>
                      <SelectItem value="Doctor">Doctor</SelectItem>
                      <SelectItem value="Nurse">Nurse</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Role</th>
                        <th className="p-2 text-left">Department</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStaff.map((staff) => (
                        <tr key={staff.id} className="border-t">
                          <td className="p-2">{staff.name}</td>
                          <td className="p-2">{staff.role}</td>
                          <td className="p-2">{staff.department}</td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                staff.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {staff.status}
                            </span>
                          </td>
                          <td className="p-2">
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteStaff(staff.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Add New Staff</CardTitle>
              <CardDescription>Enter details to add a new staff member</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddStaff} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={newStaff.role} onValueChange={(value) => setNewStaff({ ...newStaff, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Doctor">Doctor</SelectItem>
                        <SelectItem value="Nurse">Nurse</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={newStaff.department}
                      onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newStaff.status}
                      onValueChange={(value) => setNewStaff({ ...newStaff, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit">Add Staff Member</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)

  if (diffInMinutes < 1) {
    return "Just now"
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  } else {
    const days = Math.floor(diffInMinutes / 1440)
    return `${days} day${days > 1 ? "s" : ""} ago`
  }
}