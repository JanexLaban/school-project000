import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TotalPatientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Total Patients Details</h1>
        <Button asChild>
          <Link href="/dashboard/admin/patients">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patients Overview
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Distribution</CardTitle>
          <CardDescription>Breakdown of patients by department and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Total Patients: 2,853</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Inpatients</th>
                <th className="text-left p-2">Outpatients</th>
                <th className="text-left p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {[
                { department: "Cardiology", inpatients: 120, outpatients: 450, total: 570 },
                { department: "Pediatrics", inpatients: 80, outpatients: 380, total: 460 },
                { department: "Neurology", inpatients: 95, outpatients: 320, total: 415 },
                { department: "Oncology", inpatients: 150, outpatients: 280, total: 430 },
                { department: "Orthopedics", inpatients: 110, outpatients: 410, total: 520 },
                { department: "General Medicine", inpatients: 85, outpatients: 373, total: 458 },
              ].map((dept, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{dept.department}</td>
                  <td className="p-2">{dept.inpatients}</td>
                  <td className="p-2">{dept.outpatients}</td>
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

