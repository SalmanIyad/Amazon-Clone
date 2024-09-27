import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <Container>
        <Row className="py-4">
          <Col md={3}>
            <h5>Get to Know Us</h5>
            <Nav className="flex-column text-light">
              <Nav.Link href="#" className="text-light">Careers</Nav.Link>
              <Nav.Link href="#" className="text-light">Blog</Nav.Link>
              <Nav.Link href="#" className="text-light">About Amazon Clone</Nav.Link>
              <Nav.Link href="#" className="text-light">Investor Relations</Nav.Link>
              <Nav.Link href="#" className="text-light">Amazon Devices</Nav.Link>
            </Nav>
          </Col>
          <Col md={3}>
            <h5>Connect with Us</h5>
            <Nav className="flex-column text-light">
              <Nav.Link href="#" className="text-light">Facebook</Nav.Link>
              <Nav.Link href="#" className="text-light">Twitter</Nav.Link>
              <Nav.Link href="#" className="text-light">Instagram</Nav.Link>
              <Nav.Link href="#" className="text-light">LinkedIn</Nav.Link>
              <Nav.Link href="#" className="text-light">YouTube</Nav.Link>
            </Nav>
          </Col>
          <Col md={3}>
            <h5>Make Money with Us</h5>
            <Nav className="flex-column text-light">
              <Nav.Link href="#" className="text-light">Sell on Amazon Clone</Nav.Link>
              <Nav.Link href="#" className="text-light">Affiliate Program</Nav.Link>
              <Nav.Link href="#" className="text-light">Advertise Your Products</Nav.Link>
              <Nav.Link href="#" className="text-light">Amazon Pay</Nav.Link>
            </Nav>
          </Col>
          <Col md={3}>
            <h5>Let Us Help You</h5>
            <Nav className="flex-column text-light">
              <Nav.Link href="#" className="text-light">Your Account</Nav.Link>
              <Nav.Link href="#" className="text-light">Your Orders</Nav.Link>
              <Nav.Link href="#" className="text-light">Returns & Replacements</Nav.Link>
              <Nav.Link href="#" className="text-light">Help</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            &copy; {new Date().getFullYear()} Amazon Clone. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
