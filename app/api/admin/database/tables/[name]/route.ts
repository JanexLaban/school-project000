import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { name: string } }) {
  try {
    const tableName = params.name

    // Validate table name to prevent SQL injection
    if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
      return NextResponse.json({ error: "Invalid table name" }, { status: 400 })
    }

    const db = await getDb()

    // Check if table exists
    const tableExists = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", tableName)

    if (!tableExists) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 })
    }

    // Get table data
    const rows = await db.all(`SELECT * FROM ${tableName} LIMIT 100`)

    return NextResponse.json({ rows })
  } catch (error) {
    console.error("Error fetching table data:", error)
    return NextResponse.json({ error: "Failed to fetch table data" }, { status: 500 })
  }
}

