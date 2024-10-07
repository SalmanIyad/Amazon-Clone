import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import OrderHistory from '../components/OrderHistory';
import { Link } from 'react-router-dom';

export default function UserAccountPage() {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);

  if (!user) {
    return <Link to={"/signin"} className="text-center"><h5 className="my-4">Please log in to view your account</h5></Link>;
  }

  return (
    <Container className="mb-4">
      <h1 className="my-4">Your Account</h1>
      <Row>
        <Col md={3}>
          <Card>
            <Card.Body>
              <h4>Profile</h4>
              <br />
              <h5>
                Name: <strong>{user.name}</strong>
                <br />
                Email: <strong>{user.email}</strong>
              </h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <OrderHistory />
        </Col>
      </Row>
    </Container>
  );
}