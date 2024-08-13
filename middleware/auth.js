// auth.js
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trim();
    } else {
      return res.status(401).json({ message: 'Invalid Token Format' });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.id;

    next();
  } catch (error) {
    console.error('Authentication Error:', error.message);
    res.status(401).json({ message: 'Invalid or Expired Token' });
  }
};

module.exports = auth;
