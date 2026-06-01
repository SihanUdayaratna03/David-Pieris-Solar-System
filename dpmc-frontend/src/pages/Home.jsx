import React from 'react';
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlurText from '../components/BlurText';

export default function Home() {
  return (
    <div className="hero-bg">
      {/* Floating decorative circles */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,95,180,0.07) 0%, transparent 70%)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,125,50,0.07) 0%, transparent 70%)', zIndex: 0 }}></div>

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '60rem', padding: '0 2rem' }}>

        {/* Status Badge */}
        <div className="badge">
          <span className="badge-dot"></span>
          David Pieris Solar Energy &nbsp;·&nbsp; Internal System
        </div>

        {/* Floating Logo Orb */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="logo-orb-wrap">
            <div className="logo-orb-ring"></div>
            <div className="logo-orb-ring-2"></div>
            <div className="logo-orb-ring-3"></div>
            <div className="logo-orb-glow"></div>
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
          style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, margin: '0 0 0.4rem 0' }}
        />
        <div style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
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
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'hsl(var(--muted-foreground))', lineHeight: 1.7, maxWidth: '42rem', margin: '0 auto 3rem', animation: 'fade-in-up 0.8s ease 0.3s both' }}>
          A state-of-the-art secure utility designed to generate deposit references and streamline customer payments with absolute precision — built exclusively for the DPMC team.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animation: 'fade-in-up 0.8s ease 0.5s both' }}>
          <Link to="/generate" className="btn-cta">
            Launch Workspace <ArrowRight size={20} />
          </Link>
          <Link to="/generate" className="btn-cta-secondary">
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
            Secure & Reliable
          </span>
          <span className="pill">
            <span className="pill-icon" style={{ background: 'rgba(26,95,180,0.12)', color: '#1a5fb4' }}>
              <Clock size={10} />
            </span>
            Session History
          </span>
        </div>
      </div>
    </div>
  );
}
