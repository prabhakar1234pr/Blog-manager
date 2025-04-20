import pool from '../db.js';
const db = pool.default || pool;

// Get user profile by email
const getUserProfile = async (req, res) => {
    try {
        const { email } = req.params;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            id: result.rows[0].id,
            name: result.rows[0].name,
            email: result.rows[0].email,
            createdAt: result.rows[0].created_at
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: error.message || 'Error fetching user profile' });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { email, name } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (result.rows.length === 0 && name) {
            // Get the maximum id to determine next id
            const maxIdResult = await db.query('SELECT MAX(id) FROM users');
            const nextId = (maxIdResult.rows[0].max || 0) + 1;

            // Create new user
            const newUser = await db.query(
                'INSERT INTO users (id, name, email, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *',
                [nextId, name, email]
            );
            return res.json(newUser.rows[0]);
        } else if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error with user profile:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

export { getUserProfile, createUser };
export default createUser; // Export createUser as default for the POST /api/profile route

