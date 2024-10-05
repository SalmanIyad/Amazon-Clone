import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ReorderIcon from "@mui/icons-material/Reorder";
import { Link } from "react-router-dom";
import "./OffcanvasTool.css";

function Offcanvastool() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <ReorderIcon style={{ color: "white" }} />
        <span className="blod">All</span>
      </Button>
      <Offcanvas show={show} onHide={handleClose} className="offcanvas-menu">
        <Offcanvas.Header closeButton className="offcanvas-header">
          <Offcanvas.Title>
            <h4 className="py-2">Hello, <Link to="/signin" style={{ color: "white", textDecoration: "underline" }}>Sign in</Link></h4>
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
                <Link to="/signin">Sign in</Link>
              </li>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Offcanvastool;
