import React from 'react';

const features = [
  {
    icon: '🎙️',
    title: 'Real-Time Voice Conversations',
    description: 'Engage in natural, flowing conversations with AI tutors powered by advanced voice technology.',
  },
  {
    icon: '🎨',
    title: 'Custom AI Companions',
    description: 'Create personalized tutors with unique voices, teaching styles, and subject expertise.',
  },
  {
    icon: '📝',
    title: 'Live Transcription',
    description: 'Get real-time transcripts of every session for better retention and review.',
  },
  {
    icon: '📊',
    title: 'Track Your Progress',
    description: 'Monitor your learning journey with comprehensive session history and insights.',
  },
  {
    icon: '🧠',
    title: 'Multiple Subjects',
    description: 'Learn anything from Math, Science, Languages, Coding, History, Economics, and more.',
  },
  {
    icon: '⚡',
    title: 'Instant Feedback',
    description: 'Get immediate responses and explanations tailored to your understanding level.',
  },
];

const Features = () => {
  return (
    <section id="features" className="features-section">
      <div className="features-header">
        <h2 className="features-title">
          Everything You Need to Excel
        </h2>
        <p className="features-subtitle">
          Powerful features designed to make learning natural, engaging, and effective.
        </p>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
