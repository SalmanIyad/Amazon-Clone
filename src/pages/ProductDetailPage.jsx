import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { addToCart } from '../store/slices/cartSlice';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.items.find((p) => p.id === parseInt(id))
  );

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Container>
      <Row className="my-4">
        <Col md={6}>
          <Image src={product.image} alt={product.title} fluid />
        </Col>
        <Col md={6}>
          <h1>{product.title}</h1>
          <p className="lead">${product.price}</p>
          <p>{product.description}</p>
          <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}