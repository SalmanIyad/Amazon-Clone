import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import Offcanvastool from "./OffcanvasTool";
import "./NavbarBanner.css";

export default function NavbarBanner() {
  return (
    <>
      <div className="navbarBanner d-none d-md-flex p-1 align-items-center">
        <Offcanvastool />
        <div className="navbarLinks">
          <a href="#">Today’s Deals</a>
          <a href="#">Customer Service</a>
          <a href="#">Registry</a>
          <a href="#">Gift Cards</a>
          <a href="#">Sell</a>
          <Link to="/products">All Products</Link>
        </div>
      </div>

      <div className="navbarBanner bg-dark d-md-none p-2 align-items-center">
        <div className="navbarLinks">
          <a href="#">Today’s Deals</a>
          <a href="#">Customer Service</a>
          <a href="#">Registry</a>
          <Link to="/products">All Products</Link>
        </div>
      </div>

      <p className="NavBannerp d-md-none">
        <LocationOnIcon style={{ fontSize: "1.1rem" }} />
        Deliver to Palestinian Territories
      </p>
    </>
  );
}
