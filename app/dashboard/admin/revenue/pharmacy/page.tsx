import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PharmacyRevenuePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pharmacy Revenue Details</h1>
        <Button asChild>
          <Link href="/dashboard/admin/revenue">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Revenue Overview
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pharmacy Revenue Breakdown</CardTitle>
          <CardDescription>Detailed view of revenue from pharmacy sales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-4">Total Pharmacy Revenue: $2,000</div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Medication Category</th>
                <th className="text-left p-2">Revenue</th>
                <th className="text-left p-2">% of Pharmacy</th>
                <th className="text-left p-2">Change from Last Month</th>
              </tr>
            </thead>
            <tbody>
              {[
                { category: "Prescription Drugs", revenue: "$1,200", percentage: "60%", change: "-2.5%" },
                { category: "Over-the-Counter", revenue: "$500", percentage: "25%", change: "-4.2%" },
                { category: "Medical Supplies", revenue: "$300", percentage: "15%", change: "-3.8%" },
              ].map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.category}</td>
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

