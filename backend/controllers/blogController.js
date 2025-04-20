import pool from '../db.js';
const db = pool.default || pool;

const createBlogPost = async (req, res) => {
    // Log the entire request body for debugging
    console.log("Received request body:", req.body);
    
    const { title, content, email } = req.body;

    // Log individual fields for debugging
    console.log("Extracted fields:", {
        title: title || 'missing',
        content: content || 'missing',
        email: email || 'missing'
    });

    // Validate required fields
    const missingFields = [];
    if (!title) missingFields.push('title');
    if (!content) missingFields.push('content');
    if (!email) missingFields.push('email');
    
    if (missingFields.length > 0) {
        return res.status(400).json({ 
            error: `Missing required fields: ${missingFields.join(', ')}`,
            missingFields 
        });
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
        console.log("Found user_id:", user_id);

        // Insert blog post
        const result = await db.query(
            `INSERT INTO blogs (title, content, user_id)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [title, content, user_id]
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
