import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function StaffAttendancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Staff Attendance Details</h1>
        <Button asChild>
          <Link href="/dashboard/admin/staff">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Staff Overview
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Attendance Rate</CardTitle>
          <CardDescription>Breakdown of attendance rates by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Overall Attendance Rate: 98.5%</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Attendance Rate</th>
                <th className="text-left p-2">Change from Last Month</th>
                <th className="text-left p-2">Total Staff</th>
              </tr>
            </thead>
            <tbody>
              {[
                { department: "Cardiology", rate: "99.2%", change: "+0.3%", staff: 28 },
                { department: "Pediatrics", rate: "98.7%", change: "+0.5%", staff: 22 },
                { department: "Neurology", rate: "98.1%", change: "+0.2%", staff: 18 },
                { department: "Oncology", rate: "98.9%", change: "+0.4%", staff: 25 },
                { department: "Emergency", rate: "97.8%", change: "+0.7%", staff: 38 },
                { department: "Administration", rate: "99.5%", change: "+0.1%", staff: 14 },
              ].map((dept, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{dept.department}</td>
                  <td className="p-2">{dept.rate}</td>
                  <td className="p-2">{dept.change}</td>
                  <td className="p-2">{dept.staff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

