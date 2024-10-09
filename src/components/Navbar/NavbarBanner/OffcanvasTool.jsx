import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ReorderIcon from "@mui/icons-material/Reorder";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./OffcanvasTool.css";
import { useSelector } from "react-redux";
import SignOutButton from "../../SignOutButton";

function Offcanvastool() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector((state) => state.user.currentUser);
  const [t, i18n] = useTranslation();

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <ReorderIcon style={{ color: "white" }} />
        <span className="blod">{t('navbarBanner.All')}</span>
      </Button>
      <Offcanvas show={show} onHide={handleClose} className="offcanvas-menu">
        <Offcanvas.Header closeButton className="offcanvas-header">
          <Offcanvas.Title>
            {user ? (
              <Link to="/profile" className="mt-1 text-capitalize" style={{ color: "white" }}>
                {t('offcanvas.Hello,')} {user.name}
              </Link>
            ) : (
              <Link to="/signin" className="mt-1" style={{ color: "white" }}>
                 {t('offcanvas.Hello,')} Sign in
              </Link>
            )}
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <div className="offcanvas-section">
            <h5>{t('offcanvas.Digital Content & Devices')}</h5>
            <ul className="offcanvas-list">
              <li>
                <Link to="#">{t('offcanvas.Amazon Music')}</Link>
              </li>
              <li>
                <Link to="#">{t('offcanvas.Kindle E-readers & Books')}</Link>
              </li>
              <li>
                <Link to="#">{t('offcanvas.Amazon Appstore')}</Link>
              </li>
            </ul>
          </div>
          <div className="offcanvas-section">
            <h5>{t('offcanvas.Shop by Department')}</h5>
            <ul className="offcanvas-list">
              <li>
                <Link to="#">{t('offcanvas.Electronics')}</Link>
              </li>
              <li>
                <Link to="#">{t('offcanvas.Computers')}</Link>
              </li>
              <li>
                <Link to="#">{t('offcanvas.Smart Home')}</Link>
              </li>
              <li>
                <Link to="#">{t('offcanvas.Arts & Crafts')}</Link>
              </li>
              <li>
                <Link to="/products">{t('offcanvas.See all')}</Link>
              </li>
            </ul>
          </div>
          <div className="offcanvas-section">
            <h5>{t('offcanvas.Help & Settings')}</h5>
            <ul className="offcanvas-list">
              <li>
                <Link to="/account">{t('offcanvas.Your Account')}</Link>
              </li>
              <li>
                <Link to="#">{t('offcanvas.lang')}</Link>
              </li>
              <li>
                <Link to="#">{t('offcanvas.United States')}</Link>
              </li>
              <li>
                <Link to="#">{t('offcanvas.Customer Service')}</Link>
              </li>
              <li>
                {user ? <SignOutButton/> : <Link to="/signin">{t('offcanvas.Sign in')}</Link>}
              </li>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Offcanvastool;
