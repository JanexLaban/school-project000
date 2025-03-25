import { getDb } from "../index"
import type { User } from "../schema"

export async function getAllUsers(): Promise<User[]> {
  const db = await getDb()
  return db.all("SELECT * FROM users")
}

export async function getUserById(id: number): Promise<User | undefined> {
  const db = await getDb()
  return db.get("SELECT * FROM users WHERE id = ?", id)
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await getDb()
  return db.get("SELECT * FROM users WHERE email = ?", email)
}

export async function createUser(user: Omit<User, "id" | "created_at" | "updated_at">): Promise<number> {
  const db = await getDb()
  const result = await db.run(
    'INSERT INTO users (name, email, password, role, department_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, datetime("now"), datetime("now"))',
    [user.name, user.email, user.password, user.role, user.department_id],
  )
  return result.lastID!
}

export async function updateUser(
  id: number,
  user: Partial<Omit<User, "id" | "created_at" | "updated_at">>,
): Promise<void> {
  const db = await getDb()
  const fields = Object.keys(user)
    .map((key) => `${key} = ?`)
    .join(", ")
  const values = Object.values(user)

  await db.run(`UPDATE users SET ${fields}, updated_at = datetime("now") WHERE id = ?`, [...values, id])
}

export async function deleteUser(id: number): Promise<void> {
  const db = await getDb()
  await db.run("DELETE FROM users WHERE id = ?", id)
}

