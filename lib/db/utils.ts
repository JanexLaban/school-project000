import { getDb } from "./index"

// Helper function to format date to YYYY-MM-DD
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

// Helper function to get today's date in YYYY-MM-DD format
export function getTodayDate(): string {
  return formatDate(new Date())
}

// Helper function to get current time in HH:MM:SS format
export function getCurrentTime(): string {
  return new Date().toTimeString().split(" ")[0]
}

// Helper function to check if database is initialized
export async function isDatabaseInitialized(): Promise<boolean> {
  try {
    const db = await getDb()
    const result = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'")
    return !!result
  } catch (error) {
    console.error("Error checking database initialization:", error)
    return false
  }
}

// Helper function to get dashboard statistics
export async function getDashboardStats() {
  const db = await getDb()

  const today = getTodayDate()

  // Get total appointments for today
  const totalAppointments = await db.get("SELECT COUNT(*) as count FROM appointments WHERE date = ?", today)

  // Get checked-in patients
  const checkedInPatients = await db.get(
    "SELECT COUNT(*) as count FROM appointments WHERE date = ? AND status IN ('checked_in', 'in_progress')",
    today,
  )

  // Get new patient registrations today
  const newRegistrations = await db.get("SELECT COUNT(*) as count FROM patients WHERE DATE(created_at) = ?", today)

  // Get average wait time (simulated)
  const averageWaitTime = 18 // In minutes

  return {
    totalAppointments: totalAppointments.count,
    checkedInPatients: checkedInPatients.count,
    newRegistrations: newRegistrations.count,
    averageWaitTime,
  }
}

