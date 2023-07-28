// Importing required modules and components
import { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

// Defining the PaymentScreen component
const PaymentScreen = () => {
  // Initializing variables and hooks
  const navigate = useNavigate(); // React Router hook for navigation
  const cart = useSelector((state) => state.cart); // Accessing Redux state (cart slice)
  const { shippingAddress } = cart; // Extracting shippingAddress from the cart state

  // Using useEffect hook to check if the shipping address is provided. If not, redirect to the ShippingScreen.
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  // Initializing state for the selected payment method (defaulting to 'PayPal')
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  // Accessing the Redux dispatch function
  const dispatch = useDispatch();

  // Event handler when the form is submitted
  const submitHandler = (e) => {
    e.preventDefault(); // Preventing the default form submission behavior

    // Dispatching an action to Redux to save the selected payment method
    dispatch(savePaymentMethod(paymentMethod));

    // Navigating to the next step in the checkout process, which is the PlaceOrderScreen
    navigate('/placeorder');
  };

  // Rendering the PaymentScreen component
  return (
    <FormContainer>
      {/* Displaying a set of checkout steps to indicate the current step */}
      <CheckoutSteps step1 step2 step3 />

      {/* Heading for the PaymentScreen */}
      <h1>Payment Method</h1>

      {/* Payment method selection form */}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            {/* Radio button for PayPal/Credit Card payment method */}
            <Form.Check
              className='my-2'
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked // The radio button is checked if the payment method state is 'PayPal'
              onChange={(e) => setPaymentMethod(e.target.value)} // Updating the payment method state on change
            ></Form.Check>
          </Col>
        </Form.Group>

        {/* Button to continue to the next step in the checkout process */}
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

// Exporting the PaymentScreen component to be used in other parts of the application
export default PaymentScreen;
