-- queries.sql
-- Reference queries used by the Express API routes.

-- Save a new deposit code record
INSERT INTO deposit_codes (name, id_number, code)
VALUES ($1, $2, $3)
RETURNING *;

-- Get all records, newest first
SELECT * FROM deposit_codes ORDER BY created_at DESC;

-- Get a single record by ID
SELECT * FROM deposit_codes WHERE id = $1;

-- Delete a record by ID
DELETE FROM deposit_codes WHERE id = $1 RETURNING *;
