import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TodayAppointmentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Today's Appointments</h1>
        <Button asChild>
          <Link href="/dashboard/admin/appointments">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Appointments
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointments Scheduled for Today</CardTitle>
          <CardDescription>Detailed view of all appointments scheduled for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Total Scheduled: 28</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Time</th>
                <th className="text-left p-2">Patient</th>
                <th className="text-left p-2">Doctor</th>
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  time: "09:00 AM",
                  patient: "John Doe",
                  doctor: "Dr. Smith",
                  department: "Cardiology",
                  type: "Follow-up",
                },
                {
                  time: "10:30 AM",
                  patient: "Jane Smith",
                  doctor: "Dr. Johnson",
                  department: "Pediatrics",
                  type: "New Patient",
                },
                {
                  time: "11:15 AM",
                  patient: "Bob Brown",
                  doctor: "Dr. Lee",
                  department: "Orthopedics",
                  type: "Consultation",
                },
                {
                  time: "02:00 PM",
                  patient: "Alice Johnson",
                  doctor: "Dr. Patel",
                  department: "Neurology",
                  type: "Follow-up",
                },
                {
                  time: "03:30 PM",
                  patient: "Charlie Davis",
                  doctor: "Dr. Garcia",
                  department: "General Medicine",
                  type: "Annual Check-up",
                },
              ].map((appointment, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{appointment.time}</td>
                  <td className="p-2">{appointment.patient}</td>
                  <td className="p-2">{appointment.doctor}</td>
                  <td className="p-2">{appointment.department}</td>
                  <td className="p-2">{appointment.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

