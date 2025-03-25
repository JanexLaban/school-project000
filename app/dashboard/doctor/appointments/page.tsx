import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DoctorAppointmentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Doctor Appointments</h1>
        <Button asChild>
          <Link href="/dashboard/doctor">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Appointments</CardTitle>
          <CardDescription>Your scheduled appointments for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "09:00 AM", patient: "Sarah Johnson", type: "Follow-up", status: "Completed" },
              { time: "10:30 AM", patient: "John Smith", type: "Consultation", status: "Upcoming" },
              { time: "11:45 AM", patient: "Emily Davis", type: "Check-up", status: "Upcoming" },
              { time: "02:15 PM", patient: "Michael Brown", type: "Follow-up", status: "Upcoming" },
              { time: "03:30 PM", patient: "Jessica Wilson", type: "Consultation", status: "Upcoming" },
            ].map((appointment, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">
                    {appointment.time} - {appointment.patient}
                  </p>
                  <p className="text-sm text-muted-foreground">{appointment.type}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      appointment.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

