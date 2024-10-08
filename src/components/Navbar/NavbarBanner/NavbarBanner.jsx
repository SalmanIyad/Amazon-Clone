import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import Offcanvastool from "./OffcanvasTool";
import { useTranslation } from "react-i18next";

import "./NavbarBanner.css";

export default function NavbarBanner() {
  const [t, i18n] = useTranslation();
  return (
    <>
      <div className="navbarBanner d-none d-md-flex p-1 align-items-center">
        <Offcanvastool />
        <div className="navbarLinks">
          <a href="#">{t('navbarBanner.TodaysDeals')}</a>
          <a href="#">{t('navbarBanner.CustomerService')}</a>
          <a href="#">{t('navbarBanner.Registry')}</a>
          <a href="#">{t('navbarBanner.GiftCards')}</a>
          <a href="#">{t('navbarBanner.Sell')}</a>
          <Link to="/products">{t('navbarBanner.AllProducts')}</Link>
        </div>
      </div>

      <div className="navbarBanner bg-dark d-md-none p-2 align-items-center">
        <div className="navbarLinks">
        <a href="#">{t('navbarBanner.TodaysDeals')}</a>
          <a href="#">{t('navbarBanner.CustomerService')}</a>
          <a href="#">{t('navbarBanner.Registry')}</a>
          <Link to="/products">{t('navbarBanner.AllProducts')}</Link>
        </div>
      </div>

      <p className="NavBannerp d-md-none">
        <LocationOnIcon style={{ fontSize: "1.1rem" }} />
       {t('navbarBanner.loction')} 
      </p>
    </>
  );
}
