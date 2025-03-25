"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function NurseMedications() {
  const router = useRouter()
  const [medications, setMedications] = useState([
    { id: 1, patient: "John Doe", medication: "Aspirin", dosage: "500mg", time: "2:00 PM", status: "Pending" },
    { id: 2, patient: "Jane Smith", medication: "Insulin", dosage: "10 units", time: "3:30 PM", status: "Pending" },
    { id: 3, patient: "Bob Johnson", medication: "Amoxicillin", dosage: "250mg", time: "4:00 PM", status: "Pending" },
    { id: 4, patient: "Alice Brown", medication: "Lisinopril", dosage: "10mg", time: "5:00 PM", status: "Pending" },
  ])

  const handleAdminister = (id) => {
    setMedications(medications.map((med) => (med.id === id ? { ...med, status: "Administered" } : med)))
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => router.push("/dashboard/nurse")}>Back to Dashboard</Button>
      <h1 className="text-2xl font-bold">Medications Due</h1>
      {medications.map((med) => (
        <Card key={med.id}>
          <CardHeader>
            <CardTitle>{med.patient}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p>
                  {med.medication} - {med.dosage}
                </p>
                <p>Due at: {med.time}</p>
              </div>
              <div>
                <Badge variant={med.status === "Pending" ? "outline" : "secondary"}>{med.status}</Badge>
                {med.status === "Pending" && (
                  <Button className="ml-2" onClick={() => handleAdminister(med.id)}>
                    Administer
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

