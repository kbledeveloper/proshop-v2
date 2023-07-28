import { Alert } from 'react-bootstrap';

// Define the 'Message' functional component that takes 'variant' and 'children' as props
const Message = ({ variant, children }) => {
  // Return JSX for rendering an alert with the specified 'variant' and content 'children'
  return <Alert variant={variant}>{children}</Alert>;
};

// Set default props for the 'Message' component
Message.defaultProps = {
  variant: 'info', // If 'variant' prop is not provided, default to 'info'
};

// Export the 'Message' component to make it available for use in other parts of the application.
export default Message;
