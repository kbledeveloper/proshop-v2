// Importing "apiSlice" and "USERS_URL" from respective files
import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';

// Creating a userApiSlice using apiSlice.injectEndpoints to define and manage API endpoints for users
export const userApiSlice = apiSlice.injectEndpoints({
  // Defining the endpoints using the "builder" object
  endpoints: (builder) => ({
    // Mutation to handle user login
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`, // Endpoint URL for user login
        method: 'POST', // HTTP method to use for the request
        body: data, // Request body containing user login data
      }),
    }),
    // Mutation to handle user registration
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`, // Endpoint URL for user registration
        method: 'POST', // HTTP method to use for the request
        body: data, // Request body containing user registration data
      }),
    }),
    // Mutation to handle user logout
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`, // Endpoint URL for user logout
        method: 'POST', // HTTP method to use for the request
      }),
    }),
    // Mutation to update user profile
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`, // Endpoint URL for updating user profile
        method: 'PUT', // HTTP method to use for the request
        body: data, // Request body containing updated user profile data
      }),
    }),
    // Query to fetch all users
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL, // Endpoint URL for fetching all users
      }),
      providesTags: ['User'], // Tag used to identify related data in the cache
      keepUnusedDataFor: 5, // Keep the data in the cache for 5 seconds before discarding it
    }),
    // Mutation to delete a user
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`, // Endpoint URL for deleting the specified user
        method: 'DELETE', // HTTP method to use for the request
      }),
    }),
    // Query to fetch details of a specific user
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`, // Endpoint URL for fetching details of the specified user
      }),
      keepUnusedDataFor: 5, // Keep the data in the cache for 5 seconds before discarding it
    }),
    // Mutation to update an existing user
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`, // Endpoint URL for updating the specified user
        method: 'PUT', // HTTP method to use for the request
        body: data, // Request body containing updated user data
      }),
      invalidatesTags: ['User'], // Invalidate cache for 'User' tag after this mutation
    }),
  }),
});

// Extracting the generated hooks and queries/mutations from the "userApiSlice" and exporting them
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} = userApiSlice;

/*
The code imports "apiSlice" and "USERS_URL" from the respective files.
The "userApiSlice" is created using "apiSlice.injectEndpoints" to define and manage API endpoints for users, including login, registration, logout, updating user profile, fetching all users, deleting a user, fetching user details, and updating user details.
The generated hooks and queries/mutations from the "userApiSlice" are extracted and exported for use in components to interact with the user-related API endpoints.
*/