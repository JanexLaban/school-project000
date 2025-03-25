"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, FileText, Pill, Plus, X } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: "May 15, 2023",
      time: "10:30 AM",
      doctor: "Dr. Smith",
      department: "Cardiology",
      status: "Confirmed",
    },
    {
      id: 2,
      date: "June 2, 2023",
      time: "02:15 PM",
      doctor: "Dr. Johnson",
      department: "General Medicine",
      status: "Pending",
    },
  ])

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribed: "Apr 15, 2023",
      doctor: "Dr. Smith",
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribed: "Mar 22, 2023",
      doctor: "Dr. Johnson",
    },
    {
      id: 3,
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      prescribed: "Apr 10, 2023",
      doctor: "Dr. Smith",
    },
  ])

  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. John Smith", specialty: "Cardiologist", lastVisit: "2 weeks ago" },
    { id: 2, name: "Dr. Sarah Johnson", specialty: "General Physician", lastVisit: "1 month ago" },
    { id: 3, name: "Dr. Michael Brown", specialty: "Neurologist", lastVisit: "3 months ago" },
  ])

  const [isBookingAppointment, setIsBookingAppointment] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [selectedPrescription, setSelectedPrescription] = useState(null)

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id))
  }

  const bookAppointment = (newAppointment) => {
    setAppointments([...appointments, { ...newAppointment, id: appointments.length + 1, status: "Pending" }])
    setIsBookingAppointment(false)
  }

  const requestRefill = (prescriptionId) => {
    // In a real app, this would send a request to the backend
    alert(`Refill requested for prescription ${prescriptionId}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Patient Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Upcoming Appointments</p>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">{appointments.length}</h3>
              <Button variant="ghost" size="sm" className="text-xs text-primary">
                View all
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Active Prescriptions</p>
              <Pill className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">{prescriptions.length}</h3>
              <Button variant="ghost" size="sm" className="text-xs text-primary">
                View all
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Medical Records</p>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">12</h3>
              <Button variant="ghost" size="sm" className="text-xs text-primary">
                View all
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Next Appointment</p>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold">{appointments[0]?.date || "No upcoming appointments"}</h3>
              <p className="text-xs text-muted-foreground">
                {appointments[0]?.doctor} - {appointments[0]?.time}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled appointments</CardDescription>
            </div>
            <Button size="sm" onClick={() => setIsBookingAppointment(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="text-sm font-medium">{appointment.date.split(",")[0]}</div>
                    <div className="text-xs text-muted-foreground">{appointment.date.split(",")[1]}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{appointment.doctor}</p>
                    <p className="text-xs text-muted-foreground">
                      {appointment.department} - {appointment.time}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        appointment.status === "Confirmed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedAppointment(appointment)}>
                    Details
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteAppointment(appointment.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Doctors</CardTitle>
            <CardDescription>Healthcare professionals managing your care</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?${doctor.id}`} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.split(" ").slice(-1)[0][0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{doctor.name}</p>
                    <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#">Contact</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Prescriptions</CardTitle>
          <CardDescription>Your current medications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {prescriptions.map((prescription) => (
              <Card key={prescription.id} className="border shadow-none">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{prescription.name}</h4>
                      <Pill className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        <span className="font-medium">Dosage:</span> {prescription.dosage}
                      </p>
                      <p>
                        <span className="font-medium">Frequency:</span> {prescription.frequency}
                      </p>
                      <p>
                        <span className="font-medium">Prescribed:</span> {prescription.prescribed}
                      </p>
                      <p>
                        <span className="font-medium">Doctor:</span> {prescription.doctor}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => requestRefill(prescription.id)}
                    >
                      Refill Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isBookingAppointment} onOpenChange={setIsBookingAppointment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book an Appointment</DialogTitle>
            <DialogDescription>Fill in the details to book a new appointment.</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newAppointment = Object.fromEntries(formData)
              bookAppointment(newAppointment)
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" name="date" type="date" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input id="time" name="time" type="time" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doctor" className="text-right">
                  Doctor
                </Label>
                <Select name="doctor" required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.name}>
                        {doctor.name} - {doctor.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Input id="department" name="department" className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Book Appointment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Date</Label>
                <span className="col-span-3">{selectedAppointment.date}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Time</Label>
                <span className="col-span-3">{selectedAppointment.time}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Doctor</Label>
                <span className="col-span-3">{selectedAppointment.doctor}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Department</Label>
                <span className="col-span-3">{selectedAppointment.department}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Status</Label>
                <span className="col-span-3">{selectedAppointment.status}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setSelectedAppointment(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

