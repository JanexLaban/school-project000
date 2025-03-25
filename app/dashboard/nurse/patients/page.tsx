"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function NursePatients() {
  const router = useRouter()
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", room: "101", condition: "Stable", lastChecked: "10:30 AM" },
    { id: 2, name: "Jane Smith", room: "102", condition: "Critical", lastChecked: "11:15 AM" },
    { id: 3, name: "Bob Johnson", room: "103", condition: "Improving", lastChecked: "09:45 AM" },
    { id: 4, name: "Alice Brown", room: "104", condition: "Stable", lastChecked: "10:00 AM" },
  ])

  return (
    <div className="space-y-4">
      <Button onClick={() => router.push("/dashboard/nurse")}>Back to Dashboard</Button>
      <h1 className="text-2xl font-bold">Active Patients</h1>
      {patients.map((patient) => (
        <Card key={patient.id}>
          <CardHeader>
            <CardTitle>{patient.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p>Room: {patient.room}</p>
                <p>Last Checked: {patient.lastChecked}</p>
              </div>
              <div>
                <Badge
                  variant={
                    patient.condition === "Critical"
                      ? "destructive"
                      : patient.condition === "Improving"
                        ? "default"
                        : "secondary"
                  }
                >
                  {patient.condition}
                </Badge>
              </div>
            </div>
            <Button className="mt-4" onClick={() => router.push(`/dashboard/nurse/patients/${patient.id}`)}>
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

