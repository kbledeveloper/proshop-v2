import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// Define the 'Rating' functional component that takes 'value', 'text', and 'color' as props
const Rating = ({ value, text, color }) => {
  return (
    // Create a div with the class name 'rating' to style the rating component
    <div className='rating'>
      {/* Render the appropriate number of stars based on the 'value' prop */}
      {/* If 'value' is greater than or equal to 1, display a full star, if greater than or equal to 0.5, display a half star, otherwise, display an empty star */}
      <span>
        {value >= 1 ? (
          <FaStar />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      {/* Repeat the same pattern for the next four stars */}
      <span>
        {value >= 2 ? (
          <FaStar />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      {/* Display the 'text' prop as a rating text (if provided) */}
      <span className='rating-text'>{text && text}</span>
    </div>
  );
};

// Set default props for the 'Rating' component. If 'color' prop is not provided, use the specified default value.
Rating.defaultProps = {
  color: '#f8e825',
};

// Export the 'Rating' component to make it available for use in other parts of the application.
export default Rating;
