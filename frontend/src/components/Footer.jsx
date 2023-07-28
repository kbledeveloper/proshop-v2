// Import necessary modules from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap';

// Create a functional component called 'Footer'
const Footer = () => {
  // Get the current year using JavaScript's Date object
  const currentYear = new Date().getFullYear();

  // Return JSX for rendering the footer section
  return (
    // 'footer' element for semantic representation of the footer section
    <footer>
      {/* 'Container' component from 'react-bootstrap' for responsive layout */}
      <Container>
        {/* 'Row' component to create a horizontal row within the container */}
        <Row>
          {/* 'Col' component to create a column within the row */}
          {/* 'text-center' class centers the content horizontally */}
          {/* 'py-3' class adds padding on the y-axis (top and bottom) */}
          <Col className='text-center py-3'>
            {/* Render the footer text containing 'ProShop', a copyright symbol, and the current year */}
            <p>ProShop &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

// Export the 'Footer' component to make it available for use in other parts of the application.
export default Footer;
