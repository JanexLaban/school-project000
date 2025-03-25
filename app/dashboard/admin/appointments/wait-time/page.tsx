import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function WaitTimePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Appointment Wait Times</h1>
        <Button asChild>
          <Link href="/dashboard/admin/appointments">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Appointments
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Average Wait Time Analysis</CardTitle>
          <CardDescription>Detailed breakdown of appointment wait times</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Current Average Wait Time: 18 minutes</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Average Wait Time</th>
                <th className="text-left p-2">Change from Last Week</th>
                <th className="text-left p-2">Patients Waiting</th>
              </tr>
            </thead>
            <tbody>
              {[
                { department: "Cardiology", avgWaitTime: "22 min", change: "+2 min", patientsWaiting: 5 },
                { department: "Pediatrics", avgWaitTime: "15 min", change: "-3 min", patientsWaiting: 3 },
                { department: "Orthopedics", avgWaitTime: "20 min", change: "-1 min", patientsWaiting: 4 },
                { department: "Neurology", avgWaitTime: "25 min", change: "+5 min", patientsWaiting: 6 },
                { department: "General Medicine", avgWaitTime: "12 min", change: "-4 min", patientsWaiting: 2 },
              ].map((dept, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{dept.department}</td>
                  <td className="p-2">{dept.avgWaitTime}</td>
                  <td className="p-2">{dept.change}</td>
                  <td className="p-2">{dept.patientsWaiting}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

