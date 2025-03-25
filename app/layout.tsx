import type React from "react"
import type { Metadata } from "next"
import { Inter, Crimson_Text } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/providers"
import { AuthProvider } from "@/contexts/auth-context"
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarFooterContent } from "@/components/ui/sidebar"
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] })
const crimson = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-crimson",
})

export const metadata: Metadata = {
  title: "The Nairobi Hospital - Hospital Management System",
  description: "The Nairobi Hospital's comprehensive hospital management system",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${crimson.variable}`}>
        <SessionProvider>
          <Providers>
            <AuthProvider>
              <div className="flex flex-col min-h-screen">
                <header className="fixed top-0 left-0 right-0 bg-primary z-50 shadow-md">
                  <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                      <div className="flex items-center gap-2">
                        <img 
                          src="/nairobi-hospital-logo.png" 
                          alt="The Nairobi Hospital" 
                          className="h-10 w-auto"
                        />
                        <span className="text-white text-xl font-semibold">
                          The Nairobi Hospital
                        </span>
                      </div>
                      <nav className="flex items-center gap-6">
                        <a href="/covid" className="text-white hover:text-secondary transition-colors">
                          Covid-19 Center
                        </a>
                        <button className="bg-white text-primary hover:bg-secondary hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                          Contact Us
                        </button>
                      </nav>
                    </div>
                  </div>
                </header>
                
                <main className="flex flex-1 pt-16"> {/* Add padding-top to account for fixed header */}
                  <SidebarProvider>
                    <Sidebar>
                      <SidebarHeader>
                        {/* header content */}
                      </SidebarHeader>
                      <SidebarContent>
                        {/* main content */}
                      </SidebarContent>
                      <SidebarFooter>
                        <SidebarFooterContent />
                      </SidebarFooter>
                    </Sidebar>
                    <div className="flex-1">
                      {children}
                    </div>
                  </SidebarProvider>
                </main>
                <Toaster />
              </div>
            </AuthProvider>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}

