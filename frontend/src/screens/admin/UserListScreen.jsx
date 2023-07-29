// Importing required React libraries and components
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDeleteUserMutation, useGetUsersQuery } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

// UserListScreen component for displaying a list of users
const UserListScreen = () => {
  // Fetching the list of users from the server using the "useGetUsersQuery" hook
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  // Mutation hook for deleting a user
  const [deleteUser] = useDeleteUserMutation();

  // Function to handle user deletion
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        // Calling the "deleteUser" mutation to delete the user with the specified ID
        await deleteUser(id);

        // Refetching the list of users after deletion to update the UI
        refetch();
      } catch (err) {
        // Displaying an error message if the deletion fails
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>

      {/* Conditionally rendering loader, error message, or the user list table */}
      {isLoading ? (
        <Loader /> // Show loader if users data is still loading
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error} {/* Show error message if there's an error */}
        </Message>
      ) : (
        // Otherwise, show the user list table
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through the "users" array to display user details */}
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {/* Displaying a checkmark (FaCheck) for admin users, and a cross (FaTimes) for non-admin users */}
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {/* Render the edit and delete buttons for non-admin users only */}
                  {!user.isAdmin && (
                    <>
                      <LinkContainer
                        to={`/admin/user/${user._id}/edit`}
                        style={{ marginRight: '10px' }}
                      >
                        {/* Button for editing user details */}
                        <Button variant='light' className='btn-sm'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      {/* Button for deleting the user */}
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

// Exporting the UserListScreen component
export default UserListScreen;
