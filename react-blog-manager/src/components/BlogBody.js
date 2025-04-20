import React, { useState } from 'react';
import "./BlogBody.css";
import EmailForm from './EmailForm.js';

function BlogBody() {
  const [statusMessage, setStatusMessage] = useState('');
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState([]);
  const [body, setBody] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [showBlogInterface, setShowBlogInterface] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);

  function handleDeletePost(indexToRemove) {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;
    const updatedPosts = posts.filter((_, index) => index !== indexToRemove);
    setPosts(updatedPosts);
  }

  const handleAccessBlogs = (email, blogList, profileData) => {
    setEmail(email);
    setUserBlogs(blogList);
    setUserProfile(profileData);
    setShowBlogInterface(true);

    if (blogList && Array.isArray(blogList.posts)) {
      setPosts(blogList.posts);
    } else if (Array.isArray(blogList)) {
      setPosts(blogList);
    } else {
      setPosts([]);
    }
  };

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleBodyChange(event) {
    setBody(event.target.value);
  }

  async function handlePost() {
    if (title.trim() === '') {
      alert('Please enter a title');
      return;
    }

    if (body.trim() === '') {
      alert('Please enter the body');
      return;
    }

    const newPost = {
      title,
      body,
      date: date || new Date().toLocaleDateString(),
      time: time || new Date().toLocaleTimeString()
    };

    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newPost.title,
          body: newPost.body,
          email: email
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success || data.blog)) {
        setStatusMessage(`✅ Blog "${newPost.title}" saved!`);
        setPosts([
          ...posts,
          {
            title: data.blog?.title || newPost.title,
            body: data.blog?.content || newPost.body,
            date: new Date(data.blog?.created_at || Date.now()).toLocaleDateString(),
            time: new Date(data.blog?.created_at || Date.now()).toLocaleTimeString()
          }
        ]);
      } else {
        setStatusMessage('⚠️ Blog post failed to save.');
      }

      setTitle('');
      setBody('');
      setDate('');
      setTime('');
    } catch (error) {
      console.error('Error posting blog:', error);
      setStatusMessage('❌ Error communicating with backend.');
    } finally {
      setTimeout(() => setStatusMessage(''), 5000);
    }
  }

  return (
    <main>
      {!showBlogInterface ? (
        <EmailForm headerText="Welcome to Blog Manager" onAccessBlogs={handleAccessBlogs} />
      ) : (
        <div>
          {/* User Profile Section */}
          {userProfile && (
            <section className='user-profile-section'>
              <div className='user-profile-info'>
                <h3>Welcome, {userProfile.user}!</h3>
                <p>Email: {email}</p>
              </div>
            </section>
          )}

          {/* Blog Creation Section */}
          <section className='blog-creation-section'>
            <div className='blog-creation-form'>
              <h2>Create a New Blog Post</h2>
              <p className='status-message'>{statusMessage}</p>

              <form onSubmit={(e) => {
                e.preventDefault();
                handlePost();
              }}>
                <div className='form-group'>
                  <label>
                    Title:
                    <input
                      type="text"
                      name="title"
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="Title of my awesome post"
                    />
                  </label>
                  <br /><br />
                </div>

                <p>This information is Confidential.</p>
                <br /><br />

                <div className='form-group'>
                  <label>
                    Body:
                    <textarea
                      name="body"
                      value={body}
                      onChange={handleBodyChange}
                      placeholder="Write your blog content here..."
                      className='body-input'
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                          e.preventDefault();
                          handlePost();
                        }
                      }}
                    ></textarea>
                  </label>
                  <br /><br />
                </div>

                <div className='form-group date-time-group'>
                  <div className='date-input-container'>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className='date-input'
                    />
                  </div>
                  <div className='time-input-container'>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className='time-input'
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button className="post-button" type="submit">Post</button>
                </div>
              </form>
            </div>
          </section>

          {/* Published Blog Posts Section */}
          <section className='published-posts-section'>
            <h2>Published Blog Posts</h2>
            <div className='blog-posts-container'>
              <h3>Posted Titles:</h3>
              {posts.length === 0 ? (
                <p className="no-posts">No posts yet. Start typing!</p>
              ) : (
                posts.map((post, index) => (
                  <div key={index} className='blog-post'>
                    <div className='post-header'>
                      <h3 className='post-title'>{post.title}</h3>
                    </div>
                    <div className='post-content'>
                      <p className='post-body'>{post.body}</p>
                    </div>
                    <div className='post-meta'>
                      {post.date && <span className='post-date'>{post.date}</span>}
                      {post.time && <span className='post-time'>{post.time}</span>}
                      <span className='post-timestamp'>Posted at {post.date} : {post.time}</span>
                    </div>
                    <div className='post-actions'>
                      <button className='delete-button' onClick={() => {
                        if (window.confirm("Are you sure?")) {
                          handleDeletePost(index);
                        }
                      }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default BlogBody;



