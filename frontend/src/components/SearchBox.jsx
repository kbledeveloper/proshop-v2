import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Define the 'SearchBox' functional component
const SearchBox = () => {
  // Get the 'navigate' function from 'react-router-dom' to handle navigation
  const navigate = useNavigate();

  // Get the 'keyword' parameter from the URL using 'useParams' hook
  // Note: 'useParams' gives access to the URL parameters in the current route
  const { keyword: urlKeyword } = useParams();

  // Set up state for the search input with the initial value from the URL ('urlKeyword')
  // FIX: Handle the case when 'urlKeyword' is undefined by providing an empty string as a fallback
  const [keyword, setKeyword] = useState(urlKeyword || '');

  // Define the submitHandler function to handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    // Check if 'keyword' has a value
    if (keyword) {
      // If there is a 'keyword', navigate to the search results page with the trimmed keyword as a parameter
      navigate(`/search/${keyword.trim()}`);
      // Reset the 'keyword' state to an empty string after navigation
      setKeyword('');
    } else {
      // If 'keyword' is empty, navigate back to the home page ('/')
      navigate('/');
    }
  };

  return (
    // Render a search form using 'Form' and 'Button' components from 'react-bootstrap'
    <Form onSubmit={submitHandler} className='d-flex'>
      {/* Input field for the search */}
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)} // Update the 'keyword' state when the input value changes
        value={keyword} // Bind the input value to the 'keyword' state
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>

      {/* Button for submitting the search */}
      <Button type='submit' variant='outline-success' className='p-2 mx-2'>
        Search
      </Button>
    </Form>
  );
};

// Export the 'SearchBox' component to make it available for use in other parts of the application.
export default SearchBox;
