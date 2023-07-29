// Importing required React libraries, hooks, and components
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

// Importing necessary Redux functions and API slice
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

// RegisterScreen component to handle user registration
const RegisterScreen = () => {
  // State variables to manage registration form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Accessing the dispatch function from the Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mutation hook for user registration
  const [register, { isLoading }] = useRegisterMutation();

  // Accessing the userInfo state from the Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Extracting the 'redirect' parameter from the URL query string using useLocation
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  // Effect to automatically redirect to the specified page if the user is already logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  // Function to handle user registration form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Checking if password and confirm password fields match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        // Call the "register" mutation to register the user
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect); // Redirect to the specified page upon successful registration
      } catch (err) {
        toast.error(err?.data?.message || err.error); // Show error message if there's an error
      }
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      {/* Registration form */}
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Register button */}
        <Button disabled={isLoading} type='submit' variant='primary'>
          Register
        </Button>

        {/* Show loader while registering user */}
        {isLoading && <Loader />}
      </Form>

      {/* Link to the login page with the redirect parameter */}
      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;

/*
The component represents the user registration screen, allowing users to register.
It imports required React libraries, hooks, components, Redux functions, and API slices.
The component uses state variables to manage registration form fields such as name, email, password, and confirmPassword.
The component accesses the userInfo state from the Redux store to check if the user is already logged in.
The component uses the "useLocation" and "useNavigate" hooks to handle the redirection after registration.
It uses the "useRegisterMutation" hook to handle user registration.
The component has an effect that automatically redirects to the specified page if the user is already logged in.
The "submitHandler" function handles form submission and dispatches the registration mutation.
The code effectively handles user registration and redirection, and it is well-organized.
*/