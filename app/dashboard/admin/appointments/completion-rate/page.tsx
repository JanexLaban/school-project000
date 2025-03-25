import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CompletionRatePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Appointment Completion Rate</h1>
        <Button asChild>
          <Link href="/dashboard/admin/appointments">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Appointments
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Completion Rate Analysis</CardTitle>
          <CardDescription>Detailed view of appointment completion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Overall Completion Rate: 95.8%</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Completion Rate</th>
                <th className="text-left p-2">Change from Last Week</th>
                <th className="text-left p-2">Total Appointments</th>
              </tr>
            </thead>
            <tbody>
              {[
                { department: "Cardiology", completionRate: "97.2%", change: "+0.5%", totalAppointments: 180 },
                { department: "Pediatrics", completionRate: "96.5%", change: "+0.8%", totalAppointments: 200 },
                { department: "Orthopedics", completionRate: "94.8%", change: "-0.2%", totalAppointments: 155 },
                { department: "Neurology", completionRate: "95.5%", change: "+1.2%", totalAppointments: 110 },
                { department: "General Medicine", completionRate: "94.9%", change: "+0.3%", totalAppointments: 350 },
              ].map((dept, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{dept.department}</td>
                  <td className="p-2">{dept.completionRate}</td>
                  <td className="p-2">{dept.change}</td>
                  <td className="p-2">{dept.totalAppointments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

