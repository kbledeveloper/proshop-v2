// Importing "apiSlice" from "./apiSlice.js" and constants for the API URLs
import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

// Using "apiSlice.injectEndpoints" to define and manage API endpoints for orders
export const orderApiSlice = apiSlice.injectEndpoints({
  // Defining the endpoints using the "builder" object
  endpoints: (builder) => ({
    // Mutation to create a new order
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL, // Endpoint URL for creating an order
        method: 'POST', // HTTP method to use for the request
        body: order, // Request body containing order data
      }),
    }),
    // Query to get details of a specific order
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`, // Endpoint URL for getting order details with the specified ID
      }),
      keepUnusedDataFor: 5, // Keep the data in the cache for 5 seconds before discarding it
    }),
    // Mutation to pay for an order
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`, // Endpoint URL for paying for the specified order
        method: 'PUT', // HTTP method to use for the request
        body: details, // Request body containing payment details
      }),
    }),
    // Query to get the PayPal client ID
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL, // Endpoint URL for getting the PayPal client ID
      }),
      keepUnusedDataFor: 5, // Keep the data in the cache for 5 seconds before discarding it
    }),
    // Query to get the orders of the currently logged-in user
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`, // Endpoint URL for getting the user's orders
      }),
      keepUnusedDataFor: 5, // Keep the data in the cache for 5 seconds before discarding it
    }),
    // Query to get all orders (for admin)
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL, // Endpoint URL for getting all orders
      }),
      keepUnusedDataFor: 5, // Keep the data in the cache for 5 seconds before discarding it
    }),
    // Mutation to mark an order as delivered (for admin)
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`, // Endpoint URL for marking an order as delivered
        method: 'PUT', // HTTP method to use for the request
      }),
    }),
  }),
});

// Extracting the generated hooks and queries/mutations from the "orderApiSlice" and exporting them
export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = orderApiSlice;

/*
The code imports "apiSlice" from "./apiSlice.js" and constants for the API URLs.
The "orderApiSlice" is created using "apiSlice.injectEndpoints" to define and manage API endpoints related to orders, such as creating an order, getting order details, paying for an order, getting PayPal client ID, fetching user's orders, fetching all orders (for admin), and marking an order as delivered (for admin).
The generated hooks and queries/mutations from the "orderApiSlice" are extracted and exported for use in components to interact with the order-related API endpoints.
*/