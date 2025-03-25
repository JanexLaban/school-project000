import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DoctorPatientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Doctor's Patients</h1>
        <Button asChild>
          <Link href="/dashboard/doctor">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Patients</CardTitle>
          <CardDescription>List of patients under your care</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Sarah Johnson", age: 45, condition: "Hypertension", lastVisit: "2 days ago" },
              { name: "Robert Williams", age: 62, condition: "Diabetes", lastVisit: "1 week ago" },
              { name: "Lisa Anderson", age: 35, condition: "Asthma", lastVisit: "2 weeks ago" },
              { name: "David Martinez", age: 50, condition: "Arthritis", lastVisit: "3 weeks ago" },
              { name: "Emily Brown", age: 28, condition: "Migraine", lastVisit: "1 month ago" },
            ].map((patient, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Age: {patient.age} | Condition: {patient.condition}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Last visit: {patient.lastVisit}</span>
                  <Button variant="outline" size="sm">
                    View Records
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

