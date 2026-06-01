import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wand2 } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      width: '100%',
      borderBottom: '1px solid rgba(26,95,180,0.1)',
      backgroundColor: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
    }}>
      <div className="container flex-between" style={{ height: '4rem' }}>

        {/* Logo + Title */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', textDecoration: 'none' }}>
          <img
            src="https://codify-person.lovable.app/__l5e/assets-v1/5bb3712f-2c20-4403-92f0-2c72013fdd46/dp-logo.png"
            alt="David Pieris Logo"
            style={{ height: '2.25rem', width: 'auto' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1a5fb4' }}>David Pieris</span>
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#2e7d32', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Solar Energy</span>
          </div>
          <span style={{ width: '1px', height: '1.75rem', background: 'rgba(26,95,180,0.15)', margin: '0 0.25rem' }}></span>
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#64748b' }}>Deposit System</span>
        </Link>

        {/* Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 0.875rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s',
              color: isActive('/') ? '#1a5fb4' : '#64748b',
              background: isActive('/') ? 'rgba(26,95,180,0.08)' : 'transparent',
            }}
          >
            <LayoutDashboard size={15} />
            Dashboard
          </Link>
          <Link
            to="/generate"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 0.875rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s',
              color: isActive('/generate') ? '#fff' : '#64748b',
              background: isActive('/generate') ? '#1a5fb4' : 'transparent',
              boxShadow: isActive('/generate') ? '0 2px 8px rgba(26,95,180,0.25)' : 'none',
            }}
          >
            <Wand2 size={15} />
            Generator
          </Link>
        </nav>
      </div>
    </header>
  );
}
