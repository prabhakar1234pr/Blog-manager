// Header.js
// This component typically contains:
// 1) A logo or title
// 2) A navigation menu
// 3) Optional elements like a search bar or user profile

import React from 'react';

function Header() {
  return (
    <header style={{ backgroundColor: '#f1f1f1', padding: '10px' }}>
      <h1>My App Header</h1>
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

// App.js
// Import and use the Header component.
import React from 'react';
import Header from './Header';

function App() {
  return (
    <div>
      {/* Placing the Header component at the top of your layout */}
      <Header />

      {/* Main content of your application could go here */}
      <main>
        <h2>Welcome to My App!</h2>
        <p>This is where your main content will appear.</p>
      </main>
    </div>
  );
}

export default App;