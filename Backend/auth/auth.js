const User = require('../model/authModel'); // Adjust path to your model
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
// SIGNUP logic
const signup = async (req, res) => {
    try {
        
        const {name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Signup failed. Email might already exist." });
    }
};

// LOGIN logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        // 3. Generate Token (Do this BEFORE sending the response)
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRETE_KEY, // Use your env variable here
            { expiresIn: '1h' }
        );

        // 4. Send combined response
        // Only ONE res.json() should be called
        res.status(200).json({ 
            message: "Login successful!", 
            token: token, 
            userId: user._id 
        });

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}
module.exports = { signup, login };