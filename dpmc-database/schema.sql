-- schema.sql (SQLite)
-- This table is auto-created by db.js on server start.

CREATE TABLE IF NOT EXISTS deposit_codes (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  id_number  TEXT    NOT NULL,
  code       TEXT    NOT NULL,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
