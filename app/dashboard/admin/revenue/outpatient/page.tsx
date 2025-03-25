import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OutpatientRevenuePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Outpatient Revenue Details</h1>
        <Button asChild>
          <Link href="/dashboard/admin/revenue">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Revenue Overview
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Outpatient Revenue Breakdown</CardTitle>
          <CardDescription>Detailed view of revenue from outpatient services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Total Outpatient Revenue: $14,290</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Service Type</th>
                <th className="text-left p-2">Revenue</th>
                <th className="text-left p-2">% of Outpatient</th>
                <th className="text-left p-2">Change from Last Month</th>
              </tr>
            </thead>
            <tbody>
              {[
                { service: "Consultations", revenue: "$5,500", percentage: "38.5%", change: "+15.2%" },
                { service: "Diagnostic Tests", revenue: "$4,200", percentage: "29.4%", change: "+10.5%" },
                { service: "Minor Procedures", revenue: "$3,100", percentage: "21.7%", change: "+11.8%" },
                { service: "Physical Therapy", revenue: "$1,490", percentage: "10.4%", change: "+9.7%" },
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

