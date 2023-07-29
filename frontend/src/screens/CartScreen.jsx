// Importing required React libraries and components
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

// CartScreen component for displaying the shopping cart
const CartScreen = () => {
  // React Router's hook for programmatic navigation
  const navigate = useNavigate();

  // Redux dispatch function for triggering actions
  const dispatch = useDispatch();

  // Accessing the cart state from Redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Function to handle adding items to the cart
  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  // Function to handle removing items from the cart
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // Function to handle the checkout process
  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>

        {/* Conditionally rendering a message if the cart is empty or the cart items */}
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {/* Mapping through cart items and displaying them in a list */}
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {/* Creating options for quantity selection based on product availability */}
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    {/* Button for removing the item from the cart */}
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        {/* Displaying a card for cart summary */}
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              {/* Displaying the subtotal and total items in the cart */}
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              ${cartItems.reduce(
                (acc, item) => acc + item.qty * item.price,
                0
              ).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              {/* Button to proceed to checkout */}
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

// Exporting the CartScreen component
export default CartScreen;
