// Importing required React libraries, hooks, and components
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

// Importing Redux functions to interact with the cart state slice
import { saveShippingAddress } from '../slices/cartSlice';

// ShippingScreen component to handle the shipping information of the order
const ShippingScreen = () => {
  // Accessing the shipping address from the cart state
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // State variables to manage the shipping address form fields
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  // Accessing the dispatch function from the Redux store and the navigate function from react-router-dom
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle form submission
  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatching the "saveShippingAddress" action to update the shipping address in the cart state
    dispatch(saveShippingAddress({ address, city, postalCode, country }));

    // Redirecting to the payment screen
    navigate('/payment');
  };

  return (
    <FormContainer>
      {/* Checkout steps indicator */}
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      {/* Shipping address form */}
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Continue button */}
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;

/*
The component represents the shipping information screen where users provide their shipping address.
It imports required React libraries, hooks, components, and Redux functions.
The component uses state variables to manage the shipping address form fields such as address, city, postalCode, and country.
The component accesses the shipping address from the cart state.
It uses the "useDispatch" and "useNavigate" hooks to handle the dispatch of actions and navigation, respectively.
The component has a "submitHandler" function to handle form submission and dispatch the "saveShippingAddress" action.
It uses the "CheckoutSteps" component to display the steps of the checkout process.
The code effectively handles the shipping address form and redirects to the payment screen after submission. It is well-organized and follows best practices.
*/