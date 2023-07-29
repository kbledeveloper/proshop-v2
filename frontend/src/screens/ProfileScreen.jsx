// Importing required React libraries, hooks, and components
import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';

// ProfileScreen component to display user profile details and orders
const ProfileScreen = () => {
  // State variables to manage user profile fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Accessing the userInfo state from the Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Query to get the user's orders from the server
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  // Effect to set the name and email fields with the user's data from Redux when component mounts
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  // Accessing the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Function to handle updating the user profile
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        // Call the "updateProfile" mutation to update the user's profile
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error); // Show error message if there's an error
      }
    }
  };

  // Mutation hook for updating the user's profile
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        {/* Form to update user profile */}
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

          <Button type='submit' variant='primary'>
            Update
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {/* Show loader while loading user's orders */}
        {isLoading ? (
          <Loader />
        ) : error ? (
          // Show error message if there's an error
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          // Display user's orders in a table
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {/* Button to view order details */}
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;

/*
The component represents the user's profile page, displaying profile information and order history.
It imports required React libraries, hooks, components, and Redux functions.
The component uses state variables to manage user profile fields such as name, email, password, and confirmPassword.
The component accesses the userInfo state from the Redux store to populate the profile fields.
It uses the "useGetMyOrdersQuery" hook to fetch the user's order history.
The component utilizes the "useProfileMutation" hook to handle updating the user's profile.
The "submitHandler" function is responsible for submitting the updated profile information to the server.
The code effectively displays user profile details and order history in separate sections.
The code handles profile updates and order fetching smoothly, and it is well-organized.
*/