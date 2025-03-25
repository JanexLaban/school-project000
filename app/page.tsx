import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Building2, Stethoscope, User, UserCog, UserRound } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">HMS</h1>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Hospital Management System</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A comprehensive solution for managing hospital operations, patient care, and administrative tasks.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/login">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#portals">Explore Portals</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="portals" className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Access Portals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PortalCard
              title="Admin Portal"
              description="Manage hospital operations, staff, and resources"
              icon={<UserCog className="h-12 w-12 text-primary" />}
              href="/login?role=admin"
            />
            <PortalCard
              title="Doctor Portal"
              description="Access patient records, appointments, and treatment plans"
              icon={<Stethoscope className="h-12 w-12 text-primary" />}
              href="/login?role=doctor"
            />
            <PortalCard
              title="Patient Portal"
              description="View medical records, appointments, and prescriptions"
              icon={<UserRound className="h-12 w-12 text-primary" />}
              href="/login?role=patient"
            />
            <PortalCard
              title="Nurse Portal"
              description="Manage patient care, medications, and ward activities"
              icon={<User className="h-12 w-12 text-primary" />}
              href="/login?role=nurse"
            />
            <PortalCard
              title="Reception Portal"
              description="Handle appointments, admissions, and patient inquiries"
              icon={<User className="h-12 w-12 text-primary" />}
              href="/login?role=reception"
            />
            <PortalCard
              title="Outpatient Center"
              description="Manage outpatient services, consultations, and follow-ups"
              icon={<Building2 className="h-12 w-12 text-primary" />}
              href="/login?role=outpatient"
            />
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Hospital Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function PortalCard({
  title,
  description,
  icon,
  href,
}: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-center mb-4">{icon}</div>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1"></CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" asChild>
          <Link href={href}>
            Access Portal <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

