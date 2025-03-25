import { getDb } from "../index"
import type { Appointment } from "../schema"

export async function getAllAppointments(): Promise<Appointment[]> {
  const db = await getDb()
  return db.all("SELECT * FROM appointments ORDER BY date, time")
}

export async function getAppointmentById(id: number): Promise<Appointment | undefined> {
  const db = await getDb()
  return db.get("SELECT * FROM appointments WHERE id = ?", id)
}

export async function getAppointmentsByPatientId(patientId: number): Promise<Appointment[]> {
  const db = await getDb()
  return db.all("SELECT * FROM appointments WHERE patient_id = ? ORDER BY date, time", patientId)
}

export async function getAppointmentsByStaffId(staffId: number): Promise<Appointment[]> {
  const db = await getDb()
  return db.all("SELECT * FROM appointments WHERE staff_id = ? ORDER BY date, time", staffId)
}

export async function getAppointmentsByDate(date: string): Promise<Appointment[]> {
  const db = await getDb()
  return db.all("SELECT * FROM appointments WHERE date = ? ORDER BY time", date)
}

export async function createAppointment(
  appointment: Omit<Appointment, "id" | "created_at" | "updated_at">,
): Promise<number> {
  const db = await getDb()
  const result = await db.run(
    'INSERT INTO appointments (patient_id, staff_id, department_id, date, time, status, type, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime("now"), datetime("now"))',
    [
      appointment.patient_id,
      appointment.staff_id,
      appointment.department_id,
      appointment.date,
      appointment.time,
      appointment.status,
      appointment.type,
      appointment.notes,
    ],
  )
  return result.lastID!
}

export async function updateAppointment(
  id: number,
  appointment: Partial<Omit<Appointment, "id" | "created_at" | "updated_at">>,
): Promise<void> {
  const db = await getDb()
  const fields = Object.keys(appointment)
    .map((key) => `${key} = ?`)
    .join(", ")
  const values = Object.values(appointment)

  await db.run(`UPDATE appointments SET ${fields}, updated_at = datetime("now") WHERE id = ?`, [...values, id])
}

export async function deleteAppointment(id: number): Promise<void> {
  const db = await getDb()
  await db.run("DELETE FROM appointments WHERE id = ?", id)
}

