// Importing required React libraries and components
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

// HomeScreen component for displaying the home page with latest products
const HomeScreen = () => {
  // Extracting the "pageNumber" and "keyword" from the URL parameters
  const { pageNumber, keyword } = useParams();

  // Fetching the products data from the server using the "useGetProductsQuery" hook
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {/* Conditionally render the ProductCarousel or a "Go Back" link */}
      {!keyword ? (
        <ProductCarousel /> // Show the ProductCarousel if there's no search keyword
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link> // Show the "Go Back" link if there's a search keyword
      )}

      {/* Conditionally render a loader, error message, or the product list */}
      {isLoading ? (
        <Loader /> // Show loader if products data is still loading
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error} {/* Show error message if there's an error */}
        </Message>
      ) : (
        <>
          <Meta /> {/* Set metadata for the page */}
          <h1>Latest Products</h1> {/* Heading for the product list */}
          <Row>
            {/* Loop through the products data and display each product in a column */}
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} /> {/* Display the product component */}
              </Col>
            ))}
          </Row>
          {/* Pagination component for navigating through product pages */}
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

// Exporting the HomeScreen component
export default HomeScreen;
