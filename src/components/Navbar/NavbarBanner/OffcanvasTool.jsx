import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ReorderIcon from "@mui/icons-material/Reorder";
import { Link } from "react-router-dom";
import "./OffcanvasTool.css";
import { useSelector } from "react-redux";
import SignOutButton from "../../SignOutButton";

function Offcanvastool() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <ReorderIcon style={{ color: "white" }} />
        <span className="blod">All</span>
      </Button>
      <Offcanvas show={show} onHide={handleClose} className="offcanvas-menu">
        <Offcanvas.Header closeButton className="offcanvas-header">
          <Offcanvas.Title>
            {user ? (
              <Link to="/profile" className="mt-1 text-capitalize" style={{ color: "white" }}>
                Hello, {user.name}
              </Link>
            ) : (
              <Link to="/signin" className="mt-1" style={{ color: "white" }}>
                 Hello, Sign in
              </Link>
            )}
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <div className="offcanvas-section">
            <h5>Digital Content & Devices</h5>
            <ul className="offcanvas-list">
              <li>
                <Link to="#">Amazon Music</Link>
              </li>
              <li>
                <Link to="#">Kindle E-readers & Books</Link>
              </li>
              <li>
                <Link to="#">Amazon Appstore</Link>
              </li>
            </ul>
          </div>
          <div className="offcanvas-section">
            <h5>Shop by Department</h5>
            <ul className="offcanvas-list">
              <li>
                <Link to="#">Electronics</Link>
              </li>
              <li>
                <Link to="#">Computers</Link>
              </li>
              <li>
                <Link to="#">Smart Home</Link>
              </li>
              <li>
                <Link to="#">Arts & Crafts</Link>
              </li>
              <li>
                <Link to="/products">See all</Link>
              </li>
            </ul>
          </div>
          <div className="offcanvas-section">
            <h5>Help & Settings</h5>
            <ul className="offcanvas-list">
              <li>
                <Link to="/account">Your Account</Link>
              </li>
              <li>
                <Link to="#">English</Link>
              </li>
              <li>
                <Link to="#">United States</Link>
              </li>
              <li>
                <Link to="#">Customer Service</Link>
              </li>
              <li>
                {user ? <SignOutButton/> : <Link to="/signin">Sign In</Link>}
              </li>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Offcanvastool;
