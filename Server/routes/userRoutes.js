// TRAVEL_LOG/server/routes/userRoutes.js

const express = require('express');
const authenticateToken = require('../middleware/auth');
const User = require('../models/user'); // Assuming you have a User model

const router = express.Router();

// GET route to fetch the authenticated user's profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // req.user is attached by the authenticateToken middleware
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;