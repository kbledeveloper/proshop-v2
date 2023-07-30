// Import necessary modules and slices
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Use the reducer from the apiSlice
    cart: cartSliceReducer, // Use the cartSliceReducer for managing the cart state
    auth: authReducer, // Use the authReducer for managing the authentication state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the middleware from the apiSlice to handle API calls
  devTools: true, // Enable Redux DevTools for development purposes
});

export default store;

/*
The code sets up the Redux store using configureStore from @reduxjs/toolkit.
It imports the necessary slices, including apiSlice, cartSliceReducer, and authReducer.
The apiSlice provides middleware for handling API calls and its reducer is included in the store configuration.
The cartSliceReducer is used to manage the state related to the shopping cart.
The authReducer is used to manage the state related to user authentication.
The Redux DevTools are enabled for development purposes.
*/