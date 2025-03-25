"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function NurseTasks() {
  const router = useRouter()
  const [tasks, setTasks] = useState([
    { id: 1, description: "Administer medication to Room 101", priority: "High", status: "Pending" },
    { id: 2, description: "Change dressing for patient in Room 102", priority: "Medium", status: "In Progress" },
    { id: 3, description: "Assist with physical therapy in Room 103", priority: "Low", status: "Pending" },
    { id: 4, description: "Update patient charts", priority: "Medium", status: "Pending" },
  ])

  return (
    <div className="space-y-4">
      <Button onClick={() => router.push("/dashboard/nurse")}>Back to Dashboard</Button>
      <h1 className="text-2xl font-bold">Tasks</h1>
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader>
            <CardTitle>{task.description}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p>Priority: {task.priority}</p>
                <Badge variant={task.status === "Pending" ? "outline" : "secondary"}>{task.status}</Badge>
              </div>
              <Button onClick={() => router.push(`/dashboard/nurse/tasks/${task.id}`)}>View Task</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

