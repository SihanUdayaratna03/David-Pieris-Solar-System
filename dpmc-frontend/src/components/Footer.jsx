import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(26,95,180,0.1)',
      backgroundColor: 'rgba(255,255,255,0.9)',
      padding: '1.25rem 0',
      backdropFilter: 'blur(8px)',
    }}>
      <div className="container flex-between" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <img
            src="https://codify-person.lovable.app/__l5e/assets-v1/5bb3712f-2c20-4403-92f0-2c72013fdd46/dp-logo.png"
            alt="DP Logo"
            style={{ height: '1.5rem' }}
          />
          <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
            © {new Date().getFullYear()} David Pieris Solar Energy. All rights reserved.
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 500 }}>
          Internal Use Only
        </span>
      </div>
    </footer>
  );
}
