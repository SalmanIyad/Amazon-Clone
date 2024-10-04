import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import "./CheckoutPage.css";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted', { items: cartItems, shippingAddress });
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
      <Row>
        <Col md={7}>
          <Card className="mb-4">
            <Card.Body>
              <h3 className="mb-3 text-xl font-semibold">Shipping Address</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    required
                    className="form-control-lg"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    required
                    className="form-control-lg"
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleInputChange}
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    required
                    className="form-control-lg"
                  />
                </Form.Group>
                <Button variant="warning" type="submit" size="lg" className="w-100 mt-3">
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card>
            <Card.Body>
              <h3 className="mb-3 text-xl font-semibold">Order Summary</h3>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <Image src={item.image} alt={item.title} width={50} height={60} className="cart-item-image me-3" />
                      <span>{item.title} x {item.quantity}</span>
                    </div>
                    <span className="font-weight-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <hr />
              <div className="d-flex justify-content-between align-items-center mt-3">
                <h4 className="mb-0">Total:</h4>
                <h4 className="mb-0 text-primary">${total.toFixed(2)}</h4>
              </div>
              <div className="mt-3">
                <p className="mb-1 text-muted">
                  <LocationOnIcon className="me-2" style={{ fontSize: 'small' }} />
                  Deliver to {shippingAddress.country || 'Your Location'}
                </p>
                <p className="mb-1 text-muted">
                  <ShoppingCartOutlinedIcon className="me-2" style={{ fontSize: 'small' }} />
                  {cartItems.length} items in your cart
                </p>
              </div>
            </Card.Body>
          </Card>
          <div className="mt-3 text-center">
            <Link to="/cart" className="text-decoration-none">
              <Button variant="outline-primary" size="sm">
                Edit Cart
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}