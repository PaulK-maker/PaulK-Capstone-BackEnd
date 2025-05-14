import User from '../models/userModel.js';

//   Register a new user
//   POST /users/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user (password stored as plain text for demo; not secure for production)
    user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user (demo version)
//   POST /users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//   Get all users
//  GET /users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//   Get a single user by ID
//  GET /users/:id
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getUsers,
  getUser
};