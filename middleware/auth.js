const jwt = require('jsonwebtoken');
const { User } = require('../db/models/User'); // Adjust the path according to your file structure

// Middleware to check if the user is logged in
const isLoggedIn = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error('No user found');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  if (!req.user.admin) {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = { isLoggedIn, isAdmin };
