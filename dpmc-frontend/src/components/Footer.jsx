import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid rgba(26,95,180,0.1)',
      backgroundColor: 'rgba(255,255,255,0.92)',
      padding: '1.125rem 0',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      <div className="container flex-between" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>

        {/* Left: Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <img
            src="https://codify-person.lovable.app/__l5e/assets-v1/5bb3712f-2c20-4403-92f0-2c72013fdd46/dp-logo.png"
            alt="David Pieris Solar Energy"
            style={{ height: '1.375rem', opacity: 0.7 }}
          />
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>
            © {year} David Pieris Solar Energy. All rights reserved.
          </span>
        </div>

        {/* Right: Links + badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <nav style={{ display: 'flex', gap: '1.25rem' }}>
            <Link
              to="/"
              style={{ fontSize: '0.8rem', color: '#94a3b8', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#1a5fb4'}
              onMouseLeave={e => e.target.style.color = '#94a3b8'}
            >
              Dashboard
            </Link>
            <Link
              to="/generate"
              style={{ fontSize: '0.8rem', color: '#94a3b8', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#1a5fb4'}
              onMouseLeave={e => e.target.style.color = '#94a3b8'}
            >
              Generator
            </Link>
          </nav>
          <span style={{
            fontSize: '0.6875rem', color: '#64748b', fontWeight: 600,
            background: 'rgba(26,95,180,0.07)',
            border: '1px solid rgba(26,95,180,0.12)',
            padding: '0.2rem 0.625rem',
            borderRadius: '9999px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            Internal Use Only
          </span>
        </div>

      </div>
    </footer>
  );
}
