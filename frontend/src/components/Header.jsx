import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png';
import { resetCart } from '../slices/cartSlice';

const Header = () => {
  // Extract cartItems and userInfo from their respective states using 'useSelector' hook from 'react-redux'
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  // Get the dispatch function using 'useDispatch' hook from 'react-redux'
  const dispatch = useDispatch();

  // Get the navigate function for programmatically navigating to different routes using 'useNavigate' hook from 'react-router-dom'
  const navigate = useNavigate();

  // Use the 'useLogoutMutation' hook to get the logout mutation function generated from the 'usersApiSlice'
  const [logoutApiCall] = useLogoutMutation();

  // Define the 'logoutHandler' function to handle user logout
  const logoutHandler = async () => {
    try {
      // Call the logoutApiCall function to send a logout request to the server and wait for its completion using 'unwrap'
      await logoutApiCall().unwrap();

      // Dispatch the 'logout' action to log out the user on the client-side using the 'dispatch' function
      dispatch(logout());

      // NOTE: here we need to reset the cart state when a user logs out so the next user doesn't inherit the previous user's cart and shipping
      // Dispatch the 'resetCart' action to clear the cart state
      dispatch(resetCart());

      // Navigate the user to the '/login' page after successful logout
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  // Return JSX for rendering the header section
  return (
    <header>
      {/* Create a navigation bar using the 'Navbar' component from 'react-bootstrap' */}
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        {/* Use the 'Container' component to create a responsive layout */}
        <Container>
          {/* Use 'LinkContainer' to wrap the logo and application name to link them to the home page */}
          <LinkContainer to='/'>
            <Navbar.Brand>
              {/* Display the logo and application name */}
              <img src={logo} alt='ProShop' />
              ProShop
            </Navbar.Brand>
          </LinkContainer>

          {/* Create a responsive toggle button for smaller screens */}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          {/* Create a collapsible section for navigation links */}
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* Create a navigation list with links aligned to the right */}
            <Nav className='ms-auto'>
              {/* Include a 'SearchBox' component within the navigation bar */}
              <SearchBox />

              {/* Create a link to the '/cart' page and display cart items with a badge if the cart is not empty */}
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {/* Calculate the total quantity of items in the cart using 'reduce' */}
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {/* If the user is authenticated (userInfo exists), show a dropdown menu with user's name, 'Profile' link, and 'Logout' link */}
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    {/* Create a link to the '/profile' page */}
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    {/* Create a 'Logout' link with the 'logoutHandler' function onClick */}
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                // If the user is not authenticated, show a link to the '/login' page with the 'Sign In' icon
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* If the user is an admin (userInfo.isAdmin is true), show additional 'Admin' links in a dropdown menu */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  {/* Create links to various admin-related pages */}
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
