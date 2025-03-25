import { type NextRequest, NextResponse } from "next/server"
import {
  getAllAppointments,
  getAppointmentsByDate,
  createAppointment,
} from "@/lib/db/repositories/appointmentRepository"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get("date")

    let appointments
    if (date) {
      appointments = await getAppointmentsByDate(date)
    } else {
      appointments = await getAllAppointments()
    }

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ["patient_id", "staff_id", "department_id", "date", "time", "status", "type"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const appointmentId = await createAppointment(data)

    return NextResponse.json({ success: true, appointmentId }, { status: 201 })
  } catch (error) {
    console.error("Error creating appointment:", error)
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
  }
}

