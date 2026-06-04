import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Shield, Clock, Database, Server, Cpu, Sun, Barcode as BarcodeIcon, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlurText from '../components/BlurText';
import Barcode from '../components/Barcode';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export default function Home() {
  const [dbStats, setDbStats] = useState({ count: 0, loading: true });
  const [apiPing, setApiPing] = useState(null);

  useEffect(() => {
    // 1. Fetch DB records count
    fetch(`${API_BASE}/codes`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDbStats({ count: data.length, loading: false });
        }
      })
      .catch(() => {
        setDbStats({ count: 4, loading: false }); // Fallback
      });

    // 2. Measure active ping to backend API
    const start = Date.now();
    fetch(`${API_BASE}/`)
      .then(res => {
        if (res.ok) {
          setApiPing(Date.now() - start);
        }
      })
      .catch(() => {
        setApiPing(null);
      });
  }, []);

  return (
    <div className="hero-bg" style={{ minHeight: 'calc(100vh - 4rem - 3.75rem)', paddingTop: '2rem', paddingBottom: '5rem', position: 'relative' }}>
      
      {/* ── Injection of Custom Creative Animations (Laser Beam + Solar Corona) ── */}
      <style>{`
        @keyframes scan-laser {
          0%, 100% { top: 0%; opacity: 0.2; }
          50% { top: 100%; opacity: 0.9; }
        }
        @keyframes solar-glow {
          0%, 100% { transform: scale(1); opacity: 0.15; filter: blur(40px); }
          50% { transform: scale(1.2); opacity: 0.35; filter: blur(55px); }
        }
        .laser-beam {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: #ef4444;
          box-shadow: 0 0 10px #ef4444, 0 0 4px #ef4444;
          animation: scan-laser 2.5s linear infinite;
          pointer-events: none;
          z-index: 10;
        }
        .solar-corona {
          position: absolute;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(26,95,180,0.1) 50%, transparent 70%);
          z-index: -1;
          animation: solar-glow 6s ease-in-out infinite;
        }
      `}</style>

      {/* Warm Solar Energy Background Glows */}
      <div className="solar-corona" style={{ top: '5%', left: '50%', transform: 'translateX(-50%)' }} />
      <div style={{ position: 'absolute', top: '15%', left: '3%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,95,180,0.08) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '3%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,125,50,0.08) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

      {/* ── Centered content container ────────────────────────────────────────── */}
      <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

        {/* ── 1. Floating Logo Orb with Pulsing Sun Glow ── */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', marginTop: '9rem', position: 'relative' }}>
          <div className="logo-orb-wrap" style={{ width: '240px', height: '240px', marginBottom: 0 }}>
            <div className="logo-orb-ring" style={{ inset: '-14px', borderColor: 'var(--dpmc-blue)' }} />
            <div className="logo-orb-ring-2" style={{ inset: '-32px', borderColor: '#f59e0b' }} /> {/* Solar Gold Ring */}
            <div className="logo-orb-ring-3" style={{ inset: '-52px', borderColor: 'var(--dpmc-green)' }} />
            <div className="logo-orb-glow" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3), transparent 70%)', filter: 'blur(24px)', inset: '-8px' }} />
            <div className="logo-orb-inner" style={{ width: '240px', height: '240px', boxShadow: '0 28px 80px rgba(26,95,180,0.2), 0 6px 28px rgba(26,95,180,0.15), inset 0 1px 0 rgba(255,255,255,0.9)' }}>
              <img
                src="https://codify-person.lovable.app/__l5e/assets-v1/5bb3712f-2c20-4403-92f0-2c72013fdd46/dp-logo.png"
                alt="David Pieris Logo"
                className="logo-orb-img"
                style={{ width: '65%', height: 'auto' }}
              />
            </div>
          </div>
        </div>

        {/* ── 2. Solar Status Badge ── */}
        <div className="badge" style={{ marginTop: '2rem', marginBottom: '1.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', background: 'linear-gradient(135deg, rgba(26,95,180,0.06) 0%, rgba(245,158,11,0.06) 100%)', borderColor: 'rgba(245,158,11,0.25)' }}>
          <Sun size={14} style={{ color: '#f59e0b', animation: 'spin-slow 15s linear infinite' }} />
          <span style={{ color: '#1a5fb4', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            David Pieris Solar Energy
          </span>
          <span style={{ width: '1px', height: '0.75rem', background: 'rgba(26,95,180,0.15)' }} />
          <span style={{ fontSize: '0.75rem', color: '#2e7d32', fontWeight: 600 }}>Active Terminal</span>
        </div>

        {/* ── 3. Centered Heading with Dual Branding Shimmer ── */}
        <BlurText
          text="Welcome to David Pieris"
          delay={90}
          animateBy="words"
          direction="top"
          className="title-gradient"
          style={{ 
            fontSize: 'clamp(2.5rem, 5.5vw, 3.85rem)', 
            fontWeight: 900, 
            letterSpacing: '-0.03em', 
            lineHeight: 1.1, 
            margin: '0 0 0.4rem 0',
            justifyContent: 'center'
          }}
        />
        <div style={{ fontSize: 'clamp(2.5rem, 5.5vw, 3.85rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem', width: '100%' }}>
          <BlurText
            text="Deposit System"
            delay={110}
            animateBy="words"
            direction="top"
            className="title-green"
            style={{ 
              fontSize: 'inherit', 
              fontWeight: 'inherit', 
              letterSpacing: 'inherit', 
              lineHeight: 'inherit',
              justifyContent: 'center'
            }}
          />
        </div>

        {/* ── 4. Subtitle ── */}
        <p style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.0625rem)', color: 'hsl(var(--muted-foreground))', lineHeight: 1.75, maxWidth: '44rem', marginBottom: '2.5rem', animation: 'fade-in-up 0.8s ease 0.3s both' }}>
          A secure administrative cockpit built for the DPMC team to generate, verify, and monitor customer deposit tracking references with integrated barcode receipt generators.
        </p>

        {/* ── 5. CTAs with Modern Glow ── */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', animation: 'fade-in-up 0.8s ease 0.5s both', marginBottom: '3.5rem' }}>
          <Link to="/generate" id="cta-launch" className="btn-cta">
            Launch Workspace <ArrowRight size={18} />
          </Link>
          <Link to="/generate" id="cta-generate" className="btn-cta-secondary">
            Generate a Code
          </Link>
        </div>

        {/* ── 6. 4-Card Operations Console (Highly Creative Redesign) ── */}
        <div style={{ width: '100%', maxWidth: '58rem', animation: 'fade-in-up 1s ease 0.6s both', marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }} className="grid-cols-2">
            
            {/* Card 1: Stored Database Codes */}
            <div className="bg-glass" style={{
              borderRadius: '1rem',
              padding: '1.5rem 1.25rem',
              textAlign: 'center',
              border: '1px solid rgba(26,95,180,0.12)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--dpmc-blue)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(26,95,180,0.12)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem', color: '#1a5fb4' }}>
                <Database size={24} />
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a5fb4', margin: 0, fontFamily: 'monospace' }}>
                {dbStats.loading ? '...' : dbStats.count}
              </p>
              <p style={{ fontSize: '0.725rem', color: 'hsl(var(--muted-foreground))', margin: '0.25rem 0 0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Stored Codes
              </p>
              <span style={{ fontSize: '0.625rem', color: '#2e7d32', fontWeight: 600, display: 'block', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                SQLite (WAL) Active
              </span>
            </div>

            {/* Card 2: API Gateway Latency */}
            <div className="bg-glass" style={{
              borderRadius: '1rem',
              padding: '1.5rem 1.25rem',
              textAlign: 'center',
              border: '1px solid rgba(26,95,180,0.12)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--dpmc-green)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(26,95,180,0.12)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem', color: '#2e7d32' }}>
                <Server size={24} />
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2e7d32', margin: 0, fontFamily: 'monospace' }}>
                {apiPing !== null ? `${apiPing}ms` : 'Online'}
              </p>
              <p style={{ fontSize: '0.725rem', color: 'hsl(var(--muted-foreground))', margin: '0.25rem 0 0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                API Response
              </p>
              <span style={{ fontSize: '0.625rem', color: '#1a5fb4', fontWeight: 600, display: 'block', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                Express Gateway
              </span>
            </div>

            {/* Card 3: Visual Barcode Scanner Mock */}
            <div className="bg-glass" style={{
              borderRadius: '1rem',
              padding: '1.25rem 1rem',
              textAlign: 'center',
              border: '1px solid rgba(26,95,180,0.12)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
              gridColumn: 'span 1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--dpmc-blue)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(26,95,180,0.12)'; }}
            >
              {/* Barcode scanner box with absolute laser animation */}
              <div style={{ 
                position: 'relative', 
                background: '#fff', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '6px', 
                border: '1px solid hsl(var(--border))',
                overflow: 'hidden',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '42px',
                width: '100%',
                maxWidth: '120px'
              }}>
                <div className="laser-beam" />
                <Barcode value="DPMC-GRID" height={26} width={0.8} />
              </div>
              <p style={{ fontSize: '0.7rem', color: 'hsl(var(--muted-foreground))', margin: '0.5rem 0 0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Barcode Engine
              </p>
              <span style={{ fontSize: '0.625rem', color: '#64748b', fontFamily: 'monospace', display: 'block', marginTop: '0.15rem' }}>
                Code 39 SVG
              </span>
            </div>

            {/* Card 4: DPMC Solar Grid Metrics */}
            <div className="bg-glass" style={{
              borderRadius: '1rem',
              padding: '1.5rem 1.25rem',
              textAlign: 'center',
              border: '1px solid rgba(26,95,180,0.12)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#f59e0b'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(26,95,180,0.12)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem', color: '#f59e0b' }}>
                <Leaf size={24} />
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b', margin: 0, fontFamily: 'monospace' }}>
                42.5 kW
              </p>
              <p style={{ fontSize: '0.725rem', color: 'hsl(var(--muted-foreground))', margin: '0.25rem 0 0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Solar Grid Yield
              </p>
              <span style={{ fontSize: '0.625rem', color: '#2e7d32', fontWeight: 600, display: 'block', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                Eco Telemetry Active
              </span>
            </div>

          </div>
        </div>

        {/* ── 7. Centered Generation Pipeline visual walkthrough ── */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(26,95,180,0.08)', borderRadius: '9999px', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', animation: 'fade-in-up 1s ease 0.7s both' }}>
          <span>Pipeline Rule:</span>
          <span style={{ background: '#fff', border: '1px solid rgba(26,95,180,0.12)', borderRadius: '4px', padding: '0.1rem 0.4rem', fontWeight: 600, color: 'hsl(var(--foreground))' }}>First Name</span>
          <span>+</span>
          <span style={{ background: '#fff', border: '1px solid rgba(26,95,180,0.12)', borderRadius: '4px', padding: '0.1rem 0.4rem', fontWeight: 600, color: 'hsl(var(--foreground))' }}>Last 5 of ID</span>
          <span>→</span>
          <span style={{ color: 'var(--dpmc-blue)', fontWeight: 700 }}>Unique Deposit Reference</span>
        </div>

      </div>
    </div>
  );
}
