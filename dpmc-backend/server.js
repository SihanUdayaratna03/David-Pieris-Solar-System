const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const codesRouter = require('./routes/codes');

const app = express();
app.use(cors());
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'DPMC Backend running' });
});

app.use('/api/codes', codesRouter);

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅  Server running on http://localhost:${PORT}`);
});