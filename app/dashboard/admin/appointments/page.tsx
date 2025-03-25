"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Activity, Calendar, Clock, UserCheck } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export default function AppointmentsPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Appointments Overview</h1>
        <Button asChild>
          <Link href="/dashboard/admin">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/appointments/active")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Active Appointments</p>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">124</h3>
              <div className="text-xs text-red-500">-2.5% from last week</div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/appointments/today")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Scheduled Today</p>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">28</h3>
              <div className="text-xs text-green-500">+3 from yesterday</div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/appointments/wait-time")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Average Wait Time</p>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">18 min</h3>
              <div className="text-xs text-green-500">-2 min from last week</div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/appointments/completion-rate")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
              <UserCheck className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">95.8%</h3>
              <div className="text-xs text-green-500">+0.6% from last week</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Distribution</CardTitle>
          <CardDescription>Breakdown by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { department: "General Medicine", percentage: 30 },
              { department: "Pediatrics", percentage: 20 },
              { department: "Orthopedics", percentage: 15 },
              { department: "Cardiology", percentage: 12 },
              { department: "Neurology", percentage: 8 },
              { department: "Other", percentage: 15 },
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
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Next 5 scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Patient</th>
                  <th className="text-left p-2">Doctor</th>
                  <th className="text-left p-2">Department</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    patient: "John Doe",
                    doctor: "Dr. Smith",
                    department: "Cardiology",
                    date: "2023-05-16",
                    time: "09:30 AM",
                  },
                  {
                    patient: "Jane Smith",
                    doctor: "Dr. Johnson",
                    department: "Pediatrics",
                    date: "2023-05-16",
                    time: "10:15 AM",
                  },
                  {
                    patient: "Bob Brown",
                    doctor: "Dr. Lee",
                    department: "Orthopedics",
                    date: "2023-05-16",
                    time: "11:00 AM",
                  },
                  {
                    patient: "Alice Johnson",
                    doctor: "Dr. Patel",
                    department: "Neurology",
                    date: "2023-05-16",
                    time: "01:30 PM",
                  },
                  {
                    patient: "Charlie Davis",
                    doctor: "Dr. Garcia",
                    department: "General Medicine",
                    date: "2023-05-16",
                    time: "02:45 PM",
                  },
                ].map((appointment, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{appointment.patient}</td>
                    <td className="p-2">{appointment.doctor}</td>
                    <td className="p-2">{appointment.department}</td>
                    <td className="p-2">{appointment.date}</td>
                    <td className="p-2">{appointment.time}</td>
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

