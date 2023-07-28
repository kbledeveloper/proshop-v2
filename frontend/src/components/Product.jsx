import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

// Define the 'Product' functional component that takes 'product' as a prop
const Product = ({ product }) => {
  // Return JSX for rendering a product card
  return (
    // Use the 'Card' component from 'react-bootstrap' to create a card element
    <Card className='my-3 p-3 rounded'>
      {/* Use 'Link' from 'react-router-dom' to wrap the product image and link it to the product details page */}
      <Link to={`/product/${product._id}`}>
        {/* Display the product image */}
        <Card.Img src={product.image} variant='top' />
      </Link>

      {/* Create a card body to contain product details */}
      <Card.Body>
        {/* Use 'Link' again to wrap the product name and link it to the product details page */}
        <Link to={`/product/${product._id}`}>
          {/* Display the product name */}
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        {/* Display the product rating using the 'Rating' component */}
        <Card.Text as='div'>
          <Rating
            value={product.rating} // Pass the product rating value as a prop to the 'Rating' component
            text={`${product.numReviews} reviews`} // Display the number of reviews along with the rating
          />
        </Card.Text>

        {/* Display the product price */}
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

// Export the 'Product' component to make it available for use in other parts of the application.
export default Product;
