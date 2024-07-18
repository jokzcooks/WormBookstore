const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../../emailService');



const { User } = require('../../db/models/User');


// @route   PUT api/user/editProfile
// Update user profile
router.put('/editProfile', async (req, res) => {
  const { userId, username, password } = req.body;

  // Validate inputs
  if (!userId || !username || (password && password.length < 6)) {
    return res.status(400).json({ message: 'Invalid input data.' });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update user details (excluding email)
    user.username = username;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save updated user to the database
    await user.save();

    // Send email notification about the change
    sendEmail(user.email, 'Profile Updated', 'Your profile has been updated successfully.');

    res.status(200).json({ message: 'Profile updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});


// @route   POST api/users/register
// Register a new user
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  // Validate inputs
  if (!username || !password || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists.' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save user to database
      const newUser = new User({
          username,
          password: hashedPassword,
          email
      });

      await newUser.save();
      res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
  }
});

// @route   POST api/user/login
// Log in a user
router.post('/login', async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
      // Validate user inputs
      if (!email || !password) {
          return res.status(400).json({ message: 'Please provide both email and password.' });
      }

      // Check for existing user
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials.' });
      }

      // Generate JWT Token
      const payload = {
          user: {
              id: user.id
          }
      };

      const jwtOptions = {
          expiresIn: '2h' // Default expiration
      };

      // Extend token life if 'Remember Me' is checked
      if (rememberMe) {
          jwtOptions.expiresIn = '7d'; // Extend to 7 days
      }

      jwt.sign(payload, process.env.JWT_SECRET, jwtOptions, (err, token) => {
          if (err) throw err;
          res.json({ token });
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
  }
});

// @route   POST api/user/logout
// Log out a user
router.post('/logout', (req, res) => {
  // using cookies:
  res.cookie('token', '', { expires: new Date(0) });
  res.status(200).json({ message: 'Logged out successfully.' });
});

// @route   GET api/user
// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/user/user_id/:user_id
// Get user by user_id
router.get('/user_id/:user_id', async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
    if (!user) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/user/:id
// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST api/user
// Create a new user
router.post('/', async (req, res) => {
  const user = new User({
    ...req.body
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT api/user/:id
// Update a user
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE api/user/:id
// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
    res.json({ message: 'Deleted user' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
