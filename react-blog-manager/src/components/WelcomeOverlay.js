import React, { useEffect, useState } from 'react';
import './WelcomeOverlay.css';

const WelcomeOverlay = () => {
  const [visible, setVisible] = useState(true);
  const userName = localStorage.getItem('userName') || 'Guest';

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="welcome-overlay">
      <div className="welcome-content">
        <h2>Welcome, {userName}!</h2>
        <p>Thank you for joining Blog Manager</p>
      </div>
    </div>
  );
};

export default WelcomeOverlay; 