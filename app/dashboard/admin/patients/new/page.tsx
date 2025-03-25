import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewPatientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">New Patients Details</h1>
        <Button asChild>
          <Link href="/dashboard/admin/patients">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patients Overview
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Patients This Month</CardTitle>
          <CardDescription>Details of patients admitted in the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Total New Patients: 145</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Patient ID</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Age</th>
                <th className="text-left p-2">Admission Date</th>
                <th className="text-left p-2">Department</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "P12350", name: "Emma Wilson", age: 28, date: "2023-05-20", department: "Obstetrics" },
                { id: "P12351", name: "Michael Brown", age: 52, date: "2023-05-19", department: "Cardiology" },
                { id: "P12352", name: "Sophia Lee", age: 7, date: "2023-05-18", department: "Pediatrics" },
                { id: "P12353", name: "William Taylor", age: 65, date: "2023-05-17", department: "Neurology" },
                { id: "P12354", name: "Olivia Martinez", age: 41, date: "2023-05-16", department: "Oncology" },
              ].map((patient, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{patient.id}</td>
                  <td className="p-2">{patient.name}</td>
                  <td className="p-2">{patient.age}</td>
                  <td className="p-2">{patient.date}</td>
                  <td className="p-2">{patient.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

