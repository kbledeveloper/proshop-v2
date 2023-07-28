import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

// Define the 'ProductCarousel' functional component
const ProductCarousel = () => {
  // Use the 'useGetTopProductsQuery' hook from the 'productsApiSlice' to fetch top products data
  // 'data' contains the fetched products, 'isLoading' indicates if the data is loading, 'error' contains any errors that might occur during the request
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  // If data is loading, return null (component will be rendered as blank until data is loaded)
  // If there is an error, display the error message using the 'Message' component
  // Otherwise, render the 'Carousel' component from 'react-bootstrap' with the fetched products
  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    // Use 'Carousel' from 'react-bootstrap' to create a carousel of top products
    <Carousel pause='hover' className='bg-primary mb-4'>
      {/* Use 'map' method to iterate over the fetched products and create carousel items */}
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          {/* Wrap the product image in a 'Link' component to link it to the product details page */}
          <Link to={`/product/${product._id}`}>
            {/* Display the product image */}
            <Image src={product.image} alt={product.name} fluid />
            {/* Display the product name and price in the carousel caption */}
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

// Export the 'ProductCarousel' component to make it available for use in other parts of the application.
export default ProductCarousel;
