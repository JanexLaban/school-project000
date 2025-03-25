"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Clock, LogOut, UserPlus, Users } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/components/ui/use-toast"

export default function ReceptionDashboard() {
  const router = useRouter()
  const { logout } = useAuth()
  const { toast } = useToast()
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false)
  const [newAppointment, setNewAppointment] = useState({ patientName: "", date: "", time: "" })
  const [dashboardData, setDashboardData] = useState({
    totalAppointments: 0,
    checkedInPatients: 0,
    averageWaitTime: 0,
    newRegistrations: 0,
  })
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [notices, setNotices] = useState([])

  useEffect(() => {
    // Simulating API calls to fetch data
    const fetchDashboardData = () => {
      // In a real application, these would be API calls
      setDashboardData({
        totalAppointments: 24,
        checkedInPatients: 15,
        averageWaitTime: 18,
        newRegistrations: 3,
      })

      setUpcomingAppointments([
        { time: "09:30 AM", patient: "John Doe", type: "Check-up" },
        { time: "10:00 AM", patient: "Jane Smith", type: "Follow-up" },
        { time: "10:30 AM", patient: "Bob Johnson", type: "X-ray" },
        { time: "11:00 AM", patient: "Alice Brown", type: "Consultation" },
        { time: "11:30 AM", patient: "Charlie Davis", type: "Blood Test" },
      ])

      setNotices([
        "Dr. Smith is on leave today. Reschedule her appointments.",
        "New COVID-19 screening procedure in effect.",
        "System maintenance scheduled for tonight at 10 PM.",
      ])
    }

    fetchDashboardData()
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleAddAppointment = () => {
    if (!newAppointment.patientName || !newAppointment.date || !newAppointment.time) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    // Here you would typically make an API call to add the appointment
    setUpcomingAppointments([
      ...upcomingAppointments,
      { time: newAppointment.time, patient: newAppointment.patientName, type: "New Appointment" },
    ])
    setDashboardData({
      ...dashboardData,
      totalAppointments: dashboardData.totalAppointments + 1,
    })
    setIsAddAppointmentOpen(false)
    setNewAppointment({ patientName: "", date: "", time: "" })
    toast({
      title: "Success",
      description: "Appointment added successfully",
    })
  }

  return (
    <div className="flex flex-col gap-6 p-8 bg-background">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Reception Dashboard</h1>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalAppointments}</div>
            <p className="text-xs text-muted-foreground">3 more than yesterday</p>
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients Checked In</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.checkedInPatients}</div>
            <p className="text-xs text-muted-foreground">
              {((dashboardData.checkedInPatients / dashboardData.totalAppointments) * 100).toFixed(1)}% of total
              appointments
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.averageWaitTime} minutes</div>
            <p className="text-xs text-muted-foreground">2 minutes less than average</p>
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Patient Registrations</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.newRegistrations}</div>
            <p className="text-xs text-muted-foreground">1 more than yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1 bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Next 5 appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {upcomingAppointments.map((appointment, index) => (
                <li key={index} className="text-sm">
                  {appointment.time} - {appointment.patient} ({appointment.type})
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="col-span-1 bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Important Notices</CardTitle>
            <CardDescription>Updates for today</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {notices.map((notice, index) => (
                <li key={index} className="text-sm">
                  {notice}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAddAppointmentOpen} onOpenChange={setIsAddAppointmentOpen}>
        <DialogTrigger asChild>
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Calendar className="mr-2 h-4 w-4" />
            Add Appointment
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
            <DialogDescription>
              Enter the details for the new appointment here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patientName" className="text-right">
                Patient Name
              </Label>
              <Input
                id="patientName"
                value={newAppointment.patientName}
                onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleAddAppointment}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

