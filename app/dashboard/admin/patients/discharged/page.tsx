import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DischargedPatientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Discharged Patients Details</h1>
        <Button asChild>
          <Link href="/dashboard/admin/patients">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patients Overview
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Discharged Patients This Month</CardTitle>
          <CardDescription>Details of patients discharged in the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Total Discharged Patients: 98</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Patient ID</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Age</th>
                <th className="text-left p-2">Discharge Date</th>
                <th className="text-left p-2">Length of Stay</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "P12340", name: "John Smith", age: 45, date: "2023-05-20", stay: "5 days" },
                { id: "P12341", name: "Sarah Johnson", age: 32, date: "2023-05-19", stay: "3 days" },
                { id: "P12342", name: "Robert Brown", age: 58, date: "2023-05-18", stay: "7 days" },
                { id: "P12343", name: "Emily Davis", age: 27, date: "2023-05-17", stay: "2 days" },
                { id: "P12344", name: "David Wilson", age: 62, date: "2023-05-16", stay: "6 days" },
              ].map((patient, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{patient.id}</td>
                  <td className="p-2">{patient.name}</td>
                  <td className="p-2">{patient.age}</td>
                  <td className="p-2">{patient.date}</td>
                  <td className="p-2">{patient.stay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

