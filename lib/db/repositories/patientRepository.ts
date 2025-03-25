import { getDb } from "../index"
import type { Patient } from "../schema"

export async function getAllPatients(): Promise<Patient[]> {
  const db = await getDb()
  return db.all(`
    SELECT p.*, u.name, u.email 
    FROM patients p
    JOIN users u ON p.user_id = u.id
  `)
}

export async function getPatientById(id: number): Promise<Patient | undefined> {
  const db = await getDb()
  return db.get(
    `
    SELECT p.*, u.name, u.email 
    FROM patients p
    JOIN users u ON p.user_id = u.id
    WHERE p.id = ?
  `,
    id,
  )
}

export async function getPatientByUserId(userId: number): Promise<Patient | undefined> {
  const db = await getDb()
  return db.get(
    `
    SELECT p.*, u.name, u.email 
    FROM patients p
    JOIN users u ON p.user_id = u.id
    WHERE p.user_id = ?
  `,
    userId,
  )
}

export async function createPatient(patient: Omit<Patient, "id" | "created_at" | "updated_at">): Promise<number> {
  const db = await getDb()
  const result = await db.run(
    `INSERT INTO patients (
      user_id, medical_record_number, date_of_birth, gender, blood_type, 
      address, phone, emergency_contact_name, emergency_contact_phone, 
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime("now"), datetime("now"))`,
    [
      patient.user_id,
      patient.medical_record_number,
      patient.date_of_birth,
      patient.gender,
      patient.blood_type,
      patient.address,
      patient.phone,
      patient.emergency_contact_name,
      patient.emergency_contact_phone,
    ],
  )
  return result.lastID!
}

export async function updatePatient(
  id: number,
  patient: Partial<Omit<Patient, "id" | "created_at" | "updated_at">>,
): Promise<void> {
  const db = await getDb()
  const fields = Object.keys(patient)
    .map((key) => `${key} = ?`)
    .join(", ")
  const values = Object.values(patient)

  await db.run(`UPDATE patients SET ${fields}, updated_at = datetime("now") WHERE id = ?`, [...values, id])
}

export async function deletePatient(id: number): Promise<void> {
  const db = await getDb()
  await db.run("DELETE FROM patients WHERE id = ?", id)
}

