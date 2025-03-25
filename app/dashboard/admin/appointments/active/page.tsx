import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ActiveAppointmentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Active Appointments</h1>
        <Button asChild>
          <Link href="/dashboard/admin/appointments">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Appointments
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Appointments Overview</CardTitle>
          <CardDescription>Detailed view of currently active appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Total Active: 124</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Patient</th>
                <th className="text-left p-2">Doctor</th>
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Start Time</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  patient: "John Doe",
                  doctor: "Dr. Smith",
                  department: "Cardiology",
                  startTime: "09:30 AM",
                  status: "In Progress",
                },
                {
                  patient: "Jane Smith",
                  doctor: "Dr. Johnson",
                  department: "Pediatrics",
                  startTime: "09:45 AM",
                  status: "Waiting",
                },
                {
                  patient: "Bob Brown",
                  doctor: "Dr. Lee",
                  department: "Orthopedics",
                  startTime: "10:00 AM",
                  status: "Check-in",
                },
                {
                  patient: "Alice Johnson",
                  doctor: "Dr. Patel",
                  department: "Neurology",
                  startTime: "10:15 AM",
                  status: "Waiting",
                },
                {
                  patient: "Charlie Davis",
                  doctor: "Dr. Garcia",
                  department: "General Medicine",
                  startTime: "10:30 AM",
                  status: "Scheduled",
                },
              ].map((appointment, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{appointment.patient}</td>
                  <td className="p-2">{appointment.doctor}</td>
                  <td className="p-2">{appointment.department}</td>
                  <td className="p-2">{appointment.startTime}</td>
                  <td className="p-2">{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

