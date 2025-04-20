import React, { useState, useEffect } from "react";

function BlogPosts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("http://localhost:5000/api/blog-list");
        const data = await response.json();

        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blog posts.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Blog Posts</h2>
      {loading ? (
        <p>Loading blog posts...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : blogs.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <ul>
          {blogs.map((blog, index) => (
            <li key={index}>
              <h3>{blog.title}</h3>
              <p>{blog.body}</p>
              <p><em>Posted on: {blog.created_at}</em></p>
            </li>
          ))}
        </ul>
      )}
      <p>Number of blog posts: {blogs.length}</p>
    </div>
  );
}

export default BlogPosts;


