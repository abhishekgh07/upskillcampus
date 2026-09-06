const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.json({ message: 'Signup successful!' });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed. Email may already exist.' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Wrong password' });
    res.json({ message: 'Login successful!', user: { name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;