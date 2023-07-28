import { Spinner } from 'react-bootstrap';

// Define the 'Loader' functional component
const Loader = () => {
  // Return JSX for rendering a loading spinner
  return (
    // Use the 'Spinner' component from 'react-bootstrap' for displaying a loading animation
    <Spinner
      // Set the animation type to 'border', which displays a spinner with a border animation
      animation='border'
      // Set the role attribute to 'status' to indicate that the spinner is a loading indicator
      role='status'
      // Style the spinner with the specified CSS properties
      style={{
        width: '100px',        // Set the width of the spinner to 100px
        height: '100px',       // Set the height of the spinner to 100px
        margin: 'auto',        // Center the spinner horizontally using auto margin
        display: 'block',     // Set the display to block to center the spinner vertically
      }}
    ></Spinner>
  );
};

// Export the 'Loader' component to make it available for use in other parts of the application.
export default Loader;
