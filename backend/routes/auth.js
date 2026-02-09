const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { sendWelcomeEmail } = require('../services/emailService');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, userType, emailNotifications } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            userType: userType || 'student',
            emailNotifications: emailNotifications !== undefined ? emailNotifications : true
        });

        if (user) {
            // Send welcome email (don't wait for it)
            if (user.emailNotifications) {
                sendWelcomeEmail(user).catch(err => console.error('Welcome email error:', err));
            }

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                avatar: `https://ui-avatars.com/api/?background=4F46E5&color=fff&name=${encodeURIComponent(user.name)}&bold=true`,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        res.status(400).json({ 
            error: 'Failed to register user',
            message: error.message 
        });
    }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                avatar: `https://ui-avatars.com/api/?background=4F46E5&color=fff&name=${encodeURIComponent(user.name)}&bold=true`,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).json({ 
            error: 'Failed to login',
            message: error.message 
        });
    }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
    try {
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            avatar: req.user.avatar
        });
    } catch (error) {
        res.status(400).json({ 
            error: 'Failed to get user',
            message: error.message 
        });
    }
});

module.exports = router;
