import pool from '../db.js';
const db = pool.default || pool;

const getBlogPosts = async (req, res) => {
  const {email} = req.body;

  if(!email){
    return res.status(400).json({error: 'Email is required'});
  }

  try {
    const result = await db.query('SELECT id FROM users where email=$1',[email])
    
    if(result.rows.length===0){
      return res.status(404).json({error:'User not found'});
    }
    const userId = result.rows[0].id;

    const blogResult = await db.query('select * from blogs where user_id = $1 order by created_at DESC',[userId])

    return res.json(blogResult);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

export default getBlogPosts;



  