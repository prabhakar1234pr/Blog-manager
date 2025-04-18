import pool from '../db.js';
const db = pool.default || pool;


const createBlogPost = async (req, res) => {
  const { title, body,email } = req.body;
  const user_id = 1;

  if (!title || !body ||!email) {
    return res.status(400).json({ error: "Title,body and email are required" });
  }

  try {
    console.log("Creating blog with:", { title, body, email });  // 🔍 DEBUG LINE

    const userResult = await db.query('select id from users where email = $1',[email]);

    if(userResult.rows.length === 0) {
      return res.status(404).json({error: 'User not found'})
    };

    const userID = userResult.rows[0].id;

    const result = await db.query(
      `INSERT INTO blogs (title, content, user_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, body, userID]
    );

    res.status(201).json({
      message: "Blog post created successfully!",
      blog: result.rows[0],
    });
  } catch (error) {
    console.error("❌ DB Error inserting blog post:", error);  
    res.status(500).json({ error: "Failed to create blog post." });
  }
};

export default createBlogPost;