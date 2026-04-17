const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Needed to verify the token
const userAuth = require('../auth/auth');

/**
 * MIDDLEWARE: verifyToken
 * This "bouncer" checks the request headers for a valid JWT.
 */
const verifyToken = (req, res, next) => {
    // Look for the token in the 'Authorization' header (format: Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: "Access denied. No token provided." });
    }

    try {
        // Verify the token using your Secret Key
        const verified = jwt.verify(token, process.env.JWT_SECRETE_KEY);
        req.user = verified; // Add the user data to the request object
        next(); // Move to the next function (the dashboard-data route)
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired token." });
    }
};

/**
 * PROTECTED ROUTE
 * Only works if verifyToken passes.
 */
router.get('/dashboard-data', verifyToken, (req, res) => {
    res.json({ 
        secretData: "This is only for logged-in users!",
        user: req.user // This contains the userId from the token
    });
});

/**
 * PUBLIC ROUTES
 */
router.post('/signup', userAuth.signup);
router.post('/login', userAuth.login);

module.exports = router;