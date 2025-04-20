import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  
  // Get user data from localStorage
  const email = localStorage.getItem('userEmail');
  const name = localStorage.getItem('userName');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!email || !name) {
        setError("No user information found. Please log in again.");
        setLoading(false);
        setTimeout(() => navigate('/'), 2000); // Redirect to login after 2 seconds
        return;
      }

      try {
        const response = await fetch(`http://localhost:5001/api/profile/${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch profile');
        }

        // Merge localStorage data with server data
        setProfileData({
          ...data,
          name: name || data.name, // Prefer localStorage name if available
          email: email || data.email // Prefer localStorage email if available
        });
        
      } catch (err) {
        console.error('Error fetching profile:', err);
        // If API fails, still show the data from localStorage
        setProfileData({
          name: name,
          email: email
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [email, name, navigate]);

  if (loading) {
    return (
      <div className="profile-container">
        <h2>Your Profile</h2>
        <div className="loading-spinner">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <h2>Your Profile</h2>
        <div className="error-message">
          <p>{error}</p>
          {(!email || !name) && <p>Redirecting to login page...</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-card">
        <div className="profile-field">
          <label>Name:</label>
          <span>{name}</span>
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <span>{email}</span>
        </div>
        {profileData?.createdAt && (
          <div className="profile-field">
            <label>Member since:</label>
            <span>{new Date(profileData.createdAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
