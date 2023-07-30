// Importing necessary functions from Redux Toolkit Query library
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// Importing the BASE_URL constant from the constants file
import { BASE_URL } from '../constants';

// Configuring the base query with the base URL
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Creating an API slice using createApi from Redux Toolkit Query
export const apiSlice = createApi({
  // Passing the base query to the API slice
  baseQuery,
  // Defining tagTypes to be used for request caching
  tagTypes: ['Product', 'Order', 'User'],
  // Defining the API endpoints (currently empty object)
  endpoints: (builder) => ({}),
});

/*
The code imports functions from the Redux Toolkit Query library and the BASE_URL constant from the constants file.
It configures a base query using the "fetchBaseQuery" function with the specified BASE_URL.
The code creates an API slice using the "createApi" function from Redux Toolkit Query.
It sets the "baseQuery" to be used for making network requests within the API slice.
The "tagTypes" option is defined to be used for request caching, and it includes the tags 'Product', 'Order', and 'User'.
The "endpoints" option is defined as an empty object, which means there are currently no specific API endpoints defined within this API slice.
*/