import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SignUpButton } from '@clerk/nextjs';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          🎓 AI-Powered Learning Platform
        </div>
        <h1 className="hero-title">
          Learn Anything with Your Personal AI Tutor
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
          <Link href="#features">
            <button className="btn-hero-secondary">
              Learn More
            </button>
          </Link>
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
      <div className="hero-image">
        <div className="hero-image-container">
          <div className="hero-gradient-bg" />
          <div className="hero-subject-cards">
            {[
              { subject: 'science', icon: '🧪', color: '#E5D0FF' },
              { subject: 'maths', icon: '📐', color: '#FFDA6E' },
              { subject: 'language', icon: '📚', color: '#BDE7FF' },
              { subject: 'coding', icon: '💻', color: '#FFC8E4' },
            ].map((item, index) => (
              <div 
                key={item.subject}
                className="subject-floating-card"
                style={{ 
                  backgroundColor: item.color,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <span className="text-4xl">{item.icon}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
