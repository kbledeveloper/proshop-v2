// Importing the PRODUCTS_URL and apiSlice from respective files
import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

// Creating a productsApiSlice using apiSlice.injectEndpoints to define and manage API endpoints for products
export const productsApiSlice = apiSlice.injectEndpoints({
  // Defining the endpoints using the "builder" object
  endpoints: (builder) => ({
    // Query to fetch products with optional keyword and pageNumber parameters
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL, // Endpoint URL for fetching products
        params: { keyword, pageNumber }, // Optional query parameters
      }),
      keepUnusedDataFor: 5, // Keep the data in the cache for 5 seconds before discarding it
      providesTags: ['Products'], // Tag used to identify related data in the cache
    }),
    // Query to fetch details of a specific product
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`, // Endpoint URL for fetching details of the specified product
      }),
      keepUnusedDataFor: 5, // Keep the data in the cache for 5 seconds before discarding it
    }),
    // Mutation to create a new product
    createProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`, // Endpoint URL for creating a new product
        method: 'POST', // HTTP method to use for the request
      }),
      invalidatesTags: ['Product'], // Invalidate cache for 'Product' tag after this mutation
    }),
    // Mutation to update an existing product
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`, // Endpoint URL for updating the specified product
        method: 'PUT', // HTTP method to use for the request
        body: data, // Request body containing product data to be updated
      }),
      invalidatesTags: ['Products'], // Invalidate cache for 'Products' tag after this mutation
    }),
    // Mutation to upload an image for a product
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`, // Endpoint URL for uploading the image
        method: 'POST', // HTTP method to use for the request
        body: data, // Request body containing image data to be uploaded
      }),
    }),
    // Mutation to delete a product
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`, // Endpoint URL for deleting the specified product
        method: 'DELETE', // HTTP method to use for the request
      }),
      providesTags: ['Product'], // Tag used to identify related data in the cache
    }),
    // Mutation to create a review for a product
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`, // Endpoint URL for creating a review for the specified product
        method: 'POST', // HTTP method to use for the request
        body: data, // Request body containing review data
      }),
      invalidatesTags: ['Product'], // Invalidate cache for 'Product' tag after this mutation
    }),
    // Query to fetch top-rated products
    getTopProducts: builder.query({
      query: () => `${PRODUCTS_URL}/top`, // Endpoint URL for fetching top-rated products
      keepUnusedDataFor: 5, // Keep the data in the cache for 5 seconds before discarding it
    }),
  }),
});

// Extracting the generated hooks and queries/mutations from the "productsApiSlice" and exporting them
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
} = productsApiSlice;

/*
The code imports "PRODUCTS_URL" and "apiSlice" from the respective files.
The "productsApiSlice" is created using "apiSlice.injectEndpoints" to define and manage API endpoints for products, such as fetching products, fetching product details, creating, updating, and deleting products, uploading product images, creating product reviews, and fetching top-rated products.
The generated hooks and queries/mutations from the "productsApiSlice" are extracted and exported for use in components to interact with the product-related API endpoints.

*/
