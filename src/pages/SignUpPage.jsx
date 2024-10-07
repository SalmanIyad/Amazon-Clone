import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Image,
  Card,
  CardText,
  CardLink,
} from "react-bootstrap";
import { setUser } from "../store/slices/userSlice";
import AmazonLogo from "../assets/Amazon_logo_light.svg";
import AuthPageFooter from "../components/AuthPageFooter";
import { Link } from 'react-router-dom';

const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/users`;

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Error creating user.");
      }

      const newUser = await response.json();
      dispatch(setUser(newUser));
      localStorage.setItem("userId", newUser.id);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Container className="my-3">
        <Row className="justify-content-center">
          <Col lg={4} md={6} className="text-center">
          <div className="text-center">
              <Image
                src={AmazonLogo}
                alt="Amazon Logo"
                className="mb-2"
                style={{ width: "30%" }}
              />
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Card className="p-4">
              <h2 className="text-left" style={{ textAlign: "left" }}>
                Create account
              </h2>
              <br />
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "block",
                    }}
                  >
                    Your Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First and last name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "block",
                    }}
                  >
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "block",
                    }}
                  >
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "block",
                    }}
                  >
                    Re-enter password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="warning" type="submit" className="w-100">
                  Continue
                </Button>
                <CardText
                  class="para_text"
                  style={{ marginTop: "2em", textAlign: "left" }}
                >
                  By continuing, you agree to Amazon&apos;s{" "}
                  <a
                    href="https://www.amazon.com/gp/aw/help/ref=ap_mobile_register_notification_condition_of_use?id=508088"
                    target="blank"
                  >
                    Conditions of Use
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.amazon.com/gp/aw/help/ref=ap_mobile_register_notification_privacy_notice?id=468496"
                    target="blank"
                  >
                    Privacy Notice
                  </a>
                  .
                </CardText>
              </Form>
              <div className="mt-3" style={{ textAlign: "left" }}>
                <i
                  className="fa-solid fa-caret-right"
                  style={{ color: "grey" }}
                ></i>
                <a href="" className="text-decoration-none">
                  Need help?
                </a>
                <br />
                <hr />
                <b>Bying for work?</b>
                <br />
                <CardLink
                  href="https://www.amazon.com/business/register/org/landing?ref_=ap_altreg_ab"
                  style={{ textDecoration: "none" }}
                >
                  Create a free business account
                </CardLink>
                <br />
                <hr />
                <span>Already have an account?</span>{" "}
                <Link to={`/signin`}>
                  Sign in
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
      <AuthPageFooter />
    </>
  );
}
