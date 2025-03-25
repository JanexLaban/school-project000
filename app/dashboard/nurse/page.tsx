"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ClipboardList, Clock, Users, Pill, Plus, Trash2, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/useAuth" // Make sure this hook is implemented

export default function NurseDashboard() {
  const router = useRouter()
  const { logout } = useAuth() // Using the useAuth hook

  const handleLogout = async () => {
    await logout()
    router.push("/login") // Redirect to login page after logout
  }

  const [activePatients, setActivePatients] = useState([
    {
      id: 1,
      name: "John Doe",
      room: "101",
      condition: "Stable",
      lastChecked: "10:30 AM",
      vitals: "BP: 120/80, HR: 72, Temp: 98.6°F",
    },
    {
      id: 2,
      name: "Jane Smith",
      room: "102",
      condition: "Critical",
      lastChecked: "11:15 AM",
      vitals: "BP: 90/60, HR: 110, Temp: 101.2°F",
    },
    {
      id: 3,
      name: "Bob Johnson",
      room: "103",
      condition: "Improving",
      lastChecked: "09:45 AM",
      vitals: "BP: 118/78, HR: 68, Temp: 98.2°F",
    },
    {
      id: 4,
      name: "Alice Brown",
      room: "104",
      condition: "Stable",
      lastChecked: "10:00 AM",
      vitals: "BP: 122/82, HR: 75, Temp: 98.8°F",
    },
  ])

  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: "Administer medication to Room 101",
      priority: "High",
      status: "Pending",
      details: "Give 500mg of Acetaminophen orally",
    },
    {
      id: 2,
      description: "Change dressing for patient in Room 102",
      priority: "Medium",
      status: "In Progress",
      details: "Use sterile technique, check for signs of infection",
    },
    {
      id: 3,
      description: "Assist with physical therapy in Room 103",
      priority: "Low",
      status: "Pending",
      details: "Help patient with prescribed exercises, monitor pain levels",
    },
    {
      id: 4,
      description: "Update patient charts",
      priority: "Medium",
      status: "Pending",
      details: "Record vital signs and medication administration for all patients",
    },
  ])

  const [editingPatient, setEditingPatient] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [newPatient, setNewPatient] = useState({ name: "", room: "", condition: "Stable", vitals: "" })
  const [newTask, setNewTask] = useState({ description: "", priority: "Medium", status: "Pending", details: "" })

  const handlePatientEdit = (patient) => {
    setEditingPatient({ ...patient })
  }

  const handlePatientSave = () => {
    setActivePatients(activePatients.map((p) => (p.id === editingPatient.id ? editingPatient : p)))
    setEditingPatient(null)
  }

  const handleTaskEdit = (task) => {
    setEditingTask({ ...task })
  }

  const handleTaskSave = () => {
    setTasks(tasks.map((t) => (t.id === editingTask.id ? editingTask : t)))
    setEditingTask(null)
  }

  const handleAddPatient = () => {
    const id = Math.max(...activePatients.map((p) => p.id)) + 1
    setActivePatients([...activePatients, { ...newPatient, id, lastChecked: new Date().toLocaleTimeString() }])
    setNewPatient({ name: "", room: "", condition: "Stable", vitals: "" })
  }

  const handleAddTask = () => {
    const id = Math.max(...tasks.map((t) => t.id)) + 1
    setTasks([...tasks, { ...newTask, id }])
    setNewTask({ description: "", priority: "Medium", status: "Pending", details: "" })
  }

  const handleDeletePatient = (id) => {
    setActivePatients(activePatients.filter((p) => p.id !== id))
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Nurse Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push("/dashboard/nurse/patients")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Active Patients</p>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">{activePatients.length}</h3>
              <div className="text-xs text-muted-foreground">{activePatients.length} rooms</div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push("/dashboard/nurse/tasks")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
              <ClipboardList className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">{tasks.filter((t) => t.status === "Pending").length}</h3>
              <div className="text-xs text-muted-foreground">
                {tasks.filter((t) => t.priority === "High").length} high priority
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push("/dashboard/nurse/schedule")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Upcoming Shift</p>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">3:00 PM</h3>
              <div className="text-xs text-muted-foreground">In 2 hours</div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push("/dashboard/nurse/medications")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Medications Due</p>
              <Pill className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">7</h3>
              <div className="text-xs text-muted-foreground">Next in 30 min</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="patients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patients">Active Patients</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Patients</CardTitle>
                <CardDescription>Overview of patients under your care</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Patient
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Patient</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newPatient.name}
                        onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="room">Room</Label>
                      <Input
                        id="room"
                        value={newPatient.room}
                        onChange={(e) => setNewPatient({ ...newPatient, room: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select
                        value={newPatient.condition}
                        onValueChange={(value) => setNewPatient({ ...newPatient, condition: value })}
                      >
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Stable">Stable</SelectItem>
                          <SelectItem value="Improving">Improving</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vitals">Vitals</Label>
                      <Input
                        id="vitals"
                        value={newPatient.vitals}
                        onChange={(e) => setNewPatient({ ...newPatient, vitals: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleAddPatient}>Add Patient</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activePatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">Room {patient.room}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
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
                      <div className="text-xs text-muted-foreground">Last checked: {patient.lastChecked}</div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              {patient.name} - Room {patient.room}
                            </DialogTitle>
                          </DialogHeader>
                          {editingPatient && editingPatient.id === patient.id ? (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="condition">Condition</Label>
                                <Select
                                  value={editingPatient.condition}
                                  onValueChange={(value) => setEditingPatient({ ...editingPatient, condition: value })}
                                >
                                  <SelectTrigger id="condition">
                                    <SelectValue placeholder="Select condition" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Stable">Stable</SelectItem>
                                    <SelectItem value="Improving">Improving</SelectItem>
                                    <SelectItem value="Critical">Critical</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="vitals">Vitals</Label>
                                <Input
                                  id="vitals"
                                  value={editingPatient.vitals}
                                  onChange={(e) => setEditingPatient({ ...editingPatient, vitals: e.target.value })}
                                />
                              </div>
                              <Button onClick={handlePatientSave}>Save Changes</Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <p>
                                <strong>Condition:</strong> {patient.condition}
                              </p>
                              <p>
                                <strong>Last Checked:</strong> {patient.lastChecked}
                              </p>
                              <p>
                                <strong>Vitals:</strong> {patient.vitals}
                              </p>
                              <div className="flex space-x-2">
                                <Button onClick={() => handlePatientEdit(patient)}>Edit</Button>
                                <Button variant="destructive" onClick={() => handleDeletePatient(patient.id)}>
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Your current and upcoming tasks</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={newTask.priority}
                        onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                      >
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="details">Details</Label>
                      <Input
                        id="details"
                        value={newTask.details}
                        onChange={(e) => setNewTask({ ...newTask, details: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleAddTask}>Add Task</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium">{task.description}</p>
                      <p className="text-xs text-muted-foreground">Priority: {task.priority}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={task.status === "Pending" ? "outline" : "secondary"}>{task.status}</Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Task
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{task.description}</DialogTitle>
                          </DialogHeader>
                          {editingTask && editingTask.id === task.id ? (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="priority">Priority</Label>
                                <Select
                                  value={editingTask.priority}
                                  onValueChange={(value) => setEditingTask({ ...editingTask, priority: value })}
                                >
                                  <SelectTrigger id="priority">
                                    <SelectValue placeholder="Select priority" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                  value={editingTask.status}
                                  onValueChange={(value) => setEditingTask({ ...editingTask, status: value })}
                                >
                                  <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="details">Details</Label>
                                <Input
                                  id="details"
                                  value={editingTask.details}
                                  onChange={(e) => setEditingTask({ ...editingTask, details: e.target.value })}
                                />
                              </div>
                              <Button onClick={handleTaskSave}>Save Changes</Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <p>
                                <strong>Priority:</strong> {task.priority}
                              </p>
                              <p>
                                <strong>Status:</strong> {task.status}
                              </p>
                              <p>
                                <strong>Details:</strong> {task.details}
                              </p>
                              <div className="flex space-x-2">
                                <Button onClick={() => handleTaskEdit(task)}>Edit</Button>
                                <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

