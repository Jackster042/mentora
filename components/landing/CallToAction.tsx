import React from 'react';
import { SignUpButton } from '@clerk/nextjs';

const CallToAction = () => {
  return (
    <section className="landing-cta-section">
      <div className="landing-cta-content">
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
          No credit card required • Start creating your first companion in minutes
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
