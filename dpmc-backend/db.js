const Database = require('better-sqlite3');
const path = require('path');

// Database file path can be customized via environment variable for hosting
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '..', 'dpmc-database', 'dpmc.db');

const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create the table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS deposit_codes (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    id_number  TEXT    NOT NULL,
    code       TEXT    NOT NULL,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

console.log('✅  SQLite database ready at:', dbPath);

module.exports = db;
