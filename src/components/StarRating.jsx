
import PropTypes from 'prop-types';
import "./StarRating.css";

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <div className="star-rating">
        {Array(fullStars).fill(null).map((_, index) => (
          <span key={index} className="star full">&#9733;</span>
        ))}
  
        {halfStar && <span className="star half">&#9734;</span>}
  
        {/* Empty Stars */}
        {Array(emptyStars).fill(null).map((_, index) => (
          <span key={index + fullStars + 1} className="star empty">&#9734;</span>
        ))}
      </div>
    );
  };

StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
};

export default StarRating;