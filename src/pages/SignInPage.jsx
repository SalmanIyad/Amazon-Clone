import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
  Image,
  CardText,
  CardLink,
} from "react-bootstrap";
import { setUser } from "../store/slices/userSlice"; // Assuming you have setUser action
import HrText from "../components/HrText";
import AmazonLogo from "../assets/Amazon_logo_light.svg";
import AuthPageFooter from "../components/AuthPageFooter";

const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/users`;

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedUserId = localStorage.getItem("userId");
  //   if (storedUserId) {
  //     fetch(`${apiUrl}/${storedUserId}`)
  //       .then(response => response.json())
  //       .then(user => {
  //         if (user) {
  //           dispatch(setUser(user));
  //           navigate("/");
  //         }
  //       });
  //   }
  // }, [dispatch, navigate]);

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
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (!user) {
        setError("Invalid email or password!");
        return;
      }

      dispatch(setUser(user));
      localStorage.setItem("userId", user.id);
      navigate("/");
    } catch (err) {
      setError("Error accessing user data!" + err.message);
    }
  };

  return (
    <>
      <Container className="my-4">
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
                Sign In
              </h2>
              <br />
              <Form onSubmit={handleSubmit}>
                <Form.Group className="my-3" controlId="formBasicEmail">
                  <Form.Label
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      display: "block",
                    }}
                  >
                    Email or mobile phone number
                  </Form.Label>
                  <Form.Control
                    id="email"
                    type="email"
                    placeholder="Enter your email"
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
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="warning" type="submit" className="w-100">
                  Continue
                </Button>

                <CardText
                  className="para_text"
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
                <b>Buying for work?</b>
                <br />
                <CardLink
                  href="https://www.amazon.com/business/register/org/landing?ref_=ap_altreg_ab"
                  style={{ textDecoration: "none" }}
                >
                  Shop on Amazon Business
                </CardLink>
              </div>
            </Card>
            <HrText text="New to Amazon?" />
            <div className="a-divider a-divider-break">
              <Link to={`/signup`}>
                <Button variant="outline-secondary" className="w-100">
                  Create your Amazon account
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
      <AuthPageFooter />
    </>
  );
}
