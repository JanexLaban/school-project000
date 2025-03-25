import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function InpatientRevenuePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inpatient Revenue Details</h1>
        <Button asChild>
          <Link href="/dashboard/admin/revenue">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Revenue Overview
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inpatient Revenue Breakdown</CardTitle>
          <CardDescription>Detailed view of revenue from inpatient services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Total Inpatient Revenue: $32,105</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Service Type</th>
                <th className="text-left p-2">Revenue</th>
                <th className="text-left p-2">% of Inpatient</th>
                <th className="text-left p-2">Change from Last Month</th>
              </tr>
            </thead>
            <tbody>
              {[
                { service: "Room Charges", revenue: "$15,250", percentage: "47.5%", change: "+4.8%" },
                { service: "Surgical Procedures", revenue: "$8,500", percentage: "26.5%", change: "+7.2%" },
                { service: "Diagnostic Tests", revenue: "$5,355", percentage: "16.7%", change: "+3.5%" },
                { service: "Specialist Consultations", revenue: "$3,000", percentage: "9.3%", change: "+5.1%" },
              ].map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.service}</td>
                  <td className="p-2">{item.revenue}</td>
                  <td className="p-2">{item.percentage}</td>
                  <td className="p-2">{item.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

