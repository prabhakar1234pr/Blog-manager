import React, { useEffect } from "react";



function About() {
  useEffect(() => {
    console.log("About page render");

    // Change background color to light blue
    const originalColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "lightblue";

    // Cleanup to reset background when component unmounts
    return () => {
      document.body.style.backgroundColor = originalColor;
    };
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>About This Blog Manager</h2>
      <p>This application helps you create and manage blog posts easily.</p>
      <p>Feel free to share your thoughts and feelings!</p>
    </div>
  );
}

export default About;
