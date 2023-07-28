import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Define the 'Paginate' functional component that takes 'pages', 'page', 'isAdmin', and 'keyword' as props
const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  // Return JSX for rendering pagination if there are more than 1 page (pages > 1)
  return (
    pages > 1 && (
      // Use the 'Pagination' component from 'react-bootstrap' to create a pagination element
      <Pagination>
        {/* Use the Array's 'map' method to generate an array of pagination items based on the number of pages */}
        {[...Array(pages).keys()].map((x) => (
          // Create a 'LinkContainer' component from 'react-router-bootstrap' for each pagination item
          <LinkContainer
            // Set the 'key' prop for each item to avoid warnings about unique keys
            key={x + 1}
            // Determine the URL based on the 'isAdmin', 'keyword', and the current page number (x + 1)
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}` // URL for non-admin search with a keyword
                  : `/page/${x + 1}` // URL for non-admin without a keyword
                : `/admin/productlist/${x + 1}` // URL for admin product list with the page number
            }
          >
            {/* Render the pagination item as a 'Pagination.Item' from 'react-bootstrap' */}
            {/* Set the 'active' prop to highlight the current page */}
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

// Export the 'Paginate' component to make it available for use in other parts of the application.
export default Paginate;
