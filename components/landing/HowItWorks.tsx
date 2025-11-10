import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Choose Your Subject',
    description: 'Select from a wide range of subjects or browse popular companions created by others.',
  },
  {
    number: '02',
    title: 'Create Your Companion',
    description: 'Customize your AI tutor by selecting voice, teaching style, topic, and session duration.',
  },
  {
    number: '03',
    title: 'Start Learning',
    description: 'Begin your voice conversation and learn through natural, interactive dialogue.',
  },
  {
    number: '04',
    title: 'Track Progress',
    description: 'Review transcripts, bookmark favorites, and track your learning journey over time.',
  },
];

const HowItWorks = () => {
  return (
    <section className="how-it-works-section">
      <div className="how-header">
        <h2 className="how-title">How It Works</h2>
        <p className="how-subtitle">
          Get started with Mentora in four simple steps
        </p>
      </div>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">{step.number}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
            {index < steps.length - 1 && (
              <div className="step-connector" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
