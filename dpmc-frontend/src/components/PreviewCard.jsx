import React from 'react';
import { Sun, Zap, ShieldCheck, Database } from 'lucide-react';

export default function PreviewCard() {
  return (
    <div className="relative" style={{ position: 'relative' }}>
      {/* Glow behind card */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: -1,
        borderRadius: '2rem',
        background: 'hsl(var(--primary))',
        opacity: 0.15,
        filter: 'blur(40px)',
        transform: 'scale(0.9) translateY(12px)',
      }} />

      {/* Card */}
      <div className="bg-glass shadow-brand" style={{ borderRadius: '1.5rem', padding: '1.75rem', minWidth: '280px' }}>

        {/* Header row */}
        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
          <img
            src="https://codify-person.lovable.app/__l5e/assets-v1/5bb3712f-2c20-4403-92f0-2c72013fdd46/dp-logo.png"
            alt="DP Logo"
            style={{ height: '2.25rem' }}
          />
          <Sun size={28} className="animate-spin-slow" style={{ color: '#1a5fb4', opacity: 0.7 }} />
        </div>

        {/* Preview fields */}
        <div style={{
          borderRadius: '0.875rem',
          border: '1px solid rgba(26,95,180,0.12)',
          background: 'rgba(255,255,255,0.6)',
          padding: '1.25rem',
          marginBottom: '1.25rem',
        }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'hsl(var(--muted-foreground))', marginBottom: '1rem' }}>
            Preview
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <div className="flex-between" style={{ borderBottom: '1px dashed hsl(var(--border))', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'hsl(var(--muted-foreground))', fontWeight: 600 }}>Name</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.875rem', fontWeight: 700 }}>Sihan</span>
            </div>
            <div className="flex-between" style={{ borderBottom: '1px dashed hsl(var(--border))', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'hsl(var(--muted-foreground))', fontWeight: 600 }}>ID</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem', fontWeight: 600, color: 'hsl(var(--muted-foreground))' }}>···00891</span>
            </div>
          </div>

          {/* Generated code display */}
          <div className="bg-gradient-brand shadow-soft" style={{
            borderRadius: '0.75rem',
            padding: '1rem',
            marginTop: '1rem',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8, marginBottom: '0.375rem' }}>
              Deposit Code
            </p>
            <p style={{ fontFamily: 'monospace', fontSize: '1.625rem', fontWeight: 800, letterSpacing: '3px', margin: 0 }}>
              Sihan00891
            </p>
          </div>
        </div>

        {/* Feature badges */}
        <div className="grid-cols-3 gap-4">
          {[
            { icon: <Zap size={16} />,         label: 'Instant',   color: '#1a5fb4' },
            { icon: <ShieldCheck size={16} />,  label: 'Verified',  color: '#2e7d32' },
            { icon: <Database size={16} />,     label: 'Stored',    color: '#1a5fb4' },
          ].map(({ icon, label, color }) => (
            <div key={label} style={{
              borderRadius: '0.625rem',
              border: '1px solid rgba(26,95,180,0.1)',
              background: 'rgba(255,255,255,0.65)',
              padding: '0.625rem 0.375rem',
              textAlign: 'center',
            }}>
              <div style={{ color, display: 'flex', justifyContent: 'center', marginBottom: '0.3rem' }}>{icon}</div>
              <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'hsl(var(--muted-foreground))', margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
