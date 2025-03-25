import type React from "react"
import type { Metadata } from "next"
import { Inter, Crimson_Text } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/providers"
import { AuthProvider } from "@/contexts/auth-context"

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
        <Providers>
          <AuthProvider>
            <header className="header-bar w-full py-2 px-4">
              <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src="/nairobi-hospital-logo.png" alt="The Nairobi Hospital" className="h-12 w-auto" />
                  <span className="logo-text text-white text-xl">The Nairobi Hospital</span>
                </div>
                <div className="flex items-center gap-4">
                  <a href="#" className="text-white hover:text-secondary text-sm">
                    Covid-19 Center
                  </a>
                  <button className="action-button px-4 py-2 rounded-md text-sm font-medium">Contact Us</button>
                </div>
              </div>
            </header>
            {children}
            <Toaster />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}

