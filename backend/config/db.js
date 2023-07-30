// Import Mongoose to connect to the MongoDB database
import mongoose from 'mongoose';

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URI provided in the environment variable "MONGO_URI"
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If the connection is successful, log a message indicating the host of the database
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If there's an error during the connection attempt, log the error message and exit the process with a non-zero code
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Export the connectDB function to be used in other parts of the application
export default connectDB;

/*
This code connects to a MongoDB database using Mongoose.
The connectDB function is an asynchronous function that handles the database connection.
It attempts to connect to the MongoDB database using the URI provided in the environment variable MONGO_URI.
If the connection is successful, it logs a message indicating the host of the database.
If there's an error during the connection attempt, it logs the error message and exits the process with a non-zero code.
*/