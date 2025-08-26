//TRAVEL_LOG/server/routes/testRoutes.js
const express = require('express');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.email}, you have access!` });
});

module.exports = router;
