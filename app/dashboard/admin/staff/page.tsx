"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, UserPlus, UserCheck, Clock } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export default function StaffPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Staff Overview</h1>
        <Button asChild>
          <Link href="/dashboard/admin">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/staff/total")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">+3.2% from last month</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/staff/new-hires")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Hires (This Month)</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/staff/attendance")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Attendance Rate</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/staff/overtime")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Overtime</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 hours</div>
            <p className="text-xs text-muted-foreground">-0.5 hours from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Distribution</CardTitle>
          <CardDescription>Breakdown by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { department: "Nursing", percentage: 40 },
              { department: "Physicians", percentage: 25 },
              { department: "Administration", percentage: 15 },
              { department: "Laboratory", percentage: 10 },
              { department: "Radiology", percentage: 5 },
              { department: "Other", percentage: 5 },
            ].map((dept) => (
              <div key={dept.department} className="flex items-center">
                <div className="w-32 text-sm">{dept.department}</div>
                <Progress value={dept.percentage} className="flex-1 mr-4" />
                <div className="w-12 text-sm text-right">{dept.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Staff Updates</CardTitle>
          <CardDescription>Latest changes in staff records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Staff ID</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Department</th>
                  <th className="text-left p-2">Update Type</th>
                  <th className="text-left p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "S1001",
                    name: "Dr. Sarah Johnson",
                    department: "Cardiology",
                    type: "New Hire",
                    date: "2023-05-15",
                  },
                  {
                    id: "S0458",
                    name: "Nurse Mike Brown",
                    department: "Emergency",
                    type: "Transfer",
                    date: "2023-05-14",
                  },
                  { id: "S0789", name: "Admin Lisa Davis", department: "HR", type: "Promotion", date: "2023-05-13" },
                  {
                    id: "S0234",
                    name: "Dr. Robert Lee",
                    department: "Neurology",
                    type: "Certification Update",
                    date: "2023-05-12",
                  },
                  {
                    id: "S0567",
                    name: "Tech John Smith",
                    department: "IT",
                    type: "Leave Approval",
                    date: "2023-05-11",
                  },
                ].map((staff) => (
                  <tr key={staff.id} className="border-b">
                    <td className="p-2">{staff.id}</td>
                    <td className="p-2">{staff.name}</td>
                    <td className="p-2">{staff.department}</td>
                    <td className="p-2">{staff.type}</td>
                    <td className="p-2">{staff.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

