import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./BlogBody.css";

function CreatePost() {
  const [statusMessage, setStatusMessage] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const email = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  // Debug log when component mounts
  useEffect(() => {
    console.log('Current email from localStorage:', email);
    console.log('Current userName from localStorage:', userName);
    if (!email) {
      console.log('No email found in localStorage, redirecting to login');
      navigate('/');
    }
  }, [email, userName, navigate]);

  async function handlePost(e) {
    e.preventDefault();
    
    // Debug log before validation
    console.log('Form values:', {
      email,
      title: title.trim(),
      body: body.trim()
    });
    
    if (!email) {
      console.log('No email found, redirecting to login');
      setStatusMessage('⚠️ Please log in to create a post');
      navigate('/');
      return;
    }

    if (!title.trim()) {
      setStatusMessage('⚠️ Please enter a title');
      return;
    }

    if (!body.trim()) {
      setStatusMessage('⚠️ Please enter content for your post');
      return;
    }

    setIsLoading(true);
    try {
      // Create the request data
      const postData = {
        email: email,
        title: title.trim(),
        content: body.trim()
      };
      
      // Log the exact data being sent
      console.log('Sending request with data:', postData);
      console.log('Stringified data:', JSON.stringify(postData));
      
      const response = await fetch(`${API_BASE_URL}/api/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      // Log the response status
      console.log('Response status:', response.status);
      
      const responseData = await response.json();
      console.log('Server response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to create post');
      }

      // Clear form and show success message
      setTitle('');
      setBody('');
      setStatusMessage('✅ Post created successfully!');
      
      // Navigate to blog posts page after 1 second
      setTimeout(() => {
        navigate('/blogposts');
      }, 1000);

    } catch (error) {
      console.error('Error creating post:', error);
      setStatusMessage(`❌ ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  if (!email) {
    return null; // Don't render anything if not logged in
  }

  return (
    <main className="blog-body-container">
      {/* Blog Creation Section */}
      <section className='blog-creation-section'>
        <div className='blog-creation-form'>
          <h2>Create a New Blog Post</h2>
          {statusMessage && (
            <p className='status-message'>{statusMessage}</p>
          )}

          <form onSubmit={handlePost}>
            <div className='form-group'>
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog title"
                disabled={isLoading}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor="body">Content:</label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your blog content here..."
                className='body-input'
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-actions">
              <button 
                className="post-button" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Post Blog'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default CreatePost; 