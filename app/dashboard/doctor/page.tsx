"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { Calendar, Clock, Users, FileText } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function DoctorDashboard() {
  const router = useRouter()

  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [selectedPatient, setSelectedPatient] = useState(null)

  const appointments = [
    {
      time: "09:00 AM",
      patient: "Sarah Johnson",
      type: "Follow-up",
      status: "Completed",
      notes: "Patient reported improvement in symptoms. Adjusted medication dosage.",
    },
    {
      time: "10:30 AM",
      patient: "John Smith",
      type: "Consultation",
      status: "Upcoming",
      notes: "Initial consultation for persistent headaches.",
    },
    {
      time: "11:45 AM",
      patient: "Emily Davis",
      type: "Check-up",
      status: "Upcoming",
      notes: "Routine check-up for diabetes management.",
    },
    {
      time: "02:15 PM",
      patient: "Michael Brown",
      type: "Follow-up",
      status: "Upcoming",
      notes: "Post-surgery follow-up. Check incision site and discuss recovery progress.",
    },
    {
      time: "03:30 PM",
      patient: "Jessica Wilson",
      type: "Consultation",
      status: "Upcoming",
      notes: "Discuss results of recent blood tests and potential treatment options.",
    },
  ]

  const recentPatients = [
    {
      id: "1",
      name: "Sarah Johnson",
      condition: "Hypertension",
      lastVisit: "2 days ago",
      age: 45,
      gender: "Female",
      nextAppointment: "15 May 2023",
      notes: "Blood pressure has been stable. Continue current medication.",
    },
    {
      id: "2",
      name: "Robert Williams",
      condition: "Diabetes",
      lastVisit: "1 week ago",
      age: 58,
      gender: "Male",
      nextAppointment: "22 May 2023",
      notes: "Recent blood sugar levels have improved. Discuss diet modifications.",
    },
    {
      id: "3",
      name: "Lisa Anderson",
      condition: "Asthma",
      lastVisit: "2 weeks ago",
      age: 32,
      gender: "Female",
      nextAppointment: "1 June 2023",
      notes: "No recent asthma attacks. Review inhaler technique at next visit.",
    },
    {
      id: "4",
      name: "David Martinez",
      condition: "Arthritis",
      lastVisit: "3 weeks ago",
      age: 67,
      gender: "Male",
      nextAppointment: "10 June 2023",
      notes: "Experiencing increased joint pain. Consider adjusting pain management plan.",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Doctor Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/doctor/appointments")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Today's Appointments</p>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">8</h3>
              <div className="text-xs text-green-500">2 remaining</div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/doctor/patients")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">248</h3>
              <div className="text-xs text-green-500">+5 this week</div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/doctor/schedule")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Next Appointment</p>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold">10:30 AM</h3>
              <p className="text-xs text-muted-foreground">John Smith</p>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/doctor/reports")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Pending Reports</p>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">3</h3>
              <div className="text-xs text-red-500">Due today</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your appointments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="flex-shrink-0 w-16 text-sm font-medium">{appointment.time}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{appointment.patient}</p>
                    <p className="text-xs text-muted-foreground">{appointment.type}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        appointment.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedAppointment(appointment)}>
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
              <DialogDescription>Full information about the selected appointment</DialogDescription>
            </DialogHeader>
            {selectedAppointment && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Time</h4>
                  <p>{selectedAppointment.time}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Patient</h4>
                  <p>{selectedAppointment.patient}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Type</h4>
                  <p>{selectedAppointment.type}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Status</h4>
                  <p>{selectedAppointment.status}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Notes</h4>
                  <p>{selectedAppointment.notes}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
            <CardDescription>Patients you've recently treated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?${i}`} alt={patient.name} />
                    <AvatarFallback>
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">{patient.condition}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{patient.lastVisit}</div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Patient Details</DialogTitle>
              <DialogDescription>Full information about the selected patient</DialogDescription>
            </DialogHeader>
            {selectedPatient && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?${selectedPatient.name}`} alt={selectedPatient.name} />
                    <AvatarFallback>
                      {selectedPatient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{selectedPatient.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedPatient.age} years old, {selectedPatient.gender}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Condition</h4>
                  <p>{selectedPatient.condition}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Last Visit</h4>
                  <p>{selectedPatient.lastVisit}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Next Appointment</h4>
                  <p>{selectedPatient.nextAppointment}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Notes</h4>
                  <p>{selectedPatient.notes}</p>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setSelectedPatient(null)}>
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedPatient(null)
                      router.push(`/dashboard/doctor/patients/${selectedPatient.id}`)
                    }}
                  >
                    View Full Record
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

