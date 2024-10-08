import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useTranslation } from "react-i18next";

export default function CheckoutPage() {

  const navigate = useNavigate();

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
    
    const orderData = { items: cartItems, shippingAddress };
    console.log('Order submitted', orderData);
    
    localStorage.setItem("orders", JSON.stringify(orderData));
    
    navigate("/account");
  };
  


  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [t, i18n] = useTranslation(); 
  return (
    <Container className="my-5">
      <h1 className="mb-4 text-2xl font-bold">{t('user.Checkout')}</h1>
      <Row>
        <Col md={7}>
          <Card className="mb-4">
            <Card.Body>
              <h3 className="mb-3 text-xl font-semibold">{t('user.Shipping Address')}</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>{t('user.Full Name')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    style={{
                      border:"0.0625rem grey solid",
                      borderRadius:"0.625rem"
                    }}
                    required
                    className="form-control-lg"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{t('user.Address')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    style={{
                      border:"0.0625rem grey solid",
                      borderRadius:"0.625rem"
                    }}
                    required
                    className="form-control-lg"
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('user.City')}</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        style={{
                          border:"0.0625rem grey solid",
                          borderRadius:"0.625rem"
                        }}
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('user.Postal Code')}</Form.Label>
                      <Form.Control
                        type="text"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleInputChange}
                        style={{
                          border:"0.0625rem grey solid",
                          borderRadius:"0.625rem"
                        }}
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>{t('user.Country')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    style={{
                      border:"0.0625rem grey solid",
                      borderRadius:"0.625rem"
                    }}
                    required
                    className="form-control-lg"
                  />
                </Form.Group>
                <Button variant="warning" type="submit" size="lg" className="w-100 mt-3">
                {t('user.Place Order')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card>
            <Card.Body>
              <h3 className="mb-3 text-xl font-semibold">{t('user.Order Summary')}</h3>
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
                  {t('user.Deliver to')} {shippingAddress.country || 'Your Location'}
                </p>
                <p className="mb-1 text-muted">
                  <ShoppingCartOutlinedIcon className="me-2" style={{ fontSize: 'small' }} />
                  {cartItems.length} {t('user.items in your cart')}
                </p>
              </div>
            </Card.Body>
          </Card>
          <div className="mt-3 text-center">
            <Link to="/cart" className="text-decoration-none">
              <Button variant="outline-primary" size="md">
              {t('user.Edit Cart')}
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}