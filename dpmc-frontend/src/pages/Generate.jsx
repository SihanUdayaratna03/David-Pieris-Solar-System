import React, { useState, useEffect, useCallback } from 'react';
import { Copy, Check, Plus, AlertCircle, Trash2, RefreshCw, Database } from 'lucide-react';
import Barcode from '../components/Barcode';

const API_BASE = 'http://localhost:5000/api';

export default function Generate() {
  const [name, setName]         = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [error, setError]       = useState('');

  const [records, setRecords]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [apiError, setApiError]     = useState('');
  const [copiedId, setCopiedId]     = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // ── Fetch all saved records from the DB ─────────────────────────────────────
  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setApiError('');
    try {
      const res = await fetch(`${API_BASE}/codes`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      setApiError('Could not load records. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRecords(); }, [fetchRecords]);

  // ── Generate + save a new code ───────────────────────────────────────────────
  const handleGenerate = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Depositor Name is required.');
      return;
    }
    const cleanId = idNumber.replace(/[^a-zA-Z0-9]/g, '');
    if (cleanId.length < 5) {
      setError('National ID must be at least 5 characters long.');
      return;
    }

    const firstName    = name.trim().split(' ')[0];
    const last5        = cleanId.slice(-5);
    const generatedCode = `${firstName}${last5}`;

    setSaving(true);
    setApiError('');
    try {
      const res = await fetch(`${API_BASE}/codes`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: name.trim(), id_number: idNumber.trim(), code: generatedCode }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Failed to save.');
      }
      const saved = await res.json();
      setRecords(prev => [saved, ...prev]);
      setName('');
      setIdNumber('');
    } catch (err) {
      setApiError(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // ── Delete a record ──────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    setDeletingId(id);
    setApiError('');
    try {
      const res = await fetch(`${API_BASE}/codes/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Failed to delete.');
      }
      setRecords(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      setApiError(`Delete failed: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // ── Copy code to clipboard ───────────────────────────────────────────────────
  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearForm = () => { setName(''); setIdNumber(''); setError(''); };

  // ── Format date nicely ───────────────────────────────────────────────────────
  const formatDate = (iso) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      + ' · '
      + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>

      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'hsl(var(--foreground))', margin: 0 }}>
          Deposit Code Generator
        </h1>
        <p style={{ marginTop: '0.5rem', color: 'hsl(var(--muted-foreground))' }}>
          Enter the customer's details to generate and save a unique tracking code.
        </p>
      </div>

      {/* Global API error banner */}
      {apiError && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', backgroundColor: 'hsla(var(--destructive), 0.1)', color: 'hsl(var(--destructive))', borderRadius: 'var(--radius)', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          {apiError}
        </div>
      )}

      <div className="grid-cols-2" style={{ gap: '2rem', alignItems: 'flex-start' }}>

        {/* ── Form ───────────────────────────────────────────────────────────── */}
        <div className="card shadow-sm" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '0 0 1.5rem 0' }}>Generate New Code</h2>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', backgroundColor: 'hsla(var(--destructive), 0.1)', color: 'hsl(var(--destructive))', borderRadius: 'var(--radius)', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label className="label">Depositor Full Name <span style={{ color: 'hsl(var(--destructive))' }}>*</span></label>
              <input
                id="input-name"
                type="text"
                className={`input ${error && !name.trim() ? 'error' : ''}`}
                placeholder=""
                value={name}
                onChange={(e) => { setName(e.target.value); if (error) setError(''); }}
                disabled={saving}
              />
            </div>
            <div>
              <label className="label">National ID Number <span style={{ color: 'hsl(var(--destructive))' }}>*</span></label>
              <input
                id="input-id"
                type="text"
                className={`input ${error && idNumber.length < 5 ? 'error' : ''}`}
                placeholder=""
                value={idNumber}
                onChange={(e) => { setIdNumber(e.target.value); if (error) setError(''); }}
                disabled={saving}
              />
              <p style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>
                Must be a valid National ID (at least 5 characters).
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={handleClearForm} disabled={saving}>
                Clear
              </button>
              <button id="btn-generate" type="submit" className="btn btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} disabled={saving}>
                {saving
                  ? <><RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Saving…</>
                  : <><Plus size={18} /> Generate &amp; Save</>}
              </button>
            </div>
          </form>
        </div>

        {/* ── Records Table ─────────────────────────────────────────────────── */}
        <div className="card shadow-sm" style={{ padding: '1.5rem' }}>
          <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Database size={16} style={{ color: 'hsl(var(--muted-foreground))' }} />
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>All Saved Records</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', backgroundColor: 'hsl(var(--muted))', padding: '0.25rem 0.5rem', borderRadius: '9999px' }}>
                {records.length} records
              </span>
              <button
                id="btn-refresh"
                onClick={fetchRecords}
                disabled={loading}
                title="Refresh from database"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(var(--muted-foreground))', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
              >
                <RefreshCw size={15} style={loading ? { animation: 'spin 1s linear infinite' } : {}} />
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'hsl(var(--muted-foreground))' }}>
              <RefreshCw size={24} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 0.75rem' }} />
              <p style={{ fontSize: '0.875rem' }}>Loading records…</p>
            </div>
          ) : records.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'hsl(var(--muted-foreground))', border: '1px dashed hsl(var(--border))', borderRadius: 'var(--radius)' }}>
              <p style={{ fontSize: '0.875rem' }}>No records saved yet.</p>
              <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Generated codes will be stored here permanently.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: '3rem' }}>#</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Saved At</th>
                    <th style={{ width: '5rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id}>
                      <td style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.75rem' }}>{record.id}</td>
                      <td style={{ fontWeight: 500 }}>{record.name}</td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-start' }}>
                          <code style={{ fontSize: '0.875rem', padding: '0.25rem 0.5rem', backgroundColor: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', borderRadius: '0.25rem', fontFamily: 'monospace', fontWeight: 600 }}>
                            {record.code}
                          </code>
                          <Barcode value={record.code} height={24} width={1.0} />
                        </div>
                      </td>
                      <td style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                        {formatDate(record.created_at)}
                      </td>
                      <td>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.25rem' }}>
                          {/* Copy button */}
                          <button
                            onClick={() => handleCopy(record.code, record.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: copiedId === record.id ? 'hsl(var(--secondary))' : 'hsl(var(--muted-foreground))', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
                            title="Copy code"
                          >
                            {copiedId === record.id ? <Check size={15} /> : <Copy size={15} />}
                          </button>
                          {/* Delete button */}
                          <button
                            onClick={() => handleDelete(record.id)}
                            disabled={deletingId === record.id}
                            style={{ background: 'none', border: 'none', cursor: deletingId === record.id ? 'not-allowed' : 'pointer', color: 'hsl(var(--destructive))', padding: '0.25rem', display: 'flex', alignItems: 'center', opacity: deletingId === record.id ? 0.5 : 1 }}
                            title="Delete record"
                          >
                            {deletingId === record.id
                              ? <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                              : <Trash2 size={15} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

