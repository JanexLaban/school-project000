import { NextResponse } from "next/server"
import { initDb, closeDb } from "@/lib/db"
import { seedDb } from "@/lib/db/seed"

export async function POST() {
  try {
    await initDb()
    await seedDb()
    await closeDb()

    return NextResponse.json({
      success: true,
      message: "Database initialized and seeded successfully",
    })
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json({ success: false, error: "Failed to initialize database" }, { status: 500 })
  }
}

