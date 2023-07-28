import { Helmet } from 'react-helmet-async';

// Define the 'Meta' functional component that takes 'title', 'description', and 'keywords' as props
const Meta = ({ title, description, keywords }) => {
  // Return JSX for rendering the metadata of the page using 'Helmet' component from 'react-helmet-async'
  return (
    <Helmet>
      {/* Set the title of the page based on the 'title' prop */}
      <title>{title}</title>
      {/* Set the meta description of the page based on the 'description' prop */}
      <meta name='description' content={description} />
      {/* Set the meta keywords of the page based on the 'keywords' prop */}
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

// Set default props for the 'Meta' component
Meta.defaultProps = {
  title: 'Welcome To ProShop', // Default title if 'title' prop is not provided
  description: 'We sell the best products for cheap', // Default description if 'description' prop is not provided
  keywords: 'electronics, buy electronics, cheap electronics', // Default keywords if 'keywords' prop is not provided
};

// Export the 'Meta' component to make it available for use in other parts of the application.
export default Meta;
