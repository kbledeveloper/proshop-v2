import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

// Define the functional component 'OrderListScreen'
const OrderListScreen = () => {
  // Get orders data, loading status, and error from the API using 'useGetOrdersQuery' hook
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {/* Display the heading */}
      <h1>Orders</h1>
      {/* Check loading status */}
      {isLoading ? (
        // If data is loading, display the 'Loader' component to show a loading spinner
        <Loader />
      ) : error ? (
        // If there's an error, display the 'Message' component with the error message
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        // If there's no loading and no error, display the order data in a table
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Map through the 'orders' array to display each order as a row in the table */}
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {/* Display a checkmark icon if the order is paid, otherwise, display a times icon */}
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {/* Display a checkmark icon if the order is delivered, otherwise, display a times icon */}
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {/* Link to the order details page using 'LinkContainer' */}
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

// Export the 'OrderListScreen' component to make it available for use in other parts of the application.
export default OrderListScreen;
