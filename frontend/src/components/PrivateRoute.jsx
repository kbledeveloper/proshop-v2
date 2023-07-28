import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Define the 'PrivateRoute' functional component
const PrivateRoute = () => {
  // Use the 'useSelector' hook from 'react-redux' to extract the 'userInfo' object from the 'auth' state
  const { userInfo } = useSelector((state) => state.auth);

  // If 'userInfo' exists (i.e., user is authenticated), return the 'Outlet' component
  // The 'Outlet' component allows nested routing, which means it will render child routes in the corresponding parent route
  // In this context, 'Outlet' represents the content that should be displayed when the user is authenticated and authorized to access private routes
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

// Export the 'PrivateRoute' component to make it available for use in other parts of the application.
export default PrivateRoute;
