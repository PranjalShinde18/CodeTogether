// const jwt = require('jsonwebtoken');

// exports.jwtAuthMiddleware = (req, res, next) => {
//     const token = req.header('x-auth-token');
//     if (!token) {
//         return res.status(401).json({ msg: 'No token, authorization denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded.user;
//         next();
//     } catch (err) {
//         res.status(401).json({ msg: 'Token is not valid' });
//     }
// };


const jwt = require('jsonwebtoken');

exports.jwtAuthMiddleware = (req, res, next) => {
    // Retrieve token from the 'x-auth-token' header
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach decoded user information to request object
        req.user = decoded; // Assuming your token payload is directly `decoded` user info
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};