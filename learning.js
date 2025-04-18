/*
POST vs GET REST API Endpoints

1. Purpose and Usage:
   - GET: Used to retrieve data from a server (read-only operations)
   - POST: Used to submit data to be processed and possibly create new resources

2. Data Handling:
   - GET: Data is sent as query parameters in the URL (e.g., /users?id=123)
   - POST: Data is sent in the request body, not visible in the URL

3. Security:
   - GET: Less secure as data is visible in the URL and browser history
   - POST: More secure as data is hidden in the request body

4. Caching:
   - GET: Requests can be cached by browsers and proxies
   - POST: Requests are not typically cached

5. Idempotence:
   - GET: Idempotent (multiple identical requests have the same effect as a single request)
   - POST: Not idempotent (multiple identical requests may have different effects)

6. Data Length:
   - GET: URL length is limited (max ~2048 characters), limiting data size
   - POST: No practical size limit for request body data

7. Encoding:
   - GET: Only supports URL encoding (ASCII)
   - POST: Supports various encoding types (binary data, JSON, etc.)

8. Common Use Cases:
   - GET: 
     * Fetching user profiles
     * Loading a list of blog posts
     * Retrieving blog categories
   - POST:
     * Submitting a new blog post
     * Authenticating a user (login)
     * Uploading blog images
     * Adding comments to blogs

9. Example in Express.js:
*/

// Example GET endpoint to retrieve all blog posts
app.get('/api/blog-list', (req, res) => {
  // Fetch blogs from database
  res.json([{ id: 1, title: 'First Blog', content: 'Content here...' }]);
});

// Example POST endpoint to create a new blog post
app.post('/api/blog-post', (req, res) => {
  const { title, body } = req.body;
  // Validate input
  if (!title || !body) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  // Create blog in database
  const newBlog = { id: 123, title, content: body };
  res.status(201).json(newBlog);
});

/*
10. When to Convert from GET to POST:
   - When sending sensitive information (passwords, personal data)
   - When the payload is large (more than a few parameters)
   - When you need to send non-ASCII characters or binary data
   - When the operation modifies data on the server
   - When the client needs to send a request body (JSON, form data, etc.)
*/