// Importing required React libraries and components
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

// LoginScreen component for user login
const LoginScreen = () => {
  // State variables to manage email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redux dispatch function for triggering actions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mutation hook for handling user login
  const [login, { isLoading }] = useLoginMutation();

  // Accessing the user info from the auth state in the Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Extracting the "redirect" query parameter from the URL using React Router's useLocation hook
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  // useEffect hook to automatically redirect to the specified path if the user is already logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  // Function to handle form submission when logging in
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Calling the "login" mutation to log in the user with the provided email and password
      const res = await login({ email, password }).unwrap();

      // Dispatching an action to store the user credentials in the Redux store
      dispatch(setCredentials({ ...res }));

      // Redirecting the user to the specified path after successful login
      navigate(redirect);
    } catch (err) {
      // Displaying an error message if the login fails
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      {/* Login form */}
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Submit button for signing in */}
        <Button disabled={isLoading} type='submit' variant='primary'>
          Sign In
        </Button>

        {/* Display a loader while logging in */}
        {isLoading && <Loader />}
      </Form>

      {/* Link to the registration page for new customers */}
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

// Exporting the LoginScreen component
export default LoginScreen;

/*
Summary of comments:

This component represents the login screen for users.
It imports required React components, hooks, and Redux functions.
The component manages state variables for email and password inputs.
The component uses hooks like useNavigate, useLocation, useSelector, and useDispatch to access React Router and Redux functionalities.
It uses the "useLoginMutation" hook from the "usersApiSlice" to handle user login.
The component automatically redirects to the specified path if the user is already logged in.
The "submitHandler" function handles form submission for user login, calling the "login" mutation and dispatching actions upon successful login.
The component renders a login form, including input fields for email and password, a submit button, and a loader while logging in.
It provides a link to the registration page for new customers.
The code follows a clean and organized structure, making it easy to understand and maintain.
*/