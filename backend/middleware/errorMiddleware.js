const notFound = (req, res, next) => {
  // Create a new Error object with a message indicating that the requested URL (req.originalUrl) was not found
  const error = new Error(`Not Found - ${req.originalUrl}`);

  // Set the response status to 404 (Not Found)
  res.status(404);

  // Call the next middleware with the error object
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // Determine the status code to be sent in the response based on the current response status code (res.statusCode)
  // If the response status code is 200 (OK), set the status code to 500 (Internal Server Error); otherwise, keep the original status code
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Get the error message from the error object
  let message = err.message;

  // Set the response status code to the determined status code, and send a JSON response with the error message
  // If the application is running in production mode (process.env.NODE_ENV === 'production'), the error stack will not be included in the response
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };

/*
Summary:
This module exports two middleware functions: notFound and errorHandler, which are designed to handle 404 (Not Found) errors and other errors, respectively.

notFound: This middleware is used to handle requests for routes that do not exist. It creates a new Error object with a message indicating that the requested URL was not found, sets the response status to 404, and passes the error to the next middleware.

errorHandler: This middleware is used to handle all other errors that occur in the application. It first determines the appropriate status code based on the current response status code. If the status code is 200 (OK), it sets the status code to 500 (Internal Server Error); otherwise, it keeps the original status code. It then extracts the error message from the error object and sends a JSON response with the error message. If the application is running in production mode, the error stack is not included in the response to prevent exposing sensitive information to users.

The notFound middleware is usually placed at the end of the middleware stack, so if no other route handlers match the requested route, it will be executed and handle the 404 errors. The errorHandler middleware is used to catch and handle errors that occur during the execution of route handlers or other middleware in the application.
*/