import React, { useEffect, useState } from 'react';

function FetchDemoAsync() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3001/api/profile');
        const data = await response.json();
        console.log("Fetched data (async/await):", data);
        setProfile(data.Profile); // 🎯 Access the 'Profile' object inside the JSON
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Fetch Demo - async/await</h2>
      <p>Check the console to see data from /api/profile.</p>
      {profile ? (
        <div>
          <p>User: {profile.name}</p>
          <p>Role: {profile.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FetchDemoAsync;

