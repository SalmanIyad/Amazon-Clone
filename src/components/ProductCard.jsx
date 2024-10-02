import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import PropTypes from 'prop-types';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card className="h-100 d-flex flex-column justify-content-between">
      <Card.Img
        variant="top"
        src={product.image}
        style={{ height: '300px', objectFit: 'contain' }}
      />

      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>${product.price}</Card.Text>
        </div>

        <div>
          <Link to={`/product/${product.id}`} className="btn btn-primary">
            View Details
          </Link>
          <Button variant="secondary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};