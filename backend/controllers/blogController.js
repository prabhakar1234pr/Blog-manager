import pool from '../db.js';
const db = pool.default || pool;


const createBlogPost = async (req, res) => {
  const { title, body, email } = req.body;

  console.log("Creating blog with:", { title, body, email });

  if (!title || !body || !email) {
    return res.status(400).json({ error: "Title, body, and email are required" });
  }

  try {
    // Get user_id from email
    const userResult = await db.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found for provided email" });
    }

    const user_id = userResult.rows[0].id;

    // Insert blog post
    const result = await db.query(
      `INSERT INTO blogs (title, content, user_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, body, user_id]
    );

    res.status(201).json({
      success: true,
      message: "Blog post created successfully!",
      blog: result.rows[0],
    });
  } catch (error) {
    console.error("DB Error inserting blog post:", error);
    res.status(500).json({ error: "Failed to create blog post." });
  }
};

export default createBlogPost;
