// Importing the "createSlice" function from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';
// Importing the "updateCart" utility function from "cartUtils.js"
import { updateCart } from '../utils/cartUtils';

// Setting the initial state for the "cart" slice by fetching data from localStorage if available, otherwise setting default values
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

// Creating the "cartSlice" with createSlice
const cartSlice = createSlice({
  // Setting the name of the slice
  name: 'cart',
  // Using the previously defined initialState
  initialState,
  // Defining the reducers for this slice
  reducers: {
    // Reducer to add an item to the cart
    addToCart: (state, action) => {
      const item = action.payload;

      // Checking if the item already exists in the cart
      const existItem = state.cartItems.find((x) => x._id === item._id);

      // If the item exists, update the quantity, otherwise add the item to the cart
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Call the "updateCart" utility function to update the cart in localStorage and calculate other cart-related data
      return updateCart(state, item);
    },
    // Reducer to remove an item from the cart
    removeFromCart: (state, action) => {
      // Filter out the item with the given ID from the cartItems array
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      // Call the "updateCart" utility function to update the cart in localStorage and calculate other cart-related data
      return updateCart(state);
    },
    // Reducer to save the shipping address in the cart
    saveShippingAddress: (state, action) => {
      // Update the shipping address in the state
      state.shippingAddress = action.payload;
      // Save the updated cart in localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // Reducer to save the payment method in the cart
    savePaymentMethod: (state, action) => {
      // Update the payment method in the state
      state.paymentMethod = action.payload;
      // Save the updated cart in localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // Reducer to clear all cart items
    clearCartItems: (state, action) => {
      // Set the cartItems array to an empty array
      state.cartItems = [];
      // Save the updated cart in localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // Reducer to reset the cart to its initial state
    resetCart: (state) => (state = initialState),
  },
});

// Exporting the action creators generated by createSlice
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

// Exporting the reducer function generated by createSlice
export default cartSlice.reducer;

/*
The code imports the "createSlice" function from Redux Toolkit and the "updateCart" utility function from "cartUtils.js".
The initial state for the "cart" slice is set, fetching data from localStorage if available or setting default values for "cartItems," "shippingAddress," and "paymentMethod."
The "cartSlice" is created using "createSlice" with a name, initialState, and reducers.
The "addToCart" reducer handles adding an item to the cart and calls the "updateCart" utility function to update the cart in localStorage.
The "removeFromCart" reducer handles removing an item from the cart and calls the "updateCart" utility function to update the cart in localStorage.
The "saveShippingAddress" reducer handles saving the shipping address in the cart and updates localStorage accordingly.
The "savePaymentMethod" reducer handles saving the payment method in the cart and updates localStorage accordingly.
The "clearCartItems" reducer handles clearing all cart items and updates localStorage accordingly.
The "resetCart" reducer handles resetting the cart to its initial state.
Action creators "addToCart," "removeFromCart," "saveShippingAddress," "savePaymentMethod," "clearCartItems," and "resetCart" are generated and exported.
The "cartSlice.reducer" is exported as the reducer function to be used in the Redux store.
*/