// @ts-check
import { isValidObjectId } from 'mongoose';

/**
 * Checks if the req.params.id is a valid Mongoose ObjectId.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 * @throws {Error} Throws an error if the ObjectId is invalid.
 */

function checkObjectId(req, res, next) {
  // Check if the req.params.id is a valid Mongoose ObjectId using the isValidObjectId function from Mongoose
  if (!isValidObjectId(req.params.id)) {
    // If the ObjectId is invalid, set the response status to 404 (Not Found) and throw an error with a message indicating the invalid ObjectId
    res.status(404);
    throw new Error(`Invalid ObjectId of:  ${req.params.id}`);
  }
  // If the ObjectId is valid, call the next middleware function
  next();
}

export default checkObjectId;

/*
This module exports a middleware function called checkObjectId. It is designed to check if the req.params.id is a valid Mongoose ObjectId. The isValidObjectId function from Mongoose is used to perform this validation.

If the req.params.id is not a valid ObjectId, the middleware sets the response status to 404 (Not Found) and throws an error with a message indicating the invalid ObjectId. If the req.params.id is valid, the middleware calls the next middleware function in the request-response cycle.

The @ts-check directive at the beginning of the file enables TypeScript checking for the module, ensuring type safety and error checking during development.
 */