import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function StaffOvertimePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Staff Overtime Details</h1>
        <Button asChild>
          <Link href="/dashboard/admin/staff">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Staff Overview
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Average Overtime Hours</CardTitle>
          <CardDescription>Breakdown of overtime hours by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Overall Average Overtime: 3.2 hours</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Average Overtime</th>
                <th className="text-left p-2">Change from Last Month</th>
                <th className="text-left p-2">Total Staff</th>
              </tr>
            </thead>
            <tbody>
              {[
                { department: "Cardiology", overtime: "2.8 hours", change: "-0.3 hours", staff: 28 },
                { department: "Pediatrics", overtime: "3.1 hours", change: "-0.2 hours", staff: 22 },
                { department: "Neurology", overtime: "2.9 hours", change: "-0.4 hours", staff: 18 },
                { department: "Oncology", overtime: "3.5 hours", change: "-0.1 hours", staff: 25 },
                { department: "Emergency", overtime: "4.2 hours", change: "-0.6 hours", staff: 38 },
                { department: "Administration", overtime: "1.5 hours", change: "+0.2 hours", staff: 14 },
              ].map((dept, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{dept.department}</td>
                  <td className="p-2">{dept.overtime}</td>
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

