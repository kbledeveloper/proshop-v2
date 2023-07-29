// Importing required React libraries and components
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';

// Defining the UserEditScreen component
const UserEditScreen = () => {
  // Extracting the "userId" from the URL parameters
  const { id: userId } = useParams();

  // State variables to manage user details form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetching the user details from the server using the "useGetUserDetailsQuery" hook
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  // Mutation hook for updating user details
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  // React Router's hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission when updating user details
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Calling the "updateUser" mutation with the updated user details
      await updateUser({ userId, name, email, isAdmin });

      // Displaying a success message using "react-toastify" library
      toast.success('User updated successfully');

      // Refetching user details after the update
      refetch();

      // Navigating back to the user list page
      navigate('/admin/userlist');
    } catch (err) {
      // Displaying an error message if the update fails
      toast.error(err?.data?.message || err.error);
    }
  };

  // useEffect hook to set the form fields with the fetched user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  // Rendering the component's UI
  return (
    <>
      {/* Link to navigate back to the user list page */}
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      {/* FormContainer component for styling */}
      <FormContainer>
        <h1>Edit User</h1>

        {/* Displaying a loader while updating user details */}
        {loadingUpdate && <Loader />}

        {/* Conditionally rendering loader, error message, or the user edit form */}
        {isLoading ? (
          <Loader /> // Show loader if user details are still loading
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error} {/* Show error message if there's an error */}
          </Message>
        ) : (
          // Otherwise, show the user edit form
          <Form onSubmit={submitHandler}>
            {/* Form inputs for name, email, and admin status */}
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

            <Form.Group className='my-2' controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            {/* Submit button to update user details */}
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

// Exporting the UserEditScreen component
export default UserEditScreen;
