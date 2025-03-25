"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, ClipboardList, Clock, FileText, Home, MessageSquare, Settings, Users, Pill } from "lucide-react"

const sidebarItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/doctor/dashboard",
        icon: Home,
      },
      {
        title: "Appointments",
        href: "/doctor/appointments",
        icon: Calendar,
      },
      {
        title: "Patients",
        href: "/doctor/patients",
        icon: Users,
      },
      {
        title: "Medical Records",
        href: "/doctor/records",
        icon: FileText,
      },
    ],
  },
  {
    title: "Clinical",
    items: [
      {
        title: "Prescriptions",
        href: "/doctor/prescriptions",
        icon: Pill,
      },
      {
        title: "Lab Results",
        href: "/doctor/lab-results",
        icon: ClipboardList,
      },
      {
        title: "Messages",
        href: "/doctor/messages",
        icon: MessageSquare,
      },
      {
        title: "Settings",
        href: "/doctor/settings",
        icon: Settings,
      },
    ],
  },
]

export default function DoctorDashboard() {
  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your doctor portal. Manage your appointments, patients, and medical records.
        </p>

        <Tabs defaultValue="today" className="mt-6">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="patients">My Patients</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">2 urgent consultations</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">1 due today</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">2 from nursing staff</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">On-call Hours</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12h</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your schedule for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "09:00 AM", patient: "Sarah Johnson", reason: "Follow-up", status: "Confirmed" },
                    { time: "10:30 AM", patient: "Michael Chen", reason: "Consultation", status: "Confirmed" },
                    { time: "11:45 AM", patient: "Emma Davis", reason: "Test Results", status: "Waiting" },
                    { time: "02:15 PM", patient: "Robert Wilson", reason: "Urgent", status: "Confirmed" },
                  ].map((appointment, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-medium text-muted-foreground">{appointment.time}</div>
                        <div>
                          <p className="text-sm font-medium">{appointment.patient}</p>
                          <p className="text-xs text-muted-foreground">{appointment.reason}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={appointment.status === "Waiting" ? "outline" : "default"}>
                          {appointment.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="patients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Patients</CardTitle>
                <CardDescription>Patients you've seen recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Sarah Johnson", age: 42, condition: "Hypertension", lastVisit: "2 days ago" },
                    { name: "Michael Chen", age: 35, condition: "Diabetes Type 2", lastVisit: "1 week ago" },
                    { name: "Emma Davis", age: 28, condition: "Pregnancy", lastVisit: "2 weeks ago" },
                    { name: "Robert Wilson", age: 65, condition: "Arthritis", lastVisit: "3 weeks ago" },
                  ].map((patient, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {patient.age} years • {patient.condition}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-muted-foreground">Last visit: {patient.lastVisit}</div>
                        <Button variant="outline" size="sm">
                          View Records
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
                <CardDescription>Tasks that require your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { task: "Review lab results for Emma Davis", priority: "High", due: "Today" },
                    { task: "Complete medical report for Michael Chen", priority: "Medium", due: "Tomorrow" },
                    { task: "Sign off on prescription renewals", priority: "Medium", due: "Today" },
                    { task: "Prepare for department meeting", priority: "Low", due: "This week" },
                  ].map((task, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            task.priority === "High"
                              ? "bg-destructive"
                              : task.priority === "Medium"
                                ? "bg-amber-500"
                                : "bg-green-500"
                          }`}
                        />
                        <div>
                          <p className="text-sm font-medium">{task.task}</p>
                          <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Complete
                      </Button>
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

