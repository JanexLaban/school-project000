"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NurseSchedule() {
  const router = useRouter()
  const schedule = [
    { day: "Monday", shift: "7:00 AM - 3:00 PM" },
    { day: "Tuesday", shift: "3:00 PM - 11:00 PM" },
    { day: "Wednesday", shift: "7:00 AM - 3:00 PM" },
    { day: "Thursday", shift: "Off" },
    { day: "Friday", shift: "11:00 PM - 7:00 AM" },
    { day: "Saturday", shift: "3:00 PM - 11:00 PM" },
    { day: "Sunday", shift: "Off" },
  ]

  return (
    <div className="space-y-4">
      <Button onClick={() => router.push("/dashboard/nurse")}>Back to Dashboard</Button>
      <h1 className="text-2xl font-bold">Weekly Schedule</h1>
      {schedule.map((day, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{day.day}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{day.shift}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

