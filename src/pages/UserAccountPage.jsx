import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function UserAccountPage() {
  const user = useSelector((state) => state.user.currentUser);

  if (!user) {
    return <div>Please log in to view your account</div>;
  }

  return (
    <Container>
      <h1 className="my-4">Your Account</h1>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Card.Text>
                Name: {user.name}
                <br />
                Email: {user.email}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Order History</Card.Title>
              {/* map in user orders */}
              <p>No orders</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}