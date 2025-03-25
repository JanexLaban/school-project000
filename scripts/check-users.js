import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'data', 'hospital.db');

const db = new sqlite3.Database(dbPath);

db.all("SELECT email, role FROM users", [], (err, rows) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Users in database:', rows);
    }
    db.close();
});