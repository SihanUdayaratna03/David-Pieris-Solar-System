const express = require('express');
const router  = express.Router();
const db      = require('../db');

// ─── Prepared Statements (faster than ad-hoc queries) ─────────────────────────
const insertCode  = db.prepare('INSERT INTO deposit_codes (name, id_number, code) VALUES (?, ?, ?)');
const selectAll   = db.prepare('SELECT * FROM deposit_codes ORDER BY created_at DESC');
const selectById  = db.prepare('SELECT * FROM deposit_codes WHERE id = ?');
const deleteById  = db.prepare('DELETE FROM deposit_codes WHERE id = ?');

// ─── POST /api/codes ──────────────────────────────────────────────────────────
// Save a new deposit code record to the database.
router.post('/', (req, res) => {
  const { name, id_number, code } = req.body;

  if (!name || !id_number || !code) {
    return res.status(400).json({ error: 'name, id_number, and code are required.' });
  }

  try {
    const result = insertCode.run(name.trim(), id_number.trim(), code.trim());
    const saved  = selectById.get(result.lastInsertRowid);
    res.status(201).json(saved);
  } catch (err) {
    console.error('POST /api/codes error:', err.message);
    res.status(500).json({ error: 'Failed to save record.' });
  }
});

// ─── GET /api/codes ───────────────────────────────────────────────────────────
// Retrieve all deposit code records, newest first.
router.get('/', (req, res) => {
  try {
    const rows = selectAll.all();
    res.json(rows);
  } catch (err) {
    console.error('GET /api/codes error:', err.message);
    res.status(500).json({ error: 'Failed to fetch records.' });
  }
});

// ─── GET /api/codes/:id ───────────────────────────────────────────────────────
// Retrieve a single deposit code record by its ID.
router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID must be a number.' });
  }

  try {
    const row = selectById.get(id);
    if (!row) {
      return res.status(404).json({ error: 'Record not found.' });
    }
    res.json(row);
  } catch (err) {
    console.error(`GET /api/codes/${id} error:`, err.message);
    res.status(500).json({ error: 'Failed to fetch record.' });
  }
});

// ─── DELETE /api/codes/:id ────────────────────────────────────────────────────
// Delete a deposit code record by its ID.
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID must be a number.' });
  }

  try {
    const row = selectById.get(id);
    if (!row) {
      return res.status(404).json({ error: 'Record not found.' });
    }
    deleteById.run(id);
    res.json({ message: 'Record deleted.', deleted: row });
  } catch (err) {
    console.error(`DELETE /api/codes/${id} error:`, err.message);
    res.status(500).json({ error: 'Failed to delete record.' });
  }
});

module.exports = router;
