const User = require('../../models/User');
const { generateToken } = require('../../utils/jwt');

exports.signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if all required fields are provided
        if (!email || !username || !password) {
            return res.status(400).json({ error: 'Email, username, and password are required' });
        }

        const newUser = new User({ email, username, password });
        const response = await newUser.save();
        const payload = { id: response.id, username: response.username };
        const token = generateToken(payload);
        res.status(200).json({ response, token });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a token
        const payload = { id: user._id, username: user.username };
        const token = generateToken(payload);

        // Respond with the token
        res.json({ token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.profile = async (req, res) => {
    try {
        const userId = req.user?.id;  // Use optional chaining to handle undefined

        if (!userId) {
            console.log('User ID not found in request');
            return res.status(401).json({ error: 'User ID missing' });
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};