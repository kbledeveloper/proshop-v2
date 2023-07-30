// Import necessary modules and models
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  // Get email and password from request body
  const { email, password } = req.body;

  // Find the user with the provided email
  const user = await User.findOne({ email });

  // Check if the user exists and the provided password matches the stored hash
  if (user && (await user.matchPassword(password))) {
    // Generate a JWT token and send it in the response cookie
    generateToken(res, user._id);

    // Return user details without the password in the response body
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // Return 401 (Unauthorized) if the authentication fails
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // Get name, email, and password from request body
  const { name, email, password } = req.body;

  // Check if the user already exists with the provided email
  const userExists = await User.findOne({ email });

  if (userExists) {
    // Return 400 (Bad Request) if the user already exists
    res.status(400);
    throw new Error('User already exists');
  }

  // Create a new user and save it to the database
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // Generate a JWT token and send it in the response cookie
    generateToken(res, user._id);

    // Return the newly created user details in the response body
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // Return 400 (Bad Request) if user creation fails
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  // Clear the JWT token cookie and send a success message in the response
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // Find the user by their ID and return the user details in the response
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // Return 404 (Not Found) if the user is not found
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // Find the user by their ID
  const user = await User.findById(req.user._id);

  if (user) {
    // Update the user details based on the request body
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Update the password if provided in the request body
    if (req.body.password) {
      user.password = req.body.password;
    }

    // Save the updated user and return the new details in the response
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    // Return 404 (Not Found) if the user is not found
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  // Fetch all users from the database and return them in the response
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  // Find the user by their ID
  const user = await User.findById(req.params.id);

  if (user) {
    // Check if the user is an admin, and prevent deletion if true
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Can not delete admin user');
    }

    // Delete the user from the database and return a success message
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    // Return 404 (Not Found) if the user is not found
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  // Find the user by their ID, excluding the password field from the response
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    // Return 404 (Not Found) if the user is not found
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  // Find the user by their ID
  const user = await User.findById(req.params.id);

  if (user) {
    // Update the user details based on the request body
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    // Save the updated user and return the new details in the response
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    // Return 404 (Not Found) if the user is not found
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
