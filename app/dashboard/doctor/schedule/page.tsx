import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DoctorSchedulePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Doctor's Schedule</h1>
        <Button asChild>
          <Link href="/dashboard/doctor">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Schedule</CardTitle>
          <CardDescription>Upcoming appointments and shifts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                date: "Today",
                appointments: [
                  { time: "10:30 AM", patient: "John Smith", type: "Consultation" },
                  { time: "02:00 PM", patient: "Emma Davis", type: "Follow-up" },
                ],
              },
              {
                date: "Tomorrow",
                appointments: [
                  { time: "09:00 AM", patient: "Michael Johnson", type: "Check-up" },
                  { time: "11:30 AM", patient: "Sophia Brown", type: "Consultation" },
                  { time: "03:00 PM", patient: "Oliver Wilson", type: "Follow-up" },
                ],
              },
            ].map((day, i) => (
              <div key={i}>
                <h3 className="font-medium mb-2">{day.date}</h3>
                {day.appointments.map((appointment, j) => (
                  <div key={j} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0 mb-2">
                    <div>
                      <p className="font-medium">
                        {appointment.time} - {appointment.patient}
                      </p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

