import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewHiresPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">New Hires Details</h1>
        <Button asChild>
          <Link href="/dashboard/admin/staff">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Staff Overview
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Hires This Month</CardTitle>
          <CardDescription>Details of staff members hired in the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Total New Hires: 12</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Position</th>
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Start Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Dr. Sarah Johnson",
                  position: "Cardiologist",
                  department: "Cardiology",
                  startDate: "2023-05-02",
                },
                {
                  name: "Nurse Mike Brown",
                  position: "Registered Nurse",
                  department: "Emergency",
                  startDate: "2023-05-05",
                },
                {
                  name: "Dr. Emily Davis",
                  position: "Pediatrician",
                  department: "Pediatrics",
                  startDate: "2023-05-10",
                },
                { name: "John Smith", position: "Lab Technician", department: "Pathology", startDate: "2023-05-15" },
                {
                  name: "Lisa Wilson",
                  position: "Administrative Assistant",
                  department: "Administration",
                  startDate: "2023-05-20",
                },
              ].map((hire, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{hire.name}</td>
                  <td className="p-2">{hire.position}</td>
                  <td className="p-2">{hire.department}</td>
                  <td className="p-2">{hire.startDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

