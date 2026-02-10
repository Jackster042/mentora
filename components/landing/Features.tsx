import React from 'react';

const features = [
  {
    icon: '🎙️',
    title: 'Real-Time Voice Conversations',
    description: 'Engage in natural, flowing conversations with AI tutors powered by advanced voice technology.',
    accent: 'var(--subject-science)',
  },
  {
    icon: '🎨',
    title: 'Custom AI Companions',
    description: 'Create personalized tutors with unique voices, teaching styles, and subject expertise.',
    accent: 'var(--subject-coding)',
  },
  {
    icon: '📝',
    title: 'Live Transcription',
    description: 'Get real-time transcripts of every session for better retention and review.',
    accent: 'var(--subject-language)',
  },
  {
    icon: '📊',
    title: 'Track Your Progress',
    description: 'Monitor your learning journey with comprehensive session history and insights.',
    accent: 'var(--subject-maths)',
  },
  {
    icon: '🧠',
    title: 'Multiple Subjects',
    description: 'Learn anything from Math, Science, Languages, Coding, History, Economics, and more.',
    accent: 'var(--subject-history)',
  },
  {
    icon: '⚡',
    title: 'Instant Feedback',
    description: 'Get immediate responses and explanations tailored to your understanding level.',
    accent: 'var(--subject-economics)',
  },
];

const Features = () => {
  return (
    <section id="features" className="features-section">
      {/* Section header with decorative divider */}
      <div className="features-header">
        <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--accent-gold)' }}>
          Capabilities
        </p>
        <h2 className="features-title">
          Everything You Need to Excel
        </h2>
        <p className="features-subtitle">
          Powerful features designed to make learning natural, engaging, and effective.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="feature-card"
            style={{
              // Each card gets its unique accent color on top border
              '--card-accent': feature.accent,
            } as React.CSSProperties}
          >
            {/* Colored top line on hover uses inline override */}
            <div 
              className="absolute top-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300"
              style={{ 
                background: `linear-gradient(90deg, ${feature.accent}, transparent)`,
              }}
            />
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
