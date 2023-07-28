// Import necessary modules from 'react-router-dom' and 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Create a functional component called 'AdminRoute'
const AdminRoute = () => {
  // Use the 'useSelector' hook from 'react-redux' to extract the 'userInfo' object from the 'auth' state.
  const { userInfo } = useSelector((state) => state.auth);

  // Check if 'userInfo' exists and if the 'isAdmin' property is true.
  // If the user is an admin, render the 'Outlet' component.
  // The 'Outlet' component is a placeholder that renders the child routes of the current route.
  // It allows nested routing within the 'AdminRoute' component.
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    // If the user is not an admin, redirect them to the '/login' page using the 'Navigate' component.
    // The 'Navigate' component is used for programmatic navigation within the application.
    // The 'replace' prop is used to replace the current location in the history stack, preventing users from going back to the restricted route using the browser's back button.
    <Navigate to='/login' replace />
  );
};

// Export the 'AdminRoute' component to make it available for use in other parts of the application.
export default AdminRoute;
