import React from 'react';
import { SignUpButton } from '@clerk/nextjs';

const CallToAction = () => {
  return (
    <section className="landing-cta-section">
      <div className="landing-cta-content deco-corners">
        {/* Decorative geometric elements */}
        <div className="absolute top-6 left-6 w-12 h-[1px] opacity-20" style={{ background: 'var(--accent-gold)' }} />
        <div className="absolute top-6 left-6 w-[1px] h-12 opacity-20" style={{ background: 'var(--accent-gold)' }} />
        <div className="absolute bottom-6 right-6 w-12 h-[1px] opacity-20" style={{ background: 'var(--accent-gold)' }} />
        <div className="absolute bottom-6 right-6 w-[1px] h-12 opacity-20" style={{ background: 'var(--accent-gold)' }} />
        
        <p className="text-sm font-semibold tracking-widest uppercase relative" style={{ color: 'var(--accent-gold)' }}>
          Begin Your Journey
        </p>
        <h2 className="landing-cta-title">
          Ready to Transform Your Learning?
        </h2>
        <p className="landing-cta-description">
          Join thousands of learners using AI-powered voice tutors to master new skills and subjects.
        </p>
        <SignUpButton mode="modal">
          <button className="btn-cta-large">
            Start Learning for Free
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </SignUpButton>
        <p className="landing-cta-note">
          No credit card required &bull; Start creating your first companion in minutes
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
