import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

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
    //! Handle needed!
    console.log('Order submitted', { items: cartItems, shippingAddress });
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container>
      <h1 className="my-4">Checkout</h1>
      <Row>
        <Col md={6}>
          <h3>Shipping Address</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={shippingAddress.fullName}
                onChange={handleInputChange}
                required
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
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Place Order
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="mb-2">
              <span>{item.title} x {item.quantity}</span>
              <span className="float-end">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <h4>Total: ${total.toFixed(2)}</h4>
        </Col>
      </Row>
    </Container>
  );
}