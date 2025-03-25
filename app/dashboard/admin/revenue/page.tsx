"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, PieChart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RevenuePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Revenue Overview</h1>
        <Button asChild>
          <Link href="/dashboard/admin">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/revenue/total")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 6,291,350</div>
            <p className="text-xs text-muted-foreground">+7.4% from last month</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/revenue/inpatient")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inpatient Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 4,173,650</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/revenue/outpatient")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outpatient Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$14,290</div>
            <p className="text-xs text-muted-foreground">+12.8% from last month</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => router.push("/dashboard/admin/revenue/pharmacy")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pharmacy Revenue</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,000</div>
            <p className="text-xs text-muted-foreground">-3.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
          <CardDescription>Distribution of revenue sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {/* Placeholder for a pie chart */}
            <div className="flex items-center justify-center h-full">
              <PieChart className="h-32 w-32 text-muted-foreground" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
              <span>Inpatient (66.3%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <span>Outpatient (29.5%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
              <span>Pharmacy (4.2%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Trend</CardTitle>
          <CardDescription>Revenue over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {/* Placeholder for a line chart */}
            <div className="flex items-end justify-between h-full">
              {[40000, 42000, 45000, 47000, 46000, 48395].map((value, index) => (
                <div key={index} className="w-1/6 bg-primary" style={{ height: `${(value / 50000) * 100}%` }}></div>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm">Dec</span>
            <span className="text-sm">Jan</span>
            <span className="text-sm">Feb</span>
            <span className="text-sm">Mar</span>
            <span className="text-sm">Apr</span>
            <span className="text-sm">May</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

