import { type NextRequest, NextResponse } from "next/server"
import { getAllPatients, createPatient } from "@/lib/db/repositories/patientRepository"
import { createUser } from "@/lib/db/repositories/userRepository"

export async function GET() {
  try {
    const patients = await getAllPatients()
    return NextResponse.json({ patients })
  } catch (error) {
    console.error("Error fetching patients:", error)
    return NextResponse.json({ error: "Failed to fetch patients" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields for user
    const requiredUserFields = ["name", "email", "password"]
    for (const field of requiredUserFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required user field: ${field}` }, { status: 400 })
      }
    }

    // Validate required fields for patient
    const requiredPatientFields = ["medical_record_number", "date_of_birth", "gender", "address", "phone"]
    for (const field of requiredPatientFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required patient field: ${field}` }, { status: 400 })
      }
    }

    // Create user first
    const userId = await createUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role: "patient",
      department_id: null,
    })

    // Then create patient with the user ID
    const patientId = await createPatient({
      user_id: userId,
      medical_record_number: data.medical_record_number,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
      blood_type: data.blood_type,
      address: data.address,
      phone: data.phone,
      emergency_contact_name: data.emergency_contact_name,
      emergency_contact_phone: data.emergency_contact_phone,
    })

    return NextResponse.json({ success: true, userId, patientId }, { status: 201 })
  } catch (error) {
    console.error("Error creating patient:", error)
    return NextResponse.json({ error: "Failed to create patient" }, { status: 500 })
  }
}

