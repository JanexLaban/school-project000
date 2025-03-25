export interface User {
  id: number
  name: string
  email: string
  password: string // In a real app, this would be hashed
  role: "admin" | "doctor" | "nurse" | "reception" | "patient" | "outpatient"
  department_id?: number
  created_at: string
  updated_at: string
}

export interface Patient {
  id: number
  user_id: number
  medical_record_number: string
  date_of_birth: string
  gender: "male" | "female" | "other"
  blood_type?: string
  address: string
  phone: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  created_at: string
  updated_at: string
}

export interface Department {
  id: number
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export interface Staff {
  id: number
  user_id: number
  department_id: number
  position: string
  license_number?: string
  specialization?: string
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: number
  patient_id: number
  staff_id: number
  department_id: number
  date: string
  time: string
  status: "scheduled" | "checked_in" | "in_progress" | "completed" | "cancelled"
  type: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface MedicalRecord {
  id: number
  patient_id: number
  staff_id: number
  date: string
  diagnosis: string
  treatment: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Prescription {
  id: number
  medical_record_id: number
  medication: string
  dosage: string
  frequency: string
  start_date: string
  end_date: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: number
  patient_id: number
  appointment_id?: number
  amount: number
  status: "pending" | "paid" | "cancelled"
  payment_date?: string
  payment_method?: string
  created_at: string
  updated_at: string
}

