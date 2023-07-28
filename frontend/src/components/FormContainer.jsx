// Import necessary modules from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap';

// Create a functional component called 'FormContainer' with a 'children' prop
const FormContainer = ({ children }) => {
  // Return JSX for rendering a form container
  return (
    // Use the 'Container' component from 'react-bootstrap' for a responsive layout
    <Container>
      {/* 'Row' component to create a horizontal row within the container */}
      {/* 'justify-content-md-center' class centers the row content horizontally for medium-sized screens and above */}
      <Row className='justify-content-md-center'>
        {/* 'Col' component to create a column within the row */}
        {/* 'xs={12}' specifies the column size for extra small screens (12 columns, full width) */}
        {/* 'md={6}' specifies the column size for medium-sized screens and above (6 columns, half width) */}
        <Col xs={12} md={6}>
          {/* Render the content passed as 'children' within the column */}
          {children}
        </Col>
      </Row>
    </Container>
  );
};

// Export the 'FormContainer' component to make it available for use in other parts of the application.
export default FormContainer;
