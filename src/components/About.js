import React from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function About(props) {
  const theme = props.theme || { text: '#042743', background: 'white', surface: '#f8f9fa', border: '#ced4da', primary: '#0d6efd', accent: '#0d6efd' };
  
  const containerStyle = {
    color: theme.text,
    backgroundColor: theme.background,
    transition: 'all 0.3s ease',
    paddingBottom: '3rem'
  };

  const cardStyle = {
    backgroundColor: theme.surface,
    border: `1px solid ${theme.border}`,
    color: theme.text,
    transition: 'all 0.3s ease',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: theme.mode === 'dark' ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  const featureGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginTop: '2rem',
    alignItems: 'stretch'
  };

  const featureCardStyle = {
    backgroundColor: theme.surface,
    border: `1px solid ${theme.border}`,
    borderRadius: '10px',
    padding: '1.25rem',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    boxShadow: theme.mode === 'dark' ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.08)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  // Animated Feature Card Component
  const FeatureCard = ({ children, delay = 0 }) => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.15 });
    return (
      <div
        ref={ref}
        className={`fade-in-up ${isVisible ? 'visible' : ''} stagger-${delay} card-zoom-small`}
        style={featureCardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = theme.mode === 'dark'
            ? '0 8px 24px rgba(0,0,0,0.4)'
            : '0 8px 24px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = theme.mode === 'dark'
            ? '0 2px 8px rgba(0,0,0,0.2)'
            : '0 2px 8px rgba(0,0,0,0.08)';
        }}
      >
        {children}
      </div>
    );
  };

  // Animated Section Header
  const SectionHeader = ({ children }) => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
    return (
      <h2
        ref={ref}
        className={`fade-in ${isVisible ? 'visible' : ''}`}
        style={{
          color: theme.accent,
          marginBottom: '1.5rem',
          fontSize: '2rem',
          fontWeight: '600',
          textAlign: 'center'
        }}
      >
        {children}
      </h2>
    );
  };

  // Animated Card Component
  const AnimatedCard = ({ children, delay = 0 }) => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
    return (
      <div
        ref={ref}
        className={`fade-in-up card-zoom-small h-100 ${isVisible ? 'visible' : ''} stagger-${delay}`}
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = theme.mode === 'dark'
            ? '0 8px 24px rgba(0,0,0,0.4)'
            : '0 8px 24px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = theme.mode === 'dark'
            ? '0 2px 8px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.1)';
        }}
      >
        {children}
      </div>
    );
  };

  // Header Section Component
  const HeaderSection = ({ theme }) => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });
    return (
      <div 
        ref={ref}
        className={`fade-in ${isVisible ? 'visible' : ''}`}
        style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '2rem' }}
      >
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          color: theme.accent,
          marginBottom: '1rem',
          transition: 'color 0.3s ease'
        }}>
          🔨 TextForge
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: theme.textSecondary || theme.text,
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Your comprehensive text utility toolkit for analyzing, transforming, and manipulating text with ease.
        </p>
      </div>
    );
  };

  return (
    <div className="container" style={containerStyle}>
      {/* Header Section */}
      <HeaderSection theme={theme} />

      {/* Main Description Card */}
      <AnimatedCard delay={0}>
        <h2 style={{ 
          color: theme.accent, 
          marginBottom: '1rem',
          fontSize: '1.75rem',
          fontWeight: '600'
        }}>
          What is TextForge?
        </h2>
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          marginBottom: '1rem'
        }}>
          TextForge is a powerful, free, and easy-to-use text utility application designed for writers, students, content creators, and professionals who work with text on a daily basis. Whether you need to analyze your writing, transform text formats, or perform quick text manipulations, TextForge provides all the tools you need in one convenient place.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', margin: 0 }}>
          Built with modern web technologies, TextForge runs entirely in your browser - no installations, no sign-ups, and completely free forever.
        </p>
      </AnimatedCard>

      {/* Key Features Grid */}
      <div>
        <SectionHeader>Key Features</SectionHeader>
        <div style={featureGridStyle}>
          <FeatureCard delay={0}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📊</div>
            <h3 style={{ color: theme.primary, marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              Text Analytics
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Get detailed statistics including word count, character count (with/without spaces), sentence count, paragraph count, reading time, and word frequency analysis.
            </p>
          </FeatureCard>

          <FeatureCard delay={1}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔄</div>
            <h3 style={{ color: theme.primary, marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              Text Transformations
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Transform text with multiple case options: Uppercase, Lowercase, Title Case, Sentence Case, Capitalize First, Toggle Case, and Reverse Text.
            </p>
          </FeatureCard>

          <FeatureCard delay={2}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
            <h3 style={{ color: theme.primary, marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              Find & Replace
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Quickly find and replace text throughout your document. Perfect for making bulk changes and corrections.
            </p>
          </FeatureCard>

          <FeatureCard delay={3}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📁</div>
            <h3 style={{ color: theme.primary, marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              File Operations
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Upload text files directly into the editor or download your processed text as a .txt file for easy sharing and archiving.
            </p>
          </FeatureCard>

          <FeatureCard delay={4}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎨</div>
            <h3 style={{ color: theme.primary, marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              Customizable Themes
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Choose from 8 beautiful themes including Light, Dark, Ocean Blue, Forest Green, Purple Dream, and more. Your preference is saved automatically.
            </p>
          </FeatureCard>

          <FeatureCard delay={5}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⚡</div>
            <h3 style={{ color: theme.primary, marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              Real-time Preview
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              See your text transformations and analytics update in real-time as you type. Instant feedback for all your text manipulations.
            </p>
          </FeatureCard>
        </div>
      </div>

      {/* Benefits Section */}
      <div style={{ marginTop: '3rem' }}>
        <SectionHeader>Why Choose TextForge?</SectionHeader>
        <div className="row g-3">
          <div className="col-md-4">
            <AnimatedCard delay={0}>
              <h3 style={{ color: theme.success, marginBottom: '0.75rem', fontSize: '1.5rem' }}>
                ✅ 100% Free
              </h3>
              <p style={{ lineHeight: '1.7', margin: 0 }}>
                TextForge is completely free to use forever. No subscriptions, no hidden fees, no premium tiers. All features are available to everyone.
              </p>
            </AnimatedCard>
          </div>
          <div className="col-md-4">
            <AnimatedCard delay={1}>
              <h3 style={{ color: theme.info, marginBottom: '0.75rem', fontSize: '1.5rem' }}>
                🔒 Privacy First
              </h3>
              <p style={{ lineHeight: '1.7', margin: 0 }}>
                All text processing happens locally in your browser. No data is sent to any server. Your text never leaves your device - complete privacy guaranteed.
              </p>
            </AnimatedCard>
          </div>
          <div className="col-md-4">
            <AnimatedCard delay={2}>
              <h3 style={{ color: theme.warning, marginBottom: '0.75rem', fontSize: '1.5rem' }}>
                🌐 Works Everywhere
              </h3>
              <p style={{ lineHeight: '1.7', margin: 0 }}>
                Fully responsive and works seamlessly on desktop, tablet, and mobile devices. Compatible with all modern browsers - Chrome, Firefox, Safari, and Edge.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div style={{ marginTop: '3rem' }}>
        <div style={cardStyle}>
          <h2 style={{ 
            color: theme.accent, 
            marginBottom: '1.5rem',
            fontSize: '1.75rem',
            fontWeight: '600'
          }}>
            Perfect For
          </h2>
          <div className="row">
            <div className="col-md-6">
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                lineHeight: '2.2'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>✍️</span>
                  <strong>Writers & Authors</strong> - Analyze writing style, word usage, and readability
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>🎓</span>
                  <strong>Students</strong> - Check word counts for essays and assignments
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>📝</span>
                  <strong>Content Creators</strong> - Format and optimize content for various platforms
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                lineHeight: '2.2'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>💼</span>
                  <strong>Professionals</strong> - Quick text transformations for documents and emails
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>👨‍💻</span>
                  <strong>Developers</strong> - Format code comments, documentation, and strings
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>📰</span>
                  <strong>Journalists & Editors</strong> - Quick text analysis and formatting
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <CallToActionSection theme={theme} />
    </div>
  );
}

// Call to Action Component
function CallToActionSection({ theme }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`fade-in-up ${isVisible ? 'visible' : ''}`}
      style={{ 
        textAlign: 'center', 
        marginTop: '3rem',
        padding: '2rem',
        backgroundColor: theme.surface,
        borderRadius: '12px',
        border: `2px solid ${theme.accent}`,
        boxShadow: theme.mode === 'dark' ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = theme.mode === 'dark'
          ? '0 8px 32px rgba(0,0,0,0.4)'
          : '0 8px 32px rgba(0,0,0,0.15)';
        e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = theme.mode === 'dark'
          ? '0 4px 16px rgba(0,0,0,0.3)'
          : '0 4px 16px rgba(0,0,0,0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
        <h2 style={{ 
          color: theme.accent, 
          marginBottom: '1rem',
          fontSize: '2rem',
          fontWeight: '600'
        }}>
          Ready to Get Started?
        </h2>
        <p style={{ 
          fontSize: '1.1rem', 
          marginBottom: '1.5rem',
          color: theme.textSecondary || theme.text
        }}>
          Start using TextForge now - no sign-up required, no installation needed!
        </p>
        <Link 
          to="/" 
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            backgroundColor: theme.accent,
            color: theme.mode === 'dark' ? '#000' : '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Try TextForge Now →
        </Link>
      </div>
  );
}