// Import necessary modules from 'react' and 'react-bootstrap'
import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Create a functional component called 'CheckoutSteps' with props 'step1', 'step2', 'step3', and 'step4'
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    // Create a horizontal navigation component using 'Nav' from 'react-bootstrap'
    <Nav className='justify-content-center mb-4'>
      {/* Navigation item for 'Sign In' step */}
      <Nav.Item>
        {/* Check if 'step1' prop is true */}
        {step1 ? (
          // If 'step1' is true, render a 'LinkContainer' from 'react-router-bootstrap'
          // The 'LinkContainer' wraps the 'Nav.Link' component, allowing it to act as a link to the specified route
          <LinkContainer to='/login'>
            {/* Render the link text 'Sign In' within the 'Nav.Link' */}
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          // If 'step1' is false, meaning the step is not completed, render a disabled 'Nav.Link'
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      {/* Navigation item for 'Shipping' step */}
      <Nav.Item>
        {/* Check if 'step2' prop is true */}
        {step2 ? (
          // If 'step2' is true, render a 'LinkContainer' to the '/shipping' route
          <LinkContainer to='/shipping'>
            {/* Render the link text 'Shipping' within the 'Nav.Link' */}
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          // If 'step2' is false, render a disabled 'Nav.Link'
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      {/* Navigation item for 'Payment' step */}
      <Nav.Item>
        {/* Check if 'step3' prop is true */}
        {step3 ? (
          // If 'step3' is true, render a 'LinkContainer' to the '/payment' route
          <LinkContainer to='/payment'>
            {/* Render the link text 'Payment' within the 'Nav.Link' */}
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          // If 'step3' is false, render a disabled 'Nav.Link'
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      {/* Navigation item for 'Place Order' step */}
      <Nav.Item>
        {/* Check if 'step4' prop is true */}
        {step4 ? (
          // If 'step4' is true, render a 'LinkContainer' to the '/placeorder' route
          <LinkContainer to='/placeorder'>
            {/* Render the link text 'Place Order' within the 'Nav.Link' */}
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          // If 'step4' is false, render a disabled 'Nav.Link'
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

// Export the 'CheckoutSteps' component to make it available for use in other parts of the application.
export default CheckoutSteps;
