// Importing required React libraries, hooks, and components
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';

// ProductScreen component to display product details and handle adding reviews and adding products to cart
const ProductScreen = () => {
  // Extracting the productId from the URL params
  const { id: productId } = useParams();

  // Accessing the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Hook to manage navigation within the app
  const navigate = useNavigate();

  // State variables to manage quantity, rating, and comment for reviews
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Function to handle adding the product to the cart
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  // Query to get product details from the server
  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

  // Accessing the userInfo state from the Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Mutation hook for creating a review
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  // Function to handle submitting a review
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Call the "createReview" mutation to create a new review for the product
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch(); // Refetch the product data to show the updated reviews
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error); // Show error message if there's an error
    }
  };

  return (
    <>
      {/* Link to go back to the previous page */}
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {/* Show loader while loading product details */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {/* Set meta title and description for SEO */}
          <Meta title={product.name} description={product.description} />
          {/* Display product details */}
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Quantity selection */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  {/* Add to cart button */}
                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {/* Display product reviews */}
          <Row className='review'>
            <Col md={6}>
              <h2>Reviews</h2>
              {/* Show message if there are no reviews */}
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {/* Display each review */}
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                {/* Form to write a review */}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {/* Show loader while submitting the review */}
                  {loadingProductReview && <Loader />}
                  {/* If user is logged in, show the review form */}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className='my-2' controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className='my-2' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    // If user is not logged in, show message to sign in to write a review
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;

/*
The component represents the screen to view and interact with a specific product.
It imports required React components, hooks, and Redux functions.
The component uses state variables to manage the quantity, rating, and comment for reviews.
It displays the product details, including image, name, rating, price, and description.
The user can add the product to the cart, and it will be redirected to the cart page.
The component allows users to write reviews for the product, which are displayed along with existing reviews.
The user can write a review only if they are logged in; otherwise, they are prompted to sign in.
The code handles the submission of reviews and adding products to the cart effectively.
The code is clean, well-organized, and handles the product screen functionality smoothly.
*/