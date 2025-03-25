import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TotalRevenuePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Total Revenue Details</h1>
        <Button asChild>
          <Link href="/dashboard/admin/revenue">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Revenue Overview
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Total Revenue Breakdown</CardTitle>
          <CardDescription>Detailed view of total revenue across all departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Total Revenue: KES 6,291,350</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Revenue</th>
                <th className="text-left p-2">% of Total</th>
                <th className="text-left p-2">Change from Last Month</th>
              </tr>
            </thead>
            <tbody>
              {[
                { department: "Inpatient Services", revenue: "KES 4,173,650", percentage: "66.3%", change: "+5.2%" },
                { department: "Outpatient Services", revenue: "KES 1,857,700", percentage: "29.5%", change: "+12.8%" },
                { department: "Pharmacy", revenue: "KES 260,000", percentage: "4.2%", change: "-3.1%" },
              ].map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.department}</td>
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

