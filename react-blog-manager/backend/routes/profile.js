const express = require('express');
const router = express.Router();
const { getUserProfile, createUser } = require('../controllers/profileController');

// Get user profile
router.get('/:email', getUserProfile);

// Create new user
router.post('/', createUser);

module.exports = router; 