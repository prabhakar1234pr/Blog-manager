import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./BlogBody.css";

function BlogBody() {
  const [statusMessage, setStatusMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const email = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();

  // Fetch existing blog posts when component mounts or when email changes
  useEffect(() => {
    if (email) {
      fetchBlogPosts();
    }
  }, [email]);

  async function fetchBlogPosts() {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/blog-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }

      const data = await response.json();
      
      if (data.rows) {
        setPosts(data.rows.map(post => ({
          id: post.id,
          title: post.title,
          body: post.content,
          createdAt: new Date(post.created_at),
          date: new Date(post.created_at).toLocaleDateString(),
          time: new Date(post.created_at).toLocaleTimeString()
        })));
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setStatusMessage('❌ Error loading blog posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeletePost(postId) {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5001/api/blogs/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      await fetchBlogPosts(); // Refresh the posts list
      setStatusMessage('✅ Post deleted successfully!');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting post:', error);
      setStatusMessage('❌ Failed to delete post. Please try again.');
    }
  }

  return (
    <main className="blog-body-container">
      {/* Published Blog Posts Section */}
      <section className='published-posts-section'>
        <div className="section-header">
          <h2>Your Blog Posts</h2>
          <button 
            className="create-post-button"
            onClick={() => navigate('/create')}
          >
            Create New Post
          </button>
        </div>
        {statusMessage && (
          <p className='status-message'>{statusMessage}</p>
        )}
        <div className='blog-posts-container'>
          {isLoading ? (
            <p className="loading-message">Loading your blog posts...</p>
          ) : posts.length === 0 ? (
            <div className="no-posts">
              <p>No posts yet. Start writing your first blog post!</p>
              <button 
                className="create-first-post-button"
                onClick={() => navigate('/create')}
              >
                Create Your First Post
              </button>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className='blog-post'>
                <div className='post-header'>
                  <h3 className='post-title'>{post.title}</h3>
                  <button
                    className='delete-button'
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button>
                </div>
                <p className='post-body'>{post.body}</p>
                <div className='post-footer'>
                  <span className='post-date'>Posted on {post.date} at {post.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default BlogBody;



