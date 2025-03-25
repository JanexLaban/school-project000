"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Activity, Users, FileText, Trash2, Plus, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toast } from "@/components/ui/toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/contexts/auth-context"

// Simulated API calls
const fetchAppointments = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            patient: "Emma Wilson",
            time: "09:00 AM",
            type: "Follow-up",
            doctor: "Dr. Smith",
            status: "Checked In",
          },
          {
            id: 2,
            patient: "Liam Johnson",
            time: "10:30 AM",
            type: "Consultation",
            doctor: "Dr. Patel",
            status: "Scheduled",
          },
          {
            id: 3,
            patient: "Olivia Brown",
            time: "11:45 AM",
            type: "Test Results",
            doctor: "Dr. Lee",
            status: "Waiting",
          },
          {
            id: 4,
            patient: "Noah Davis",
            time: "02:15 PM",
            type: "New Patient",
            doctor: "Dr. Garcia",
            status: "Scheduled",
          },
        ]),
      500,
    ),
  )

const fetchProcedures = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: 1, name: "X-Ray", patient: "Emma Wilson", time: "09:30 AM", status: "Completed" },
          { id: 2, name: "Blood Test", patient: "Liam Johnson", time: "10:45 AM", status: "In Progress" },
          { id: 3, name: "MRI", patient: "Olivia Brown", time: "01:00 PM", status: "Scheduled" },
          { id: 4, name: "Ultrasound", patient: "Noah Davis", time: "03:00 PM", status: "Scheduled" },
        ]),
      500,
    ),
  )

export default function OutpatientDashboard() {
  const [appointments, setAppointments] = useState([])
  const [procedures, setProcedures] = useState([])
  const [loading, setLoading] = useState(true)
  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    time: "",
    type: "",
    doctor: "",
  })
  const [newProcedure, setNewProcedure] = useState({
    name: "",
    patient: "",
    time: "",
  })

  const router = useRouter()
  const { logout } = useAuth()

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const [appointmentsData, proceduresData] = await Promise.all([fetchAppointments(), fetchProcedures()])
      setAppointments(appointmentsData)
      setProcedures(proceduresData)
      setLoading(false)
    }
    loadData()
  }, [])

  const handleAppointmentStatusChange = (id, newStatus) => {
    setAppointments(appointments.map((app) => (app.id === id ? { ...app, status: newStatus } : app)))
    toast({
      title: "Appointment Updated",
      description: `Appointment status changed to ${newStatus}`,
    })
  }

  const handleProcedureStatusChange = (id, newStatus) => {
    setProcedures(procedures.map((proc) => (proc.id === id ? { ...proc, status: newStatus } : proc)))
    toast({
      title: "Procedure Updated",
      description: `Procedure status changed to ${newStatus}`,
    })
  }

  const handleNewAppointmentSubmit = (e) => {
    e.preventDefault()
    const id = appointments.length + 1
    const newAppointmentWithId = { ...newAppointment, id, status: "Scheduled" }
    setAppointments([...appointments, newAppointmentWithId])
    setNewAppointment({ patient: "", time: "", type: "", doctor: "" })
    toast({
      title: "Appointment Scheduled",
      description: `New appointment scheduled for ${newAppointment.patient}`,
    })
  }

  const handleNewProcedureSubmit = (e) => {
    e.preventDefault()
    const id = procedures.length + 1
    const newProcedureWithId = { ...newProcedure, id, status: "Scheduled" }
    setProcedures([...procedures, newProcedureWithId])
    setNewProcedure({ name: "", patient: "", time: "" })
    toast({
      title: "Procedure Scheduled",
      description: `New procedure scheduled for ${newProcedure.patient}`,
    })
  }

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((app) => app.id !== id))
    toast({
      title: "Appointment Deleted",
      description: "The appointment has been removed from the schedule.",
      variant: "destructive",
    })
  }

  const handleDeleteProcedure = (id) => {
    setProcedures(procedures.filter((proc) => proc.id !== id))
    toast({
      title: "Procedure Deleted",
      description: "The procedure has been removed from the schedule.",
      variant: "destructive",
    })
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const getTodayAppointments = () => appointments.filter((app) => app.time.includes("AM") || app.time.includes("PM"))
  const getTodayProcedures = () => procedures.filter((proc) => proc.time.includes("AM") || proc.time.includes("PM"))
  const getWaitingPatients = () => appointments.filter((app) => app.status === "Waiting")
  const getAvailableRooms = () => 12 - getTodayAppointments().length // Assuming 12 total rooms

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Outpatient Center Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Today's Appointments</p>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">{getTodayAppointments().length}</h3>
              <div className="text-xs text-muted-foreground">{appointments.length} total</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Procedures Today</p>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">{getTodayProcedures().length}</h3>
              <div className="text-xs text-muted-foreground">
                {procedures.filter((p) => p.status === "Completed").length} completed
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Waiting Patients</p>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">{getWaitingPatients().length}</h3>
              <div className="text-xs text-muted-foreground">Avg wait: 15 min</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Available Rooms</p>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">{getAvailableRooms()}</h3>
              <div className="text-xs text-muted-foreground">Out of 12</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="procedures">Procedures</TabsTrigger>
        </TabsList>
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Appointments</CardTitle>
                <CardDescription>Manage today's outpatient appointments</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Appointment</DialogTitle>
                    <DialogDescription>Enter the details for the new appointment.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleNewAppointmentSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient">Patient Name</Label>
                      <Input
                        id="patient"
                        value={newAppointment.patient}
                        onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Appointment Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Appointment Type</Label>
                      <Input
                        id="type"
                        value={newAppointment.type}
                        onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor">Doctor</Label>
                      <Input
                        id="doctor"
                        value={newAppointment.doctor}
                        onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                        required
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Schedule Appointment</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div>Loading appointments...</div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {appointment.patient
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{appointment.patient}</p>
                          <p className="text-xs text-muted-foreground">
                            {appointment.time} - {appointment.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Select
                          value={appointment.status}
                          onValueChange={(value) => handleAppointmentStatusChange(appointment.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                            <SelectItem value="Checked In">Checked In</SelectItem>
                            <SelectItem value="Waiting">Waiting</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="text-xs text-muted-foreground">{appointment.doctor}</div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteAppointment(appointment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="procedures" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Procedures</CardTitle>
                <CardDescription>Today's scheduled procedures and tests</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Procedure
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Procedure</DialogTitle>
                    <DialogDescription>Enter the details for the new procedure.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleNewProcedureSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="procedureName">Procedure Name</Label>
                      <Input
                        id="procedureName"
                        value={newProcedure.name}
                        onChange={(e) => setNewProcedure({ ...newProcedure, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="procedurePatient">Patient Name</Label>
                      <Input
                        id="procedurePatient"
                        value={newProcedure.patient}
                        onChange={(e) => setNewProcedure({ ...newProcedure, patient: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="procedureTime">Procedure Time</Label>
                      <Input
                        id="procedureTime"
                        type="time"
                        value={newProcedure.time}
                        onChange={(e) => setNewProcedure({ ...newProcedure, time: e.target.value })}
                        required
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Schedule Procedure</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div>Loading procedures...</div>
              ) : (
                <div className="space-y-4">
                  {procedures.map((procedure) => (
                    <div
                      key={procedure.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="text-sm font-medium">{procedure.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {procedure.patient} - {procedure.time}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Select
                          value={procedure.status}
                          onValueChange={(value) => handleProcedureStatusChange(procedure.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteProcedure(procedure.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

