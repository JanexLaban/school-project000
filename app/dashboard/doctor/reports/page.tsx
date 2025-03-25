import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DoctorReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Doctor's Reports</h1>
        <Button asChild>
          <Link href="/dashboard/doctor">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Reports</CardTitle>
          <CardDescription>Reports that require your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { patient: "John Smith", type: "Lab Results", dueDate: "Today" },
              { patient: "Emma Davis", type: "Consultation Summary", dueDate: "Tomorrow" },
              { patient: "Michael Johnson", type: "Treatment Plan", dueDate: "In 2 days" },
            ].map((report, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{report.patient}</p>
                  <p className="text-sm text-muted-foreground">{report.type}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Due: {report.dueDate}</span>
                  <Button variant="outline" size="sm">
                    Complete Report
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

