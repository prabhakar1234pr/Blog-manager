const pool = require('./backend/db.js');


const getBlogPosts = async (req, res) => {
  try{
    const result = await pool.query('SELECT * FROM blogs order by created_at desc');

    res.json(result.rows)

  }
  catch(error){
    console.error('Error fetching products:',error)
    res.status(500).json({error: 'Failed to fetch blogs'})
  }
  
  
};

module.exports = getBlogPosts;
  