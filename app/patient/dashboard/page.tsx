"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Pill,
  Heart,
  Activity,
  Clock,
  CreditCard,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Patient Portal",
    items: [
      {
        title: "Dashboard",
        href: "/patient/dashboard",
        icon: Home,
      },
      {
        title: "Appointments",
        href: "/patient/appointments",
        icon: Calendar,
      },
      {
        title: "Medical Records",
        href: "/patient/records",
        icon: FileText,
      },
      {
        title: "Prescriptions",
        href: "/patient/prescriptions",
        icon: Pill,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Messages",
        href: "/patient/messages",
        icon: MessageSquare,
      },
      {
        title: "Billing",
        href: "/patient/billing",
        icon: CreditCard,
      },
      {
        title: "Settings",
        href: "/patient/settings",
        icon: Settings,
      },
    ],
  },
]

export default function PatientDashboard() {
  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your patient portal. Manage your appointments, view medical records, and more.
        </p>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Mar 15</div>
                  <p className="text-xs text-muted-foreground">10:30 AM with Dr. Smith</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
                  <Pill className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">1 renewal needed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">From your healthcare team</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$125</div>
                  <p className="text-xs text-muted-foreground">Due in 14 days</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Health Metrics</CardTitle>
                  <CardDescription>Your recent health measurements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Blood Pressure</span>
                      </div>
                      <span className="text-sm">120/80 mmHg</span>
                    </div>
                    <Progress value={70} className="h-2" />
                    <p className="text-xs text-muted-foreground">Last measured: 2 days ago</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Heart Rate</span>
                      </div>
                      <span className="text-sm">72 bpm</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    <p className="text-xs text-muted-foreground">Last measured: 2 days ago</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Blood Glucose</span>
                      </div>
                      <span className="text-sm">95 mg/dL</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground">Last measured: 1 week ago</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent healthcare interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { date: "Mar 1, 2023", activity: "Lab Test Results", details: "Complete Blood Count" },
                      { date: "Feb 15, 2023", activity: "Doctor Visit", details: "Annual Physical" },
                      { date: "Feb 10, 2023", activity: "Prescription Refill", details: "Lisinopril 10mg" },
                      { date: "Jan 25, 2023", activity: "Specialist Referral", details: "Cardiology" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 border-b pb-3 last:border-0 last:pb-0">
                        <div className="min-w-[80px] text-xs text-muted-foreground">{item.date}</div>
                        <div>
                          <p className="text-sm font-medium">{item.activity}</p>
                          <p className="text-xs text-muted-foreground">{item.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      date: "Mar 15, 2023",
                      time: "10:30 AM",
                      doctor: "Dr. Jane Smith",
                      department: "Cardiology",
                      status: "Confirmed",
                    },
                    {
                      date: "Apr 5, 2023",
                      time: "2:15 PM",
                      doctor: "Dr. Michael Johnson",
                      department: "General Practice",
                      status: "Scheduled",
                    },
                  ].map((appointment, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-medium text-muted-foreground">
                          {appointment.date}
                          <br />
                          {appointment.time}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{appointment.doctor}</p>
                          <p className="text-xs text-muted-foreground">{appointment.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={appointment.status === "Scheduled" ? "outline" : "default"}>
                          {appointment.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Schedule New Appointment</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Past Appointments</CardTitle>
                <CardDescription>Your appointment history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      date: "Feb 15, 2023",
                      time: "9:00 AM",
                      doctor: "Dr. Jane Smith",
                      department: "Cardiology",
                      notes: "Available",
                    },
                    {
                      date: "Jan 10, 2023",
                      time: "11:30 AM",
                      doctor: "Dr. Robert Wilson",
                      department: "Orthopedics",
                      notes: "Available",
                    },
                    {
                      date: "Dec 5, 2022",
                      time: "3:45 PM",
                      doctor: "Dr. Sarah Lee",
                      department: "Dermatology",
                      notes: "Available",
                    },
                  ].map((appointment, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-medium text-muted-foreground">
                          {appointment.date}
                          <br />
                          {appointment.time}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{appointment.doctor}</p>
                          <p className="text-xs text-muted-foreground">{appointment.department}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Notes
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="medications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
                <CardDescription>Your active prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Lisinopril",
                      dosage: "10mg",
                      frequency: "Once daily",
                      refills: 2,
                      expires: "Jun 15, 2023",
                    },
                    {
                      name: "Atorvastatin",
                      dosage: "20mg",
                      frequency: "Once daily at bedtime",
                      refills: 3,
                      expires: "Aug 10, 2023",
                    },
                    {
                      name: "Metformin",
                      dosage: "500mg",
                      frequency: "Twice daily with meals",
                      refills: 0,
                      expires: "Apr 5, 2023",
                    },
                  ].map((medication, i) => (
                    <div key={i} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium">
                          {medication.name} {medication.dosage}
                        </p>
                        <p className="text-xs text-muted-foreground">{medication.frequency}</p>
                        <p className="text-xs text-muted-foreground">
                          Refills: {medication.refills} • Expires: {medication.expires}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" disabled={medication.refills === 0}>
                        {medication.refills > 0 ? "Request Refill" : "No Refills"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medication History</CardTitle>
                <CardDescription>Previously prescribed medications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Amoxicillin", dosage: "500mg", frequency: "Three times daily", endDate: "Nov 15, 2022" },
                    { name: "Prednisone", dosage: "10mg", frequency: "Once daily", endDate: "Oct 1, 2022" },
                  ].map((medication, i) => (
                    <div key={i} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium">
                          {medication.name} {medication.dosage}
                        </p>
                        <p className="text-xs text-muted-foreground">{medication.frequency}</p>
                        <p className="text-xs text-muted-foreground">Ended: {medication.endDate}</p>
                      </div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

