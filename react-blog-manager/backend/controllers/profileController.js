const User = require('../models/User');

// Get user profile by email
const getUserProfile = async (req, res) => {
    try {
        const { email } = req.params;
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Error fetching user profile' });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({
            name,
            email,
            createdAt: new Date()
        });

        await user.save();

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

module.exports = {
    getUserProfile,
    createUser
}; 