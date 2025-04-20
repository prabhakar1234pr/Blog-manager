import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">Welcome to Blog Manager</h1>
        
        <section className="about-section creator-section">
          <h2>Creator</h2>
          <div className="creator-profile">
            <div className="creator-info">
              <h3>Prabhakar Elavala</h3>
              <div className="creator-links">
                <a href="https://github.com/prabhakar1234pr" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i> GitHub
                </a>
                <a href="https://www.linkedin.com/in/prabhakarelavala" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
                <a href="mailto:prabhakarpr554@gmail.com">
                  <i className="fas fa-envelope"></i> Email
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Blog Manager is designed to empower writers and content creators with a
            seamless platform for managing and sharing their thoughts with the world.
          </p>
        </section>

        <section className="about-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Easy Content Creation</h3>
              <p>Write and format your posts with our intuitive editor</p>
            </div>
            <div className="feature-item">
              <h3>Organized Management</h3>
              <p>Keep your posts organized and easily accessible</p>
            </div>
            <div className="feature-item">
              <h3>User Profiles</h3>
              <p>Personalize your experience and manage your content</p>
            </div>
            <div className="feature-item">
              <h3>Secure Platform</h3>
              <p>Your content is safe with our secure authentication system</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Get Started</h2>
          <p>
            Join our community of writers and start sharing your stories today. Create an
            account to access all features and begin your writing journey with Blog
            Manager.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
