const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const codesRouter = require('./routes/codes');

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
// Allow requests from common local dev ports and production origins.
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
  ...(process.env.ALLOWED_ORIGIN ? [process.env.ALLOWED_ORIGIN] : []),
];

app.use(cors({
  origin: (origin, cb) => {
    // Allow non-browser requests (curl, Postman, server-to-server)
    if (!origin) return cb(null, true);
    
    // Allow all local development origins on localhost / 127.0.0.1 (any port)
    const isLocal = origin.startsWith('http://localhost:') || 
                    origin.startsWith('http://127.0.0.1:') || 
                    origin === 'http://localhost' || 
                    origin === 'http://127.0.0.1';
                    
    if (isLocal || allowedOrigins.includes(origin)) {
      return cb(null, true);
    }
    
    cb(new Error(`CORS: origin "${origin}" not allowed.`));
  },
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status:  'ok',
    message: 'DPMC Backend is running',
    version: '1.0.0',
    time:    new Date().toISOString(),
  });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/codes', codesRouter);

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

// ─── Global error handler ────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error.' });
});

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅  Server running  → http://localhost:${PORT}`);
  console.log(`📋  Health check   → http://localhost:${PORT}/`);
  console.log(`🗃️   Codes API      → http://localhost:${PORT}/api/codes`);
});