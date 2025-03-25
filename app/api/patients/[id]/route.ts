import { type NextRequest, NextResponse } from "next/server"
import { getPatientById, updatePatient, deletePatient } from "@/lib/db/repositories/patientRepository"
import { updateUser } from "@/lib/db/repositories/userRepository"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid patient ID" }, { status: 400 })
    }

    const patient = await getPatientById(id)
    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 })
    }

    return NextResponse.json({ patient })
  } catch (error) {
    console.error("Error fetching patient:", error)
    return NextResponse.json({ error: "Failed to fetch patient" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid patient ID" }, { status: 400 })
    }

    const patient = await getPatientById(id)
    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 })
    }

    const data = await request.json()

    // Update patient data
    if (
      Object.keys(data).some((key) =>
        [
          "medical_record_number",
          "date_of_birth",
          "gender",
          "blood_type",
          "address",
          "phone",
          "emergency_contact_name",
          "emergency_contact_phone",
        ].includes(key),
      )
    ) {
      const patientData = {}
      ;[
        "medical_record_number",
        "date_of_birth",
        "gender",
        "blood_type",
        "address",
        "phone",
        "emergency_contact_name",
        "emergency_contact_phone",
      ].forEach((key) => {
        if (data[key] !== undefined) {
          patientData[key] = data[key]
        }
      })

      await updatePatient(id, patientData)
    }

    // Update user data if provided
    if (data.name || data.email) {
      const userData = {}
      if (data.name) userData["name"] = data.name
      if (data.email) userData["email"] = data.email

      await updateUser(patient.user_id, userData)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating patient:", error)
    return NextResponse.json({ error: "Failed to update patient" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid patient ID" }, { status: 400 })
    }

    const patient = await getPatientById(id)
    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 })
    }

    await deletePatient(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting patient:", error)
    return NextResponse.json({ error: "Failed to delete patient" }, { status: 500 })
  }
}

