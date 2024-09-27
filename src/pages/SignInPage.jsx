import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { setUser } from "../store/slices/userSlice";

const apiUrl = "http://localhost:5000/users"; // JSON server url "5000"

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    try {
      const response = await fetch(apiUrl);
      const users = await response.json();
      // check valid creds
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (!user) {
        setError("Invalid email or password!");
        return;
      }

      dispatch(setUser(user));
      navigate("/");
    } catch (err) {
      setError("Error accessing user data!" + err.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Sign In</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign In
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>New to Amazon Clone?</p>
            <Button variant="secondary" href="/signup" className="w-100">
              Create your Amazon Clone account
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
