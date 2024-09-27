import { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignOutButton from "./SignOutButton";
import AmazonLogo from "../assets/amazonLogo.png";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.currentUser);
  // const navigate = useNavigate();

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
  //     setSearchQuery(""); 
  //   }
  // };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Navbar.Brand as={Link} to="/">
        <Image src={AmazonLogo} alt="Amazon Logo" height={40} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form
          className="d-flex align-items-center mx-auto"
          // onSubmit={handleSearch}
        >
          <FormControl
            type="text"
            placeholder="Search for products"
            className="me-2" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-light" type="submit">
            Search
          </Button>
        </Form>

        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/products">
            Products
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            Cart ({cartItems.length})
          </Nav.Link>
          {user ? (
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                Hello, {user.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/account">
                  Account
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/orders">
                  Your Orders
                </Dropdown.Item>
                <Dropdown.Item onClick={SignOutButton}>Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav.Link as={Link} to="/signin">
              Sign In
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
