import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

// Get the directory path equivalent to __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

const dbPath = path.join(__dirname, 'data', 'hospital.db');
const verbose = sqlite3.verbose();
const db = new verbose.Database(dbPath);

async function initializeDatabase() {
    try {
        console.log("Initializing database...");

        // Initialize SQLite database
        await new Promise((resolve, reject) => {
            db.serialize(() => {
                // Create users table
                db.run(`CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    role TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )`, (err) => {
                    if (err) {
                        console.error('Error creating users table:', err);
                        reject(err);
                        return;
                    }
                    console.log('✅ Users table created successfully');
                });

                // Insert default users
                const users = [
                    ['admin@hospital.com', 'admin123', 'Administrator'],
                    ['doctor@hospital.com', 'doctor123', 'Doctor'],
                    ['nurse@hospital.com', 'nurse123', 'Nurse'],
                    ['patient@hospital.com', 'patient123', 'Patient']
                ];

                const insertUser = db.prepare('INSERT OR REPLACE INTO users (email, password, role) VALUES (?, ?, ?)');
                users.forEach(user => {
                    insertUser.run(user, (err) => {
                        if (err) {
                            console.error('Error inserting user:', err);
                            reject(err);
                        }
                    });
                });
                insertUser.finalize();
                resolve();
            });
        });

        // Notify API about database initialization
        const response = await fetch("http://0.0.0.0:3000/api/db/init", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.success) {
            console.log("\nSample users created:");
            console.log("- Admin: admin@hospital.com / admin123");
            console.log("- Doctor: doctor@hospital.com / doctor123");
            console.log("- Nurse: nurse@hospital.com / nurse123");
            console.log("- Patient: patient@hospital.com / patient123");
        } else {
            console.error("❌ Failed to initialize database:", data.error);
        }
    } catch (error) {
        console.error("❌ Error during database initialization:", error.message);
        console.log("\nMake sure your Next.js application is running on http://0.0.0.0:3000");
    } finally {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err);
                process.exit(1);
            }
            console.log('✅ Database initialization completed');
        });
    }
}

initializeDatabase();