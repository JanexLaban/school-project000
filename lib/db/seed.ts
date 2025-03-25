import { getDb } from "./index"

export async function seedDb(): Promise<void> {
  const db = await getDb()

  // Check if data already exists
  const userCount = await db.get("SELECT COUNT(*) as count FROM users")
  if (userCount.count > 0) {
    console.log("Database already seeded")
    return
  }

  // Insert departments
  await db.run(`
    INSERT INTO departments (name, description) VALUES
    ('Administration', 'Hospital administration and management'),
    ('Cardiology', 'Heart-related treatments and diagnostics'),
    ('Neurology', 'Brain and nervous system treatments'),
    ('Pediatrics', 'Child healthcare services'),
    ('Orthopedics', 'Bone and joint treatments'),
    ('Emergency', 'Emergency medical services'),
    ('Radiology', 'Imaging and diagnostics'),
    ('Laboratory', 'Medical testing and analysis'),
    ('Pharmacy', 'Medication dispensing and management'),
    ('General Medicine', 'General healthcare services')
  `);

  // Insert users with Kenyan names
  await db.run(`
    INSERT INTO users (name, email, password, role, department_id) VALUES
    ('Kamau Njoroge', 'admin@hospital.com', 'password123', 'admin', 1),
    ('Dr. Wanjiku Kimani', 'wanjiku.kimani@hospital.com', 'password123', 'doctor', 2),
    ('Akinyi Ochieng', 'akinyi.nurse@hospital.com', 'password123', 'nurse', 3),
    ('Otieno Mwangi', 'otieno.reception@hospital.com', 'password123', 'reception', 1),
    ('Nyambura Kariuki', 'nyambura.patient@hospital.com', 'password123', 'patient', null),
    ('Dr. Kipchoge Keino', 'kipchoge.keino@hospital.com', 'password123', 'doctor', 4),
    ('Wangari Mutua', 'wangari.mutua@hospital.com', 'password123', 'nurse', 2),
    ('Jomo Oduor', 'jomo.oduor@hospital.com', 'password123', 'doctor', 5),
    ('Zipporah Wekesa', 'zipporah.patient@hospital.com', 'password123', 'patient', null),
    ('Muthoni Gathuru', 'muthoni.patient@hospital.com', 'password123', 'patient', null)
  `)

  // Insert users
  await db.run(`
    INSERT INTO users (name, email, password, role, department_id) VALUES
    ('Admin User', 'admin@hospital.com', 'password123', 'admin', 1),
    ('Dr. John Smith', 'john.smith@hospital.com', 'password123', 'doctor', 2),
    ('Dr. Sarah Johnson', 'sarah.johnson@hospital.com', 'password123', 'doctor', 3),
    ('Nurse Mike Brown', 'mike.brown@hospital.com', 'password123', 'nurse', 2),
    ('Nurse Lisa Davis', 'lisa.davis@hospital.com', 'password123', 'nurse', 3),
    ('Reception Staff', 'reception@hospital.com', 'password123', 'reception', 1),
    ('Patient User', 'patient@example.com', 'password123', 'patient', NULL),
    ('Outpatient User', 'outpatient@example.com', 'password123', 'outpatient', NULL)
  `)

  // Insert staff
  await db.run(`
    INSERT INTO staff (user_id, department_id, position, license_number, specialization) VALUES
    (1, 1, 'Hospital Administrator', NULL, NULL),
    (2, 2, 'Senior Cardiologist', 'MD12345', 'Heart Surgery'),
    (3, 3, 'Neurologist', 'MD67890', 'Brain Surgery'),
    (4, 2, 'Head Nurse', 'RN12345', 'Cardiac Care'),
    (5, 3, 'Registered Nurse', 'RN67890', 'Neurology'),
    (6, 1, 'Receptionist', NULL, NULL)
  `)

  // Insert patients
  await db.run(`
    INSERT INTO patients (user_id, medical_record_number, date_of_birth, gender, blood_type, address, phone, emergency_contact_name, emergency_contact_phone) VALUES
    (7, 'MRN001', '1980-05-15', 'male', 'O+', 'Kilimani Estate, Nairobi', '+254712345678', 'Wambui Njoroge', '+254712345679'),
    (8, 'MRN002', '1990-10-20', 'female', 'A-', 'Karen Estate, Nairobi', '+254723456789', 'Omondi Kimani', '+254723456780')
  `)

  // Insert appointments
  const today = new Date().toISOString().split("T")[0]
  await db.run(`
    INSERT INTO appointments (patient_id, staff_id, department_id, date, time, status, type, notes) VALUES
    (1, 2, 2, '${today}', '09:00:00', 'scheduled', 'Check-up', 'Regular heart check-up'),
    (1, 3, 3, '${today}', '11:00:00', 'scheduled', 'Consultation', 'Headache consultation'),
    (2, 2, 2, '${today}', '14:00:00', 'scheduled', 'Follow-up', 'Follow-up after surgery'),
    (2, 3, 3, '${today}', '16:00:00', 'scheduled', 'Check-up', 'Regular check-up')
  `)

  // Insert medical records
  await db.run(`
    INSERT INTO medical_records (patient_id, staff_id, date, diagnosis, treatment, notes) VALUES
    (1, 2, '2023-01-15', 'Hypertension', 'Prescribed medication and lifestyle changes', 'Patient needs to reduce salt intake'),
    (1, 3, '2023-02-20', 'Migraine', 'Prescribed pain relievers', 'Patient should avoid triggers'),
    (2, 2, '2023-03-10', 'Arrhythmia', 'Prescribed medication', 'Regular monitoring required')
  `)

  // Insert prescriptions
  await db.run(`
    INSERT INTO prescriptions (medical_record_id, medication, dosage, frequency, start_date, end_date, notes) VALUES
    (1, 'Lisinopril', '10mg', 'Once daily', '2023-01-15', '2023-07-15', 'Take with food'),
    (2, 'Sumatriptan', '50mg', 'As needed', '2023-02-20', '2023-05-20', 'Take at onset of migraine'),
    (3, 'Amiodarone', '200mg', 'Twice daily', '2023-03-10', '2023-09-10', 'Take with meals')
  `)

  // Insert invoices
  await db.run(`
    INSERT INTO invoices (patient_id, appointment_id, amount, status, payment_date, payment_method) VALUES
    (1, 1, 5000.00, 'paid', '2023-01-15', 'Credit Card'),
    (1, 2, 3000.00, 'pending', NULL, NULL),
    (2, 3, 7500.00, 'paid', '2023-03-10', 'Cash'),
    (2, 4, 2500.00, 'pending', NULL, NULL)
  `)

  console.log("Database seeded successfully")
}

