import React, { useState } from 'react';
import { Copy, Check, Plus, AlertCircle } from 'lucide-react';

export default function Generate() {
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [error, setError] = useState('');
  
  const [history, setHistory] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleGenerate = (e) => {
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
    
    // Logic: FirstName + last 5 characters of ID
    const firstName = name.trim().split(' ')[0];
    const last5 = cleanId.slice(-5);
    const generatedCode = `${firstName}${last5}`;
    
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      name: name.trim(),
      idNumber: idNumber.trim(),
      code: generatedCode
    };

    setHistory([newEntry, ...history]);
    
    // Clear form for next entry
    setName('');
    setIdNumber('');
  };

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClearForm = () => {
    setName('');
    setIdNumber('');
    setError('');
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'hsl(var(--foreground))', margin: 0 }}>Deposit Code Generator</h1>
        <p style={{ marginTop: '0.5rem', color: 'hsl(var(--muted-foreground))' }}>Enter the customer's details to generate a unique tracking code.</p>
      </div>

      <div className="grid-cols-2" style={{ gap: '2rem', alignItems: 'flex-start' }}>
        {/* Form Section */}
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
                type="text" 
                className={`input ${error && !name.trim() ? 'error' : ''}`} 
                placeholder="e.g. Sihan Perera" 
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>
            <div>
              <label className="label">National ID Number <span style={{ color: 'hsl(var(--destructive))' }}>*</span></label>
              <input 
                type="text" 
                className={`input ${error && idNumber.length < 5 ? 'error' : ''}`} 
                placeholder="e.g. 200434100891" 
                value={idNumber}
                onChange={(e) => {
                  setIdNumber(e.target.value);
                  if (error) setError('');
                }}
              />
              <p style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>Must be a valid National ID.</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={handleClearForm}>
                Clear
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                <Plus size={18} /> Generate Code
              </button>
            </div>
          </form>
        </div>

        {/* History Section */}
        <div className="card shadow-sm" style={{ padding: '1.5rem' }}>
          <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Recent Codes (Current Session)</h2>
            <span style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', backgroundColor: 'hsl(var(--muted))', padding: '0.25rem 0.5rem', borderRadius: '9999px' }}>
              {history.length} items
            </span>
          </div>

          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'hsl(var(--muted-foreground))', border: '1px dashed hsl(var(--border))', borderRadius: 'var(--radius)' }}>
              <p style={{ fontSize: '0.875rem' }}>No codes generated yet.</p>
              <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Generated codes will appear here.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th style={{ width: '4rem' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry, index) => (
                    <tr key={entry.id}>
                      <td style={{ color: 'hsl(var(--muted-foreground))' }}>{entry.timestamp}</td>
                      <td style={{ fontWeight: 500 }}>{entry.name.split(' ')[0]}</td>
                      <td>
                        <code style={{ fontSize: '0.875rem', padding: '0.25rem 0.5rem', backgroundColor: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', borderRadius: '0.25rem' }}>
                          {entry.code}
                        </code>
                      </td>
                      <td>
                        <button 
                          onClick={() => handleCopy(entry.code, index)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: copiedIndex === index ? 'hsl(var(--secondary))' : 'hsl(var(--muted-foreground))', padding: '0.25rem' }}
                          title="Copy to clipboard"
                        >
                          {copiedIndex === index ? <Check size={16} /> : <Copy size={16} />}
                        </button>
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
