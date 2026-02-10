import React from 'react';
import { SignUpButton } from '@clerk/nextjs';

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Left: Content */}
      <div className="hero-content">
        <div className="hero-badge">
          <span style={{ 
            width: 6, height: 6, borderRadius: '50%', 
            background: 'var(--accent-gold)', 
            boxShadow: '0 0 8px rgba(212,168,83,0.5)',
            display: 'inline-block' 
          }} />
          AI-Powered Learning Platform
        </div>

        <h1 className="hero-title">
          Learn Anything with{' '}
          <span style={{ color: 'var(--accent-gold)' }}>
            Your Personal
          </span>{' '}
          AI Tutor
        </h1>

        <p className="hero-description">
          Create custom AI companions that teach you any subject through natural voice conversations. 
          From math to coding, get personalized lessons tailored to your learning style.
        </p>

        <div className="hero-cta">
          <SignUpButton mode="modal">
            <button className="btn-hero-primary">
              Get Started Free
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.16669 10H15.8334M15.8334 10L10 4.16669M15.8334 10L10 15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </SignUpButton>
          <a href="#features">
            <button className="btn-hero-secondary">
              Learn More
            </button>
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">10+</div>
            <div className="stat-label">Subjects</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-number">Real-time</div>
            <div className="stat-label">Voice AI</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-number">Custom</div>
            <div className="stat-label">Tutors</div>
          </div>
        </div>
      </div>

      {/* Right: Floating Subject Cards with Gradient Mesh */}
      <div className="hero-image">
        <div className="hero-image-container deco-corners">
          <div className="hero-gradient-bg" />
          
          {/* Center geometric accent */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              className="w-32 h-32 rounded-full"
              style={{ 
                background: 'radial-gradient(circle, rgba(212,168,83,0.15), transparent 70%)',
                boxShadow: '0 0 60px rgba(212,168,83,0.1)',
              }}
            />
          </div>

          <div className="hero-subject-cards">
            {[
              { subject: 'science', icon: '🧪', color: 'rgba(196, 160, 255, 0.15)', glow: 'rgba(196, 160, 255, 0.25)' },
              { subject: 'maths', icon: '📐', color: 'rgba(255, 213, 79, 0.15)', glow: 'rgba(255, 213, 79, 0.25)' },
              { subject: 'language', icon: '📚', color: 'rgba(126, 200, 227, 0.15)', glow: 'rgba(126, 200, 227, 0.25)' },
              { subject: 'coding', icon: '💻', color: 'rgba(255, 142, 184, 0.15)', glow: 'rgba(255, 142, 184, 0.25)' },
            ].map((item) => (
              <div 
                key={item.subject}
                className="subject-floating-card"
                style={{ 
                  backgroundColor: item.color,
                  boxShadow: `0 0 30px ${item.glow}`,
                }}
              >
                <span className="text-3xl">{item.icon}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
