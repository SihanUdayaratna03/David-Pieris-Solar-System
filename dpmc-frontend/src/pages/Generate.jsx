import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Copy, Check, Plus, AlertCircle, Trash2, RefreshCw,
  Database, Printer, Search, X, ChevronDown, ChevronUp,
} from 'lucide-react';
import Barcode from '../components/Barcode';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export default function Generate() {
  const [name, setName]         = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [error, setError]       = useState('');

  const [records, setRecords]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [apiError, setApiError]       = useState('');
  const [copiedId, setCopiedId]       = useState(null);
  const [deletingId, setDeletingId]   = useState(null);
  const [generatedRecord, setGeneratedRecord] = useState(null);

  // Search & sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField]     = useState('created_at');
  const [sortDir, setSortDir]         = useState('desc');

  const printRef = useRef(null);

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
      setApiError('Could not load records. Is the backend running on port 5000?');
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
      setGeneratedRecord(saved);
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
    if (!window.confirm('Are you sure you want to delete this record? This cannot be undone.')) return;
    setDeletingId(id);
    setApiError('');
    try {
      const res = await fetch(`${API_BASE}/codes/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Failed to delete.');
      }
      setRecords(prev => prev.filter(r => r.id !== id));
      if (generatedRecord?.id === id) setGeneratedRecord(null);
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

  // ── Print receipt ────────────────────────────────────────────────────────────
  const handlePrint = () => {
    const content = printRef.current?.innerHTML;
    if (!content) return;
    const win = window.open('', '_blank', 'width=480,height=640');
    win.document.write(`
      <html>
        <head>
          <title>Deposit Receipt — ${generatedRecord?.code}</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Arial', sans-serif; padding: 2rem; color: #111; }
            .receipt { max-width: 400px; margin: 0 auto; }
            .receipt-header { text-align: center; border-bottom: 2px dashed #ddd; padding-bottom: 1rem; margin-bottom: 1.5rem; }
            .receipt-header img { height: 48px; margin-bottom: 0.5rem; }
            .receipt-header h2 { font-size: 1rem; color: #1a5fb4; }
            .receipt-header p  { font-size: 0.75rem; color: #64748b; margin-top: 0.25rem; }
            .receipt-row { display: flex; justify-content: space-between; margin-bottom: 0.75rem; font-size: 0.875rem; }
            .receipt-row span:first-child { color: #64748b; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; font-weight: 600; }
            .receipt-row span:last-child  { font-weight: 600; font-family: monospace; }
            .code-box { text-align: center; border: 2px dashed #1a5fb4; border-radius: 0.5rem; padding: 1.5rem 1rem; margin: 1.5rem 0; }
            .code-box p.label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: 600; margin-bottom: 0.5rem; }
            .code-box p.code  { font-size: 2rem; font-weight: 800; font-family: monospace; color: #1a5fb4; letter-spacing: 2px; }
            .footer-note { text-align: center; font-size: 0.7rem; color: #94a3b8; border-top: 1px dashed #ddd; padding-top: 1rem; margin-top: 1.5rem; }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 400);
  };

  // ── Format date nicely ───────────────────────────────────────────────────────
  const formatDate = (iso) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      + ' · '
      + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  // ── Filter + sort records ────────────────────────────────────────────────────
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const filteredRecords = records
    .filter(r => {
      const q = searchQuery.toLowerCase();
      return !q || r.name.toLowerCase().includes(q) || r.code.toLowerCase().includes(q) || r.id_number.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      const va = a[sortField] ?? '';
      const vb = b[sortField] ?? '';
      const cmp = va < vb ? -1 : va > vb ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortDir === 'asc'
      ? <ChevronUp size={12} style={{ marginLeft: 2, display: 'inline' }} />
      : <ChevronDown size={12} style={{ marginLeft: 2, display: 'inline' }} />;
  };

  // ── Hidden print receipt template ────────────────────────────────────────────
  const PrintReceipt = ({ record }) => (
    <div className="receipt">
      <div className="receipt-header">
        <img
          src="https://codify-person.lovable.app/__l5e/assets-v1/5bb3712f-2c20-4403-92f0-2c72013fdd46/dp-logo.png"
          alt="David Pieris Solar Energy"
        />
        <h2>David Pieris Solar Energy</h2>
        <p>Deposit Reference Receipt</p>
      </div>
      <div className="receipt-row">
        <span>Depositor</span>
        <span>{record.name}</span>
      </div>
      <div className="receipt-row">
        <span>National ID</span>
        <span>{record.id_number}</span>
      </div>
      <div className="receipt-row">
        <span>Record ID</span>
        <span>#{record.id}</span>
      </div>
      <div className="receipt-row">
        <span>Generated At</span>
        <span>{formatDate(record.created_at)}</span>
      </div>
      <div className="code-box">
        <p className="label">Deposit Code</p>
        <p className="code">{record.code}</p>
      </div>
      <p className="footer-note">
        This receipt is generated by the DPMC Internal Deposit System.<br/>
        For internal use only — David Pieris Solar Energy.
      </p>
    </div>
  );

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', backgroundColor: 'hsla(var(--destructive), 0.1)', color: 'hsl(var(--destructive))', borderRadius: 'var(--radius)', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 500, border: '1px solid hsla(var(--destructive), 0.2)' }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          {apiError}
          <button
            onClick={() => setApiError('')}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, display: 'flex', alignItems: 'center' }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="main-grid">

        {/* ── Left Column: Form or Result Display ───────────────────────────────── */}
        <div className="table-card" style={{ padding: '2rem' }}>
          {generatedRecord ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              {/* Success icon */}
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                border: '2px solid rgba(46,125,50,0.25)',
                color: '#2e7d32', display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: '1rem',
                boxShadow: '0 4px 16px rgba(46,125,50,0.15)',
                animation: 'scale-in 0.4s ease both',
              }}>
                <Check size={28} />
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.35rem 0', color: 'hsl(var(--foreground))' }}>
                Code Generated!
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
                Depositor: <strong style={{ color: 'hsl(var(--foreground))' }}>{generatedRecord.name}</strong><br />
                National ID: <span style={{ fontFamily: 'monospace', background: 'hsl(var(--muted))', padding: '0.1rem 0.4rem', borderRadius: '0.25rem' }}>{generatedRecord.id_number}</span>
              </p>

              {/* Big Visual Code Box */}
              <div style={{
                width: '100%',
                background: 'linear-gradient(135deg, rgba(26,95,180,0.04) 0%, rgba(46,125,50,0.04) 100%)',
                border: '1.5px dashed rgba(26,95,180,0.3)',
                borderRadius: 'var(--radius)',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'hsl(var(--muted-foreground))', fontWeight: 700 }}>
                  Tracking Code
                </span>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'monospace', color: 'hsl(var(--primary))', letterSpacing: '3px' }}>
                  {generatedRecord.code}
                </div>
                <div style={{ padding: '0.625rem', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid hsl(var(--border))', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <Barcode value={generatedRecord.code} height={48} width={1.5} />
                </div>
                <span style={{ fontSize: '0.7rem', color: 'hsl(var(--muted-foreground))' }}>
                  Record #{generatedRecord.id} · {formatDate(generatedRecord.created_at)}
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', width: '100%', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', minWidth: '110px' }}
                  onClick={() => handleCopy(generatedRecord.code, 'new')}
                >
                  {copiedId === 'new' ? <><Check size={15} /> Copied!</> : <><Copy size={15} /> Copy Code</>}
                </button>
                <button
                  type="button"
                  id="btn-print-receipt"
                  className="btn btn-outline"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', minWidth: '110px' }}
                  onClick={handlePrint}
                >
                  <Printer size={15} /> Print
                </button>
                <button
                  type="button"
                  id="btn-generate-another"
                  className="btn btn-primary"
                  style={{ flex: 2, minWidth: '130px' }}
                  onClick={() => setGeneratedRecord(null)}
                >
                  Generate Another
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: 'hsl(var(--foreground))' }}>
                Generate New Code
              </h2>

              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: 'hsla(var(--destructive), 0.08)', border: '1px solid hsla(var(--destructive), 0.2)', color: 'hsl(var(--destructive))', borderRadius: 'var(--radius)', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  {error}
                </div>
              )}

              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label className="label" htmlFor="input-name">
                    Depositor Full Name <span style={{ color: 'hsl(var(--destructive))' }}>*</span>
                  </label>
                  <input
                    id="input-name"
                    type="text"
                    className={`input ${error && !name.trim() ? 'error' : ''}`}
                    placeholder="e.g. Kamal Perera"
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (error) setError(''); }}
                    disabled={saving}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="label" htmlFor="input-id">
                    National ID / Passport <span style={{ color: 'hsl(var(--destructive))' }}>*</span>
                  </label>
                  <input
                    id="input-id"
                    type="text"
                    className={`input ${error && idNumber.replace(/[^a-zA-Z0-9]/g, '').length < 5 ? 'error' : ''}`}
                    placeholder="e.g. 200434100891"
                    value={idNumber}
                    onChange={(e) => { setIdNumber(e.target.value); if (error) setError(''); }}
                    disabled={saving}
                    autoComplete="off"
                  />
                  <p style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.375rem' }}>
                    Must be at least 5 characters. The last 5 digits form part of the code.
                  </p>
                </div>

                {/* Live preview */}
                {name.trim() && idNumber.replace(/[^a-zA-Z0-9]/g, '').length >= 5 && (
                  <div style={{
                    padding: '0.875rem 1rem',
                    background: 'linear-gradient(135deg, rgba(26,95,180,0.05), rgba(26,95,180,0.02))',
                    border: '1px dashed rgba(26,95,180,0.25)',
                    borderRadius: 'var(--radius)',
                    animation: 'fade-in-up 0.25s ease both',
                  }}>
                    <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(var(--muted-foreground))', fontWeight: 700, marginBottom: '0.375rem' }}>
                      Code Preview
                    </p>
                    <p style={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 800, color: 'hsl(var(--primary))', letterSpacing: '2px', margin: 0 }}>
                      {name.trim().split(' ')[0]}{idNumber.replace(/[^a-zA-Z0-9]/g, '').slice(-5)}
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                  <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={handleClearForm} disabled={saving}>
                    Clear
                  </button>
                  <button
                    id="btn-generate"
                    type="submit"
                    className="btn btn-primary"
                    style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    disabled={saving}
                  >
                    {saving
                      ? <><RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Saving…</>
                      : <><Plus size={18} /> Generate &amp; Save</>}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* ── Records Table ─────────────────────────────────────────────────── */}
        <div className="table-card">
          {/* Table header */}
          <div className="flex-between" style={{ marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Database size={16} style={{ color: 'hsl(var(--muted-foreground))' }} />
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>All Saved Records</h2>
              <span style={{ fontSize: '0.7rem', color: 'hsl(var(--muted-foreground))', background: 'hsl(var(--muted))', padding: '0.2rem 0.55rem', borderRadius: '9999px', fontWeight: 600 }}>
                {filteredRecords.length}{searchQuery ? ` / ${records.length}` : ''}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                id="btn-refresh"
                onClick={fetchRecords}
                disabled={loading}
                title="Refresh from database"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(var(--muted-foreground))', padding: '0.25rem', display: 'flex', alignItems: 'center', borderRadius: '0.375rem' }}
              >
                <RefreshCw size={15} style={loading ? { animation: 'spin 1s linear infinite' } : {}} />
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))', pointerEvents: 'none' }} />
            <input
              id="input-search"
              type="text"
              className="input"
              placeholder="Search by name, code, or ID…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.25rem', paddingRight: searchQuery ? '2.25rem' : '0.75rem' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(var(--muted-foreground))', display: 'flex', alignItems: 'center', padding: '0.1rem' }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'hsl(var(--muted-foreground))' }}>
              <RefreshCw size={24} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 0.75rem', display: 'block' }} />
              <p style={{ fontSize: '0.875rem' }}>Loading records…</p>
            </div>
          ) : records.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'hsl(var(--muted-foreground))', border: '1.5px dashed hsl(var(--border))', borderRadius: 'var(--radius)', background: 'hsl(var(--muted))' }}>
              <Database size={36} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.375rem' }}>No records yet</p>
              <p style={{ fontSize: '0.8125rem' }}>Generated codes will be stored here permanently.</p>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'hsl(var(--muted-foreground))', border: '1px dashed hsl(var(--border))', borderRadius: 'var(--radius)' }}>
              <Search size={28} style={{ margin: '0 auto 0.75rem', opacity: 0.3 }} />
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>No results for &ldquo;{searchQuery}&rdquo;</p>
              <button className="btn btn-outline" style={{ marginTop: '0.75rem', fontSize: '0.8rem' }} onClick={() => setSearchQuery('')}>
                Clear search
              </button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="table-large">
                <thead>
                  <tr>
                    <th style={{ width: '2.5rem', cursor: 'pointer' }} onClick={() => handleSort('id')}>
                      # <SortIcon field="id" />
                    </th>
                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('name')}>
                      Name <SortIcon field="name" />
                    </th>
                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('code')}>
                      Code <SortIcon field="code" />
                    </th>
                    <th style={{ cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => handleSort('created_at')}>
                      Saved At <SortIcon field="created_at" />
                    </th>
                    <th style={{ width: '5.5rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.id} style={{ transition: 'background 0.15s' }}>
                      <td style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.75rem', fontWeight: 500 }}>{record.id}</td>
                      <td style={{ fontWeight: 600 }}>{record.name}
                        <div style={{ fontSize: '0.7rem', color: 'hsl(var(--muted-foreground))', fontWeight: 400, marginTop: '0.1rem', fontFamily: 'monospace' }}>{record.id_number}</div>
                      </td>
                      <td>
                        <code style={{
                          fontSize: '0.9rem', padding: '0.25rem 0.6rem',
                          background: 'hsla(var(--primary), 0.08)',
                          color: 'hsl(var(--primary))',
                          borderRadius: '0.25rem',
                          fontFamily: 'monospace', fontWeight: 700,
                          border: '1px solid hsla(var(--primary), 0.15)',
                        }}>
                          {record.code}
                        </code>
                      </td>
                      <td style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                        {formatDate(record.created_at)}
                      </td>
                      <td>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.125rem' }}>
                          {/* Copy button */}
                          <button
                            onClick={() => handleCopy(record.code, record.id)}
                            title="Copy code"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: copiedId === record.id ? '#2e7d32' : 'hsl(var(--muted-foreground))', padding: '0.375rem', display: 'flex', alignItems: 'center', borderRadius: '0.375rem', transition: 'color 0.15s' }}
                          >
                            {copiedId === record.id ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                          {/* Delete button */}
                          <button
                            onClick={() => handleDelete(record.id)}
                            disabled={deletingId === record.id}
                            title="Delete record"
                            style={{ background: 'none', border: 'none', cursor: deletingId === record.id ? 'not-allowed' : 'pointer', color: 'hsl(var(--destructive))', padding: '0.375rem', display: 'flex', alignItems: 'center', opacity: deletingId === record.id ? 0.5 : 1, borderRadius: '0.375rem' }}
                          >
                            {deletingId === record.id
                              ? <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} />
                              : <Trash2 size={14} />}
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

      {/* Hidden print template */}
      {generatedRecord && (
        <div ref={printRef} style={{ display: 'none' }}>
          <PrintReceipt record={generatedRecord} />
        </div>
      )}

    </div>
  );
}
