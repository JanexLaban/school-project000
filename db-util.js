import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"
import { fileURLToPath } from "url"
import readline from "readline"

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Path to the database
const dbPath = path.join(__dirname, "data", "hospital.db")

async function openDatabase() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  })
}

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function runQuery(query) {
  const db = await openDatabase()
  try {
    // Determine if it's a SELECT query or another type
    if (query.trim().toUpperCase().startsWith("SELECT")) {
      const rows = await db.all(query)
      console.table(rows)
      console.log(`${rows.length} rows returned`)
    } else {
      const result = await db.run(query)
      console.log("Query executed successfully")
      if (result.changes) {
        console.log(`${result.changes} rows affected`)
      }
      if (result.lastID) {
        console.log(`Last inserted ID: ${result.lastID}`)
      }
    }
  } catch (error) {
    console.error("Error executing query:", error.message)
  } finally {
    await db.close()
  }
}

async function listTables() {
  const db = await openDatabase()
  try {
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'")
    console.log("Tables in database:")
    tables.forEach((table) => console.log(`- ${table.name}`))
  } catch (error) {
    console.error("Error listing tables:", error.message)
  } finally {
    await db.close()
  }
}

async function describeTable(tableName) {
  const db = await openDatabase()
  try {
    const columns = await db.all(`PRAGMA table_info(${tableName})`)
    console.log(`Structure of table '${tableName}':`)
    console.table(columns)
  } catch (error) {
    console.error(`Error describing table ${tableName}:`, error.message)
  } finally {
    await db.close()
  }
}

function promptUser() {
  rl.question("\nEnter a command (query/tables/describe/exit): ", async (command) => {
    if (command.toLowerCase() === "exit") {
      rl.close()
      return
    }

    if (command.toLowerCase() === "tables") {
      await listTables()
      promptUser()
      return
    }

    if (command.toLowerCase().startsWith("describe ")) {
      const tableName = command.substring("describe ".length).trim()
      await describeTable(tableName)
      promptUser()
      return
    }

    if (command.toLowerCase() === "query") {
      rl.question("Enter your SQL query: ", async (query) => {
        await runQuery(query)
        promptUser()
      })
      return
    }

    // If it's not a recognized command, treat it as a SQL query
    await runQuery(command)
    promptUser()
  })
}

console.log("SQLite Database Utility")
console.log("------------------------")
console.log("Available commands:")
console.log("  tables - List all tables")
console.log("  describe [table] - Show table structure")
console.log("  query - Enter a SQL query")
console.log("  exit - Exit the utility")
console.log("Or just type your SQL query directly")

promptUser()

