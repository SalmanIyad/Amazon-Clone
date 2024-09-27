import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, ListGroup, Image } from 'react-bootstrap';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container>
      <h1 className="my-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row>
                    <Col md={3}>
                      <Image src={item.image} alt={item.title} fluid />
                    </Col>
                    <Col md={6}>
                      <h5>{item.title}</h5>
                      <p>${item.price}</p>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </Button>
                    </Col>
                    <Col md={3}>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="form-control"
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <p className="card-text">Total: ${total.toFixed(2)}</p>
                <Link to="/checkout" className="btn btn-primary">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}