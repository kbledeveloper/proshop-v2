// asyncHandler is a utility function to handle asynchronous route handlers in Express.js.
// It takes a single parameter 'fn', which represents the asynchronous route handler function.

const asyncHandler = (fn) => (req, res, next) => {
  // Inside the asyncHandler, we return a new function that takes three parameters:
  // 'req' (request), 'res' (response), and 'next' (Express middleware function).

  // We wrap the execution of the 'fn' (asynchronous route handler) in a Promise using Promise.resolve().
  // This is done to handle both synchronous and asynchronous functions in a unified way.

  Promise.resolve(fn(req, res, next))
    .catch(next);
  // The Promise resolves the 'fn', and if it encounters any errors during execution,
  // the '.catch()' method is used to catch those errors.

  // If an error occurs, the 'next' function is called with the error object as an argument.
  // This allows Express to pass the error to the error handling middleware.
};

// The 'asyncHandler' function is exported as the default export, making it available for use in other modules.
export default asyncHandler;
