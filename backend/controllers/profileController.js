import pool from '../db.js';
const db = pool.default || pool;

const getUserProfile = async (req, res) => {
  
  const{email} = req.body;

  if(!email){
    return res.status(400).json({error: 'Email is required'});
  }




  
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  }
   catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

export default getUserProfile;

