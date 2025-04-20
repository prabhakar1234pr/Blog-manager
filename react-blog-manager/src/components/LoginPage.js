import React from 'react';
import EmailForm from './EmailForm';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleAccessBlogs = (email, blogList, profileData) => {
    // Store the login state
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', profileData.name || '');
    
    // After successful login, redirect to blog creation
    navigate('/', { replace: true });
    // Force a page reload to update the login state
    window.location.reload();
  };

  return (
    <div className="login-page">
      <h1 className="login-title">My Awesome Blog Portal</h1>
      <EmailForm headerText="Welcome to Blog Manager" onAccessBlogs={handleAccessBlogs} />
    </div>
  );
}

export default LoginPage; 