import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TotalStaffPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Total Staff Details</h1>
        <Button asChild>
          <Link href="/dashboard/admin/staff">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Staff Overview
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Distribution</CardTitle>
          <CardDescription>Breakdown of staff by department and role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Total Staff: 145</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Doctors</th>
                <th className="text-left p-2">Nurses</th>
                <th className="text-left p-2">Other Staff</th>
                <th className="text-left p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {[
                { department: "Cardiology", doctors: 8, nurses: 15, other: 5, total: 28 },
                { department: "Pediatrics", doctors: 6, nurses: 12, other: 4, total: 22 },
                { department: "Neurology", doctors: 5, nurses: 10, other: 3, total: 18 },
                { department: "Oncology", doctors: 7, nurses: 14, other: 4, total: 25 },
                { department: "Emergency", doctors: 10, nurses: 20, other: 8, total: 38 },
                { department: "Administration", doctors: 0, nurses: 0, other: 14, total: 14 },
              ].map((dept, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{dept.department}</td>
                  <td className="p-2">{dept.doctors}</td>
                  <td className="p-2">{dept.nurses}</td>
                  <td className="p-2">{dept.other}</td>
                  <td className="p-2">{dept.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

