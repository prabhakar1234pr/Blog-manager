import React, { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("http://localhost:5000/api/profile");
        const data = await response.json();
        console.log("Fetched profile:", data);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    fetchProfile();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Profile</h2>
      {!profile ? (
        <p>Loading profile...</p>
      ) : (
        <div>
          <p><strong>ID:</strong> {profile.id}</p>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Created At:</strong> {profile.created_at}</p> {/* <-- Raw timestamp */}
        </div>
      )}
    </div>
  );
}

export default Profile;
