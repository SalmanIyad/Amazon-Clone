import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card className="h-100 d-flex flex-column justify-content-between">
      {/* Product Image */}
      <Card.Img
        variant="top"
        src={product.image}
        style={{ height: '300px', objectFit: 'contain' }}
      />

      {/* Card Body */}
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>${product.price}</Card.Text>
        </div>

        {/* Action Buttons */}
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
