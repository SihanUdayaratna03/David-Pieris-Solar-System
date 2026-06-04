import React from 'react';
import { ArrowRight, Zap, Shield, Clock, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlurText from '../components/BlurText';
import PreviewCard from '../components/PreviewCard';

export default function Home() {
  return (
    <div className="hero-bg" style={{ minHeight: 'calc(100vh - 4rem - 3.75rem)', paddingTop: '3rem', paddingBottom: '3rem' }}>
      {/* Floating decorative circles */}
      <div style={{ position: 'absolute', top: '8%', left: '3%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,95,180,0.07) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '8%', right: '3%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,125,50,0.07) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', right: '15%', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,95,180,0.05) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

      {/* ── Hero content wrapper ──────────────────────────────────────────────── */}
      <div className="container" style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'center' }}>

        {/* ── Left: Text content ──────────────────────────────────────────────── */}
        <div style={{ maxWidth: '54rem' }}>

          {/* Status Badge */}
          <div className="badge" style={{ marginBottom: '2rem' }}>
            <span className="badge-dot" />
            David Pieris Solar Energy &nbsp;·&nbsp; Internal System
          </div>

          {/* Floating Logo Orb */}
          <div style={{ display: 'flex' }}>
            <div className="logo-orb-wrap">
              <div className="logo-orb-ring" />
              <div className="logo-orb-ring-2" />
              <div className="logo-orb-ring-3" />
              <div className="logo-orb-glow" />
              <div className="logo-orb-inner">
                <img
                  src="https://codify-person.lovable.app/__l5e/assets-v1/5bb3712f-2c20-4403-92f0-2c72013fdd46/dp-logo.png"
                  alt="David Pieris Logo"
                  className="logo-orb-img"
                />
              </div>
            </div>
          </div>

          {/* BlurText Animated Heading */}
          <BlurText
            text="Welcome to David Pieris"
            delay={120}
            animateBy="words"
            direction="top"
            className="title-gradient"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, margin: '0 0 0.4rem 0' }}
          />
          <div style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            <BlurText
              text="Deposit System"
              delay={140}
              animateBy="words"
              direction="top"
              className="title-green"
              style={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit', lineHeight: 'inherit' }}
            />
          </div>

          {/* Subtitle */}
          <p style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.125rem)', color: 'hsl(var(--muted-foreground))', lineHeight: 1.75, maxWidth: '38rem', marginBottom: '2.5rem', animation: 'fade-in-up 0.8s ease 0.3s both' }}>
            A secure internal utility for generating unique deposit reference codes and
            tracking customer payments — built exclusively for the DPMC team.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fade-in-up 0.8s ease 0.5s both' }}>
            <Link to="/generate" id="cta-launch" className="btn-cta">
              Launch Workspace <ArrowRight size={18} />
            </Link>
            <Link to="/generate" id="cta-generate" className="btn-cta-secondary">
              Generate a Code
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="feature-pills">
            <span className="pill">
              <span className="pill-icon" style={{ background: 'rgba(26,95,180,0.12)', color: '#1a5fb4' }}>
                <Zap size={10} />
              </span>
              Instant Generation
            </span>
            <span className="pill">
              <span className="pill-icon" style={{ background: 'rgba(46,125,50,0.12)', color: '#2e7d32' }}>
                <Shield size={10} />
              </span>
              Secure &amp; Reliable
            </span>
            <span className="pill">
              <span className="pill-icon" style={{ background: 'rgba(26,95,180,0.12)', color: '#1a5fb4' }}>
                <Clock size={10} />
              </span>
              Session History
            </span>
            <span className="pill">
              <span className="pill-icon" style={{ background: 'rgba(46,125,50,0.12)', color: '#2e7d32' }}>
                <Database size={10} />
              </span>
              Persistent Storage
            </span>
          </div>
        </div>

        {/* ── Right: Preview Card (hidden on small screens) ───────────────────── */}
        <div className="hero-preview-card" style={{ animation: 'fade-in-up 0.9s ease 0.2s both', width: '300px', flexShrink: 0 }}>
          <PreviewCard />
        </div>

      </div>

      {/* ── Stats row ─────────────────────────────────────────────────────────── */}
      <div className="container" style={{ position: 'relative', zIndex: 10, marginTop: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '42rem' }}>
          {[
            { num: 'Instant',   label: 'Code generation', accent: '#1a5fb4' },
            { num: '100%',      label: 'Data persisted',   accent: '#2e7d32' },
            { num: 'Barcode',   label: 'Visual receipt',   accent: '#1a5fb4' },
          ].map(({ num, label, accent }) => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(26,95,180,0.1)',
              borderRadius: 'var(--radius)',
              padding: '1.25rem 1rem',
              textAlign: 'center',
              backdropFilter: 'blur(8px)',
              animation: 'fade-in-up 1s ease 0.6s both',
            }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: accent, margin: 0, lineHeight: 1.2 }}>{num}</p>
              <p style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', margin: '0.25rem 0 0', fontWeight: 500 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
