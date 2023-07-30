// Function to add two decimal places to a number
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Function to update the cart state with calculated values and save it to localStorage
export const updateCart = (state) => {
  // Calculate the total price of all items in the cart
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate the shipping price. If the itemsPrice is greater than $100, shipping is free (price is 0), otherwise it's $10.
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate the tax price. It's 15% of the itemsPrice.
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // Calculate the total price, which includes itemsPrice, shippingPrice, and taxPrice.
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // Save the updated cart to localStorage as a JSON string
  localStorage.setItem('cart', JSON.stringify(state));

  return state; // Return the updated cart state
};

/*
The code exports two utility functions, addDecimals and updateCart.
The addDecimals function takes a number as input and returns it with two decimal places.
The updateCart function updates the cart state with calculated values for itemsPrice, shippingPrice, taxPrice, and totalPrice.
It saves the updated cart state to localStorage as a JSON string.
The updateCart function returns the updated cart state.
*/