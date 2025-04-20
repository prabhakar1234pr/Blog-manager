import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmailForm from './components/EmailForm';
import Dashboard from './components/Dashboard';
import './App.css';
import Header from './components/Header';
import BlogBody from './components/BlogBody';
import Footer from './components/Footer';
import About from "./components/About";
import Contact from './components/Contact';
import Profile from './components/Profile';
import BlogPosts from './components/BlogPosts';
import CreatePost from './components/CreatePost';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/" />;
};

// Layout component for protected routes
const ProtectedLayout = ({ children }) => (
  <div className="page-container">
    <Header />
    <div className="main-content">
      {children}
    </div>
    <Footer />
  </div>
);

function App() {
  const handleAccessBlogs = (email, blogs, userData) => {
    console.log('User logged in:', userData);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EmailForm headerText="Welcome to Blog Manager" onAccessBlogs={handleAccessBlogs} />} />
          
          {/* Protected Routes */}
          <Route
            path="/blogposts"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <BlogBody />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <CreatePost />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Profile />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <About />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Contact />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          
          {/* Catch all route - redirect to blogposts if logged in, otherwise to login */}
          <Route
            path="*"
            element={
              localStorage.getItem('isAuthenticated') === 'true' ? 
                <Navigate to="/blogposts" /> : 
                <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
