import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const db = await getDb()

    // Determine if it's a SELECT query or another type
    const isSelectQuery = query.trim().toUpperCase().startsWith("SELECT")

    if (isSelectQuery) {
      const result = await db.all(query)
      return NextResponse.json({
        result,
        message: `Query returned ${result.length} rows`,
      })
    } else {
      const result = await db.run(query)
      return NextResponse.json({
        result: [],
        message: `Query executed successfully. ${result.changes || 0} rows affected.`,
      })
    }
  } catch (error) {
    console.error("Error executing query:", error)
    return NextResponse.json({ error: error.message || "Failed to execute query" }, { status: 500 })
  }
}

