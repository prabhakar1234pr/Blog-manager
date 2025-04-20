import React from 'react';
import Header from './Header';
import BlogBody from './BlogBody';
import Footer from './Footer';

function Dashboard() {
  const userName = localStorage.getItem('userName');

  return (
    <div className="dashboard">
      <Header />
      <main className="dashboard-content">
        <h1>Welcome, {userName}!</h1>
        <BlogBody />
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard; 