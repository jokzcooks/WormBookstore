const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../../emailService');
const { User, Customer } = require('../../db/models/User'); // Adjust the path according to your file structure
const { default: mongoose } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

function emailCodeGen() {
    var nums = '0123456790'.split('')
    var rand = (list) => list[Math.floor(Math.random() * list.length)]
    return [
        rand(nums),
        rand(nums),
        rand(nums),
        rand(nums),
        rand(nums),
        rand(nums),
    ].join("")
}

function generatePassword() {
  var length = 16,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

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


// @route   POST api/user/register
// Register a new user
router.post('/register', async (req, res) => {
  var { first_name, last_name, password, email, phoneNumber } = req.body;

  // Validate inputs
  if (!first_name || !last_name || !password || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
  }

  email = (() => {
    var [user, domain] = email.toLowerCase().split("@")
    user = user.replace(/\./mg, "")
    return `${user}@${domain}`
  })()
  console.log("/register POSTTT")
  console.log({ first_name, last_name, email, phoneNumber, password })

  try {
      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists.' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Send confirmation email
      const comfCode = emailCodeGen()
      sendEmail(email, `Confirm Your Registration for Worm!`, `Thank you for registering for worm!\n\nHere is your six digit confirmation code:\n${comfCode}`)

      // Save user to database
      const newUser = new Customer({
          user_id: new mongoose.Types.ObjectId(),
          first_name,
          last_name,
          email,
          phone: phoneNumber,
          password: hashedPassword,
          verif_code: comfCode
      });
      await newUser.save()

      await Customer.findOneAndUpdate({email: email}, {password: hashedPassword})

      
      var exposedUser = JSON.parse(JSON.stringify(newUser))
      delete exposedUser.password
      delete exposedUser.verif_code
      delete exposedUser.__v
      delete exposedUser._id
      res.status(201).json({ 
        message: 'User registered successfully.', 
        data: exposedUser, 
        redirectUrl: '/confirm-registration' 
    });
      } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
  }
});

// @route   POST api/user/confirm
// Confirm a user's registration
router.post('/confirm', async (req, res) => {
  var { email, comf_code } = req.body;

  email = (() => {
    var [user, domain] = email.toLowerCase().split("@")
    user = user.replace(/\./mg, "")
    return `${user}@${domain}`
  })()

  console.log("Confirming!", email, comf_code)

  // Validate inputs
  if (!comf_code) {
      return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
          console.log("User doesn't exist")
          return res.status(400).json({ message: "User doesn't exist!" });
      }

      if (existingUser.verif_code != comf_code) {
        console.log("Code invalid")
        return res.status(400).json({ message: "Invalid code!" });
      }

      console.log("Code is valid!!")

      const updatedUser = await Customer.findOneAndUpdate({email: email}, {status: "active"}, {
        new: true
      })

      console.log("user updated!", updatedUser)

      var exposedUser = JSON.parse(JSON.stringify(updatedUser))
      delete exposedUser.password
      delete exposedUser.verif_code
      delete exposedUser.__v
      delete exposedUser._id
      console.log("Duplicated user", exposedUser)
      res.status(201).json({ message: 'User confirmed successfully.', data: exposedUser});
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
  }
});


// @route   POST api/user/reset
// Reset a user's password
router.post('/forgot', async (req, res) => {
  var { email } = req.body;


  // Validate inputs
  if (!email) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  email = (() => {
    var [user, domain] = email.toLowerCase().split("@")
    user = user.replace(/\./mg, "")
    return `${user}@${domain}`
  })()

  console.log("Resetting!", email)

  try {
      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
          console.log("User doesn't exist")
          return res.status(400).json({ message: "User doesn't exist!" });
      }

      console.log("Code is valid!!")

      const newPassword = generatePassword()
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);


      await Customer.findOneAndUpdate({email: email}, {password: hashedPassword})
      sendEmail(email, `Worm Temporary Password`, `Here is your temporary password:\n${newPassword}`)
      res.status(201).json({ message: 'Password reset successfully!'});
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
  }
});

// @route   POST api/user/login
// Log in a user
router.post('/login', async (req, res) => {
  var { email, password, rememberMe } = req.body;

  // Validate inputs
  if (!email || !password || !rememberMe) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  email = (() => {
    var [user, domain] = email.toLowerCase().split("@")
    user = user.replace(/\./mg, "")
    return `${user}@${domain}`
  })()

  console.log("/login POSTTT")
  console.log({ email, password, rememberMe })

  try {

      // Check for existing user
      const user = await User.findOne({ email });
      console.log(user)
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      // Validate password
      console.log("Validating password")
      console.log("Given password", password)
      console.log("Stored password", user.password)
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
          res.cookie("token", token.toString())
      });

      var exposedUser = JSON.parse(JSON.stringify(user))
      delete exposedUser.password
      delete exposedUser.verif_code
      delete exposedUser.__v
      delete exposedUser._id
      console.log("Duplicated user", exposedUser)
      res.status(201).json({ message: 'User confirmed successfully.', data: exposedUser});
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
