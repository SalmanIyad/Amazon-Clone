import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

export default function CheckEmailPage() {
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: '24rem', padding: '20px', textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Card.Body>
            <Card.Title className="mt-3" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}> Thank you for signing up!</Card.Title>
            <Card.Text className="m-1 " style={{ fontSize: '1rem' }}>
         
             <p> Please check your email to verify your account. </p>
             <p> You should receive an email shortly.</p>
            </Card.Text>
            <Button variant="warning" className="mt-3" href="/">Back to Home</Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
