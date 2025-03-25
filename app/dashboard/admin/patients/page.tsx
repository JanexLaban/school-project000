"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, UserPlus, UserMinus, Activity } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export default function PatientsPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patients Overview</h1>
        <Button asChild>
          <Link href="/dashboard/admin">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/patients/total")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,853</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/patients/new")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Patients (This Month)</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">+22% from last month</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/patients/discharged")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Discharged (This Month)</CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98</div>
            <p className="text-xs text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/patients/stay-duration")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Stay Duration</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 days</div>
            <p className="text-xs text-muted-foreground">-0.3 days from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Demographics</CardTitle>
          <CardDescription>Age distribution of patients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { age: "0-18", percentage: 15 },
              { age: "19-35", percentage: 30 },
              { age: "36-50", percentage: 25 },
              { age: "51-65", percentage: 20 },
              { age: "65+", percentage: 10 },
            ].map((group) => (
              <div key={group.age} className="flex items-center">
                <div className="w-16 text-sm">{group.age}</div>
                <Progress value={group.percentage} className="flex-1 mr-4" />
                <div className="w-12 text-sm text-right">{group.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Patient Admissions</CardTitle>
          <CardDescription>Last 5 patients admitted</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Patient ID</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Age</th>
                  <th className="text-left p-2">Admission Date</th>
                  <th className="text-left p-2">Reason</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "P12345", name: "John Doe", age: 45, date: "2023-05-15", reason: "Chest Pain" },
                  { id: "P12346", name: "Jane Smith", age: 32, date: "2023-05-14", reason: "Broken Arm" },
                  { id: "P12347", name: "Bob Johnson", age: 58, date: "2023-05-14", reason: "Diabetes Check" },
                  { id: "P12348", name: "Alice Brown", age: 27, date: "2023-05-13", reason: "Pregnancy Check-up" },
                  { id: "P12349", name: "Charlie Davis", age: 62, date: "2023-05-13", reason: "High Blood Pressure" },
                ].map((patient) => (
                  <tr key={patient.id} className="border-b">
                    <td className="p-2">{patient.id}</td>
                    <td className="p-2">{patient.name}</td>
                    <td className="p-2">{patient.age}</td>
                    <td className="p-2">{patient.date}</td>
                    <td className="p-2">{patient.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

