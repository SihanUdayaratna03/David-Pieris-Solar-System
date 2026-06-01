import React from 'react';
import { Sun, Zap, ShieldCheck } from 'lucide-react';

export default function PreviewCard() {
  return (
    <div className="relative">
      <div style={{ position: 'absolute', inset: 0, zIndex: -10, borderRadius: '2rem', background: 'hsl(var(--brand))', opacity: 0.2, filter: 'blur(3rem)' }}></div>
      <div className="bg-glass shadow-brand" style={{ borderRadius: '2rem', padding: '2rem' }}>
        <div className="flex-between">
          <img src="https://codify-person.lovable.app/__l5e/assets-v1/5bb3712f-2c20-4403-92f0-2c72013fdd46/dp-logo.png" alt="DP Logo" style={{ height: '2.5rem' }} />
          <Sun size={32} className="animate-spin-slow" style={{ color: 'hsl(var(--brand))' }} />
        </div>
        <div className="mt-8" style={{ borderRadius: '1rem', border: '1px solid hsl(var(--border))', background: 'hsla(var(--background), 0.6)', padding: '1.5rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'hsl(var(--muted-foreground))' }}>Preview</p>
          <div className="mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="flex-between" style={{ borderBottom: '1px dashed hsl(var(--border))', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'hsl(var(--muted-foreground))' }}>Name</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.875rem', fontWeight: 600 }}>Sihan</span>
            </div>
            <div className="flex-between" style={{ borderBottom: '1px dashed hsl(var(--border))', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'hsl(var(--muted-foreground))' }}>ID</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.875rem', fontWeight: 600 }}>200434100891</span>
            </div>
          </div>
          <div className="mt-6 bg-gradient-brand shadow-soft" style={{ borderRadius: '0.75rem', padding: '1.25rem', color: 'hsl(var(--primary-foreground))' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>Deposit Code</p>
            <p className="mt-4" style={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.025em' }}>Sihan00891</p>
          </div>
        </div>
        <div className="mt-6 grid-cols-3 gap-4" style={{ textAlign: 'center' }}>
          <div style={{ borderRadius: '0.75rem', border: '1px solid hsl(var(--border))', background: 'hsla(var(--background), 0.7)', padding: '0.75rem' }}>
            <Zap size={20} style={{ margin: '0 auto', color: 'hsl(var(--foreground))' }} />
            <p className="mt-4" style={{ fontSize: '0.75rem', fontWeight: 500, color: 'hsl(var(--muted-foreground))' }}>Instant</p>
          </div>
          <div style={{ borderRadius: '0.75rem', border: '1px solid hsl(var(--border))', background: 'hsla(var(--background), 0.7)', padding: '0.75rem' }}>
            <ShieldCheck size={20} style={{ margin: '0 auto', color: 'hsl(var(--foreground))' }} />
            <p className="mt-4" style={{ fontSize: '0.75rem', fontWeight: 500, color: 'hsl(var(--muted-foreground))' }}>Verified</p>
          </div>
          <div style={{ borderRadius: '0.75rem', border: '1px solid hsl(var(--border))', background: 'hsla(var(--background), 0.7)', padding: '0.75rem' }}>
            <Sun size={20} style={{ margin: '0 auto', color: 'hsl(var(--foreground))' }} />
            <p className="mt-4" style={{ fontSize: '0.75rem', fontWeight: 500, color: 'hsl(var(--muted-foreground))' }}>Solar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
