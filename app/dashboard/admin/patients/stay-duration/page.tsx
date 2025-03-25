import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function StayDurationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Average Stay Duration Details</h1>
        <Button asChild>
          <Link href="/dashboard/admin/patients">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patients Overview
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Average Stay Duration by Department</CardTitle>
          <CardDescription>Breakdown of average patient stay duration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Overall Average Stay Duration: 4.2 days</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Average Stay</th>
                <th className="text-left p-2">Change from Last Month</th>
                <th className="text-left p-2">Patients Treated</th>
              </tr>
            </thead>
            <tbody>
              {[
                { department: "Cardiology", avgStay: "5.3 days", change: "-0.2 days", patients: 120 },
                { department: "Pediatrics", avgStay: "3.1 days", change: "-0.5 days", patients: 150 },
                { department: "Neurology", avgStay: "6.2 days", change: "+0.1 days", patients: 80 },
                { department: "Oncology", avgStay: "7.5 days", change: "-0.3 days", patients: 90 },
                { department: "Orthopedics", avgStay: "4.8 days", change: "-0.4 days", patients: 110 },
                { department: "General Medicine", avgStay: "3.5 days", change: "-0.2 days", patients: 200 },
              ].map((dept, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{dept.department}</td>
                  <td className="p-2">{dept.avgStay}</td>
                  <td className="p-2">{dept.change}</td>
                  <td className="p-2">{dept.patients}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

