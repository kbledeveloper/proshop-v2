import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the JWT token using the JWT_SECRET from the environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user associated with the decoded user ID from the JWT
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// User must be an admin
const admin = (req, res, next) => {
  // Check if the user is authenticated (req.user exists) and if the user is an admin (req.user.isAdmin is true)
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };

/*
Summary:
This module exports two middleware functions, protect and admin, designed to handle authentication and authorization in an Express.js application:

protect: This middleware ensures that the user is authenticated by checking the JWT token from the 'jwt' cookie. If the token is valid, it decodes the user ID and retrieves the associated user data from the database. The user data (excluding the password) is then added to the req object for use in subsequent middleware or route handlers. If the token is invalid or missing, an error is thrown, and the user is not authorized to access protected routes.

admin: This middleware checks if the user is authenticated (req.user exists) and if the user is an admin (req.user.isAdmin is true). If both conditions are met, the middleware calls the next() function to proceed to the next middleware or route handler. If the user is not authenticated or not an admin, an error is thrown, and the user is not authorized to access admin-specific routes.

Both middleware functions are designed to work with asynchronous route handlers, and errors are caught and handled by the asyncHandler utility function, providing centralized error handling for the entire application.
*/