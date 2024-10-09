import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Offcanvastool from "../NavbarBanner/OffcanvasTool";
import CategoriesList from "../../Categories/CategoriesList";
import amazonLogo from "../../../assets/amazonLogo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import "./NavbarBelt.css";
import SignOutButton from "../../SignOutButton";

export default function NavbarBelt() {
  const [searchQuery, setSearchQuery] = useState("");
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  const [t, i18n] = useTranslation();

  return (
    <>
      <div className="navbarBelt bg-dark d-none d-md-flex justify-content-between align-items-center ">
        <div className="leftNavbarBelt d-flex gap-2 justify-content-center align-items-center ">
          <div className="leftNavbarLogo  ">
            <Link to={"/"}>
              <img
                className="amazonLogoNavbar img-fluid d-flex align-items-center"
                src={amazonLogo}
                alt="amazonLogo"
              />
            </Link>
          </div>
          <div className="location">
            <span id="deliver" className="m-3">
              {" "}
              {t("navbarBelt.loction")}{" "}
            </span>
            <div className="d-flex flex-row">
              <LocationOnIcon />{" "}
              <p className="blod m-0 p-0">{t("navbarBelt.country")} </p>
            </div>
          </div>
        </div>

        <div className="navbarBeltSearchBox">
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <div>
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic-categories"
                >
                  {t("navbarBelt.all")}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <CategoriesList />
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <input
              className="form-control me-2"
              type="search"
              placeholder={t("navbarBelt.SearchAmazon")}
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="p-0 m-0"
              type="submit"
              value=""
              style={{ backgroundColor: "rgb(31 34 36)", border: "none" }}
            >
              <SearchIcon
                style={{
                  color: "black",
                  backgroundColor: "#c5a95c",
                  borderTopRightRadius: "6px",
                  borderBottomRightRadius: "6px",
                  position: "relative",
                  right: "16%",
                  padding: "0.4rem",
                  width: "3rem",
                  height: "3rem",
                }}
              />
            </button>
          </form>
        </div>

        <div className="rightNavbarBelt"></div>
       
        {i18n.language == "en" && 
          <button className="btn bg-dark p-2 text-white " style={{border:"0"}}
            onClick={() => {
              i18n.changeLanguage("ar");
            }}
          >
            {" "}
            <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  className="p-1"
                >
                  <rect
                    x="1"
                    y="4"
                    width="30"
                    height="24"
                    rx="4"
                    ry="4"
                    fill="#215230"
                  ></rect>
                  <path
                    d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                    opacity=".15"
                  ></path>
                  <path
                    d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                    fill="#fff"
                    opacity=".2"
                  ></path>
                  <path
                    d="M25.47,15.008c.105-.506-.616-3.171-.092-2.76,.071-.184-.288-.624-.39-.863-.362,1.107,.47,3.281,.2,4.749-.205,.431-1.607,.948-1.937,1.134,.74,.218,2.5-.651,2.218-2.26Z"
                    fill="#fff"
                  ></path>
                  <path
                    d="M10.505,16.004c.189-.342,.23-.711,.203-1.119,.285-.116,.625-.309,.739-.323-.078,.268,.108,.557,.485,.52,.075,2.143,.346,1.695,.235-.061,.244-.113,.285-.331,.376-.424,.529,.867,1.302-.28,.818-.752-.005,.039-.118,.415-.118,.415,0,0,.108,.114,.113,.17-.117,.14-.654,.045-.621-.172,.026-.059,.152-.363-.028-.182-.163,.166-.247,.518-.574,.578,.021-.738-.397-2.077-.198-2.519,.186,.233,.189,.069,.075-.16-.189-.337-.287-.981-.469-.283,.189,.786,.217,2.078,.349,2.962-.361-.07-.248-.325-.244-.489-.049-.033-.698,.313-.968,.396-.032-.274-.072-.521-.089-.724,1.012-.097,.623-1.314,.414-1.883,.025-.034,.297,.197,.133-.076-.251-.317-.358-.681-.477-.079,.157,.294,.301,1.089,.451,1.42-.103,.073-.337,.195-.569,.188,.019-.348-.281-1.172-.047-1.233,.161,.185,.185,.105,.072-.126-.195-.297-.349-1.048-.488-.321,.167,.343,.096,.842,.207,1.609-.632-.338-.133-1.385-.652-1.885-.024,.057-.13,.41-.13,.41,.515,.73-.338,2.343-1.17,1.331-.098-.544,.476-2.27-.336-.957-.16,.529-.555,2.134-1.013,.927-.089-.336,.098-1.28-.115-.503-.119,.293,.045,1.443,.567,1.308,.471-.253,.488-1.453,.854-1.754-.724,1.53,.977,2.599,1.429,.747,.013,.287,.224,.749,.612,.848,.023,.228,.06,.525,.094,.838-.072,.022-.144,.042-.217,.059-.605-1.576-2.019,.892-.179,.401,.024,.072,.04,.143,.042,.207-.852,1.187-3.966,1.185-1.934-.889,.066,.024,.191,.147,.18,.158,.073-.112,.11-.232-.09-.308,.33-.876-.875-.159-.14,.119-.149,.156-.5,.385-.715,.519-.167,.094-.68,.407-.803,.479-.057,.104,.455-.213,.61-.266-1.488,2.836,2.314,2.381,3.326,.88Zm-3.208-.938c.106-.053,.207-.104,.29-.15-1.363,2.364,2.618,1.812,2.664,.131,.069-.021,.138-.044,.208-.068,.024,.255,.041,.505,.042,.723-.365,.429-1.203,.928-1.945,1.131-1.368,.433-1.852-.966-1.259-1.766Z"
                    fill="#fff"
                  ></path>
                  <path
                    d="M16.342,16.611c.242-.267,1.915-.721,2.199-.864,.025-.071,.148-.321,.156-.373-.557,.05-2.089,.134-2.7,.103,.126-.108,.736-.422,1.182-.554,.042,.074,.073,.148,.079,.212,.032-.033,.056-.142,.048-.253,.293-.093,.443-.124,.508-.142,.041-.053,.114-.268,.125-.425-.359-.659-1.502-.446-.957,.322-.457,.192-1.222,.541-1.44,.856l-.035,.017c-.009,.017-.069,.266-.089,.343-.262-.782-.341-1.798-.795-2.093-.247,.506,.507,1.512,.517,2.056-.142,.33-1.991,1.757-2.309,.939,1.134-.431,2.304-1.185,1.336-2.289-.01-.041,.115,.017,.188,.02,.053-.113-.348-.347-.448-.46-.089-.016-.103,.303-.102,.38,.123,.179,.492,.887,.586,1.102-.139,.177-.837,.553-1.518,.863,.005-.176,.414-.656,.299-.786-.283,.515-.322-.323-.122-.485,.201-.642-.663,.951-.09,.897-.06,.114-.134,.253-.187,.419-.792,.369-2,.72-2.528,.893,.029-.094,.025-.174-.006-.15-.542,.637-.017-.81-.096-.67-.302,.23-.48,1.59,.087,.861,.44-.099,1.918-.203,2.471-.534,.084,1.499,2.627-.297,2.513-1.062,.064,.906,.55,1.539,1.847,1.609,.003-.103-.038-.425-.038-.425-.164-.023-.579-.086-.68-.326Zm-.913-.73c.257,.005,1.655-.032,1.921-.04-.491,.171-1.171,.271-1.14,.96-.403-.091-.624-.464-.781-.92Z"
                    fill="#fff"
                  ></path>
                  <path
                    d="M12.822,13.817c.459-.246,.482-1.398,.854-1.685-.765,1.473,1.05,2.445,1.404,.667,.322,1.701,2.18,.64,1.302-.691-.241-.549,.228,.023,.066-.334-.251-.316-.358-.681-.477-.079,.16,.291,.317,1.085,.451,1.42-1.359,.72-.927-1.166-1.428-1.825-.024,.057-.13,.41-.13,.41,.838,1.883-1.884,2.344-.998,.137-.447-.722-.639,1.657-1.145,1.614-.411,0-.413-.913-.358-1.107-.292,.019-.146,1.653,.458,1.473Z"
                    fill="#fff"
                  ></path>
                  <path
                    d="M23.777,14.233c.057,.949,.148,1.852,.117,2.524,.349-.356,.155-1.494,.145-2.223,.438,.519,.919,1.113,1.024,1.678,.013,.036,.069-.11,.06-.338,.048-.4-.665-1.312-1.115-1.788,.058-.461-.361-1.665-.114-1.934,.161,.186,.185,.105,.072-.126-.194-.304-.337-1.009-.476-.298,.17,.367,.134,1.245,.25,2.057-.385-.43-.627-.687-.828-.906,.011-.189-.181-.792,.017-.716,.161,.185,.185,.105,.072-.127-.205-.324-.348-1.024-.491-.286,.133,.193,.073,.417,.129,.814-.3-.442-.684-.627-.168-.578-.212-.149-1.029-.919-.813-.171,.305,.143,.63,.818,1.022,1.192,.063,.847,.258,2.221,.288,3.015-.809,.711-.96,.011-1.425-.246,.002-.225-.005-.444-.005-.573,.11-.505-.579-3.324-.041-2.908-.042-.23-.467-1.414-.568-.555,.225,.773,.255,2.393,.371,3.462,.011,.101,.024,.291,.035,.497-.002,0-.003-.001-.004-.002-.664,.19-.965,2.265-1.701,1.066,1.334-1.002,.41-3.321,.327-4.613,.008-.082,.139,.112,.207,.126,.049-.187-.281-.67-.399-.912-.476,.972,.751,3.11,.284,4.421,.061-.629-.685-1.392-1.221-1.883,.048-.267-.519-2.128-.024-1.609,.045-.023-.005-.16-.067-.282-.198-.331-.312-.975-.476-.273,.137,.173,.197,1.62,.287,1.904-.317-.37-1.855-1.462-1.123-1.362-.006-.02-.038-.068-.119-.117-.276-.09-.873-.788-.694-.054,.038,.003,.106,.049,.155,.107,.379,.518,1.263,1.37,1.843,1.886,.221,2.776,.599,3.546,.278,.267,.461,.469,.995,.976,1.103,1.565-.097,.201-.238,.38-.445,.525-.058-.379,.005-.686-.05-.715-.115,.07-.081,.556-.059,.79-1.629,.876-1.893,1.088,.063,.311,.679,1.706,1.129-.408,1.804-.783,.018,.016,.033,.025,.051,.04,.007,.215,.008,.399-.001,.459,.09-.001,.139-.14,.165-.33,1.967,1.537,1.697-1.371,1.455-2.888,.33,.384,.542,.608,.806,.888Z"
                    fill="#fff"
                  ></path>
                  <path
                    d="M22.159,20.66h0s-1.5,0-1.5,0c.115-.083,.176-.205,.159-.327-.01-.077-.087-.135-.181-.143h-.047c-.114,.011-.196,.093-.184,.183l.005,.035,.006,.053c.006,.067,0,.134-.019,.199H9.313c.165,.24,.465,.386,.789,.386l10.116-.006c-.116,.083-.176,.205-.16,.328,.012,.09,.114,.154,.227,.143,.114-.011,.196-.093,.184-.183l-.005-.035-.006-.053c-.006-.067,0-.134,.019-.2h1.248s.035,.058,.035,.058c.031,.053,.071,.1,.117,.142l.064,.053h0c.126,.088,.287,.14,.456,.14,.16,0,.289-.111,.289-.248v-.072c0-.25-.237-.453-.529-.453Z"
                    fill="#fff"
                  ></path>
                </svg>AR
          </button>
        }
       {i18n.language =='ar'&& <button className="btn bg-dark p-2 text-white " style={{border:"0"}}
          onClick={() => {
            i18n.changeLanguage("en");
          }}
        >
          {" "}
          <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  className="p-1"
                >
                  <rect
                    x="1"
                    y="4"
                    width="30"
                    height="24"
                    rx="4"
                    ry="4"
                    fill="#fff"
                  ></rect>
                  <path
                    d="M1.638,5.846H30.362c-.711-1.108-1.947-1.846-3.362-1.846H5c-1.414,0-2.65,.738-3.362,1.846Z"
                    fill="#a62842"
                  ></path>
                  <path
                    d="M2.03,7.692c-.008,.103-.03,.202-.03,.308v1.539H31v-1.539c0-.105-.022-.204-.03-.308H2.03Z"
                    fill="#a62842"
                  ></path>
                  <path fill="#a62842" d="M2 11.385H31V13.231H2z"></path>
                  <path
                    fill="#a62842"
                    d="M2 15.077H31V16.923000000000002H2z"
                  ></path>
                  <path fill="#a62842" d="M1 18.769H31V20.615H1z"></path>
                  <path
                    d="M1,24c0,.105,.023,.204,.031,.308H30.969c.008-.103,.031-.202,.031-.308v-1.539H1v1.539Z"
                    fill="#a62842"
                  ></path>
                  <path
                    d="M30.362,26.154H1.638c.711,1.108,1.947,1.846,3.362,1.846H27c1.414,0,2.65-.738,3.362-1.846Z"
                    fill="#a62842"
                  ></path>
                  <path
                    d="M5,4h11v12.923H1V8c0-2.208,1.792-4,4-4Z"
                    fill="#102d5e"
                  ></path>
                  <path
                    d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                    opacity=".15"
                  ></path>
                  <path
                    d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                    fill="#fff"
                    opacity=".2"
                  ></path>
                  <path
                    fill="#fff"
                    d="M4.601 7.463L5.193 7.033 4.462 7.033 4.236 6.338 4.01 7.033 3.279 7.033 3.87 7.463 3.644 8.158 4.236 7.729 4.827 8.158 4.601 7.463z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M7.58 7.463L8.172 7.033 7.441 7.033 7.215 6.338 6.989 7.033 6.258 7.033 6.849 7.463 6.623 8.158 7.215 7.729 7.806 8.158 7.58 7.463z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M10.56 7.463L11.151 7.033 10.42 7.033 10.194 6.338 9.968 7.033 9.237 7.033 9.828 7.463 9.603 8.158 10.194 7.729 10.785 8.158 10.56 7.463z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M6.066 9.283L6.658 8.854 5.927 8.854 5.701 8.158 5.475 8.854 4.744 8.854 5.335 9.283 5.109 9.979 5.701 9.549 6.292 9.979 6.066 9.283z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M9.046 9.283L9.637 8.854 8.906 8.854 8.68 8.158 8.454 8.854 7.723 8.854 8.314 9.283 8.089 9.979 8.68 9.549 9.271 9.979 9.046 9.283z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M12.025 9.283L12.616 8.854 11.885 8.854 11.659 8.158 11.433 8.854 10.702 8.854 11.294 9.283 11.068 9.979 11.659 9.549 12.251 9.979 12.025 9.283z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M6.066 12.924L6.658 12.494 5.927 12.494 5.701 11.799 5.475 12.494 4.744 12.494 5.335 12.924 5.109 13.619 5.701 13.19 6.292 13.619 6.066 12.924z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M9.046 12.924L9.637 12.494 8.906 12.494 8.68 11.799 8.454 12.494 7.723 12.494 8.314 12.924 8.089 13.619 8.68 13.19 9.271 13.619 9.046 12.924z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M12.025 12.924L12.616 12.494 11.885 12.494 11.659 11.799 11.433 12.494 10.702 12.494 11.294 12.924 11.068 13.619 11.659 13.19 12.251 13.619 12.025 12.924z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M13.539 7.463L14.13 7.033 13.399 7.033 13.173 6.338 12.947 7.033 12.216 7.033 12.808 7.463 12.582 8.158 13.173 7.729 13.765 8.158 13.539 7.463z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M4.601 11.104L5.193 10.674 4.462 10.674 4.236 9.979 4.01 10.674 3.279 10.674 3.87 11.104 3.644 11.799 4.236 11.369 4.827 11.799 4.601 11.104z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M7.58 11.104L8.172 10.674 7.441 10.674 7.215 9.979 6.989 10.674 6.258 10.674 6.849 11.104 6.623 11.799 7.215 11.369 7.806 11.799 7.58 11.104z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M10.56 11.104L11.151 10.674 10.42 10.674 10.194 9.979 9.968 10.674 9.237 10.674 9.828 11.104 9.603 11.799 10.194 11.369 10.785 11.799 10.56 11.104z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M13.539 11.104L14.13 10.674 13.399 10.674 13.173 9.979 12.947 10.674 12.216 10.674 12.808 11.104 12.582 11.799 13.173 11.369 13.765 11.799 13.539 11.104z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M4.601 14.744L5.193 14.315 4.462 14.315 4.236 13.619 4.01 14.315 3.279 14.315 3.87 14.744 3.644 15.44 4.236 15.01 4.827 15.44 4.601 14.744z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M7.58 14.744L8.172 14.315 7.441 14.315 7.215 13.619 6.989 14.315 6.258 14.315 6.849 14.744 6.623 15.44 7.215 15.01 7.806 15.44 7.58 14.744z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M10.56 14.744L11.151 14.315 10.42 14.315 10.194 13.619 9.968 14.315 9.237 14.315 9.828 14.744 9.603 15.44 10.194 15.01 10.785 15.44 10.56 14.744z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M13.539 14.744L14.13 14.315 13.399 14.315 13.173 13.619 12.947 14.315 12.216 14.315 12.808 14.744 12.582 15.44 13.173 15.01 13.765 15.44 13.539 14.744z"
                  ></path>
                </svg> EN
        </button>}
        <div className="dropdown">
          <Dropdown>
            <div className="DropdownToggle d-flex  flex-row text-start p-0 ">
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {user ? (
                  <p className="p-0 m-0">Hello, {user.name}</p>
                ) : (
                  <p className="p-0 m-0">
                    {t('navbarBelt.hello')} <Link to={"/signin"} className="mt-1 text-capitalize" style={{ color: "white", textDecoration: "underline" }}>{t('navbarBelt.signin')}</Link>
                  </p>
                )}
                <Link to={"/account"}>
                  <span className="blod text-white">{t('navbarBelt.Account&Lists')}</span>
                </Link>
              </Dropdown.Toggle>
            </div>
            <Dropdown.Menu>
              <Dropdown.Item><Link to={"/account"}>My Account</Link></Dropdown.Item>
              <Dropdown.Item><Link to={"/profile"}>My Profile</Link></Dropdown.Item>
              {(user?.role === 'admin') && <Dropdown.Item><Link to={"/admin"}>Dashboard</Link></Dropdown.Item>}
              <Dropdown.Item><SignOutButton/></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="returnsOrders">
          <Link to={"/orders"} className="text-decoration-none ">
            <p className="p-0 m-0">{t('navbarBelt.Returns')}</p>
            <span className="font-wight-blod ">{t('navbarBelt.Orders')}</span>
          </Link>
        </div>
        <Link id="cart" to="/cart">
          <div className="ShoppingCart">
            <span id="cartItems">{cartItems.length}</span>
            <ShoppingCartOutlinedIcon
              style={{ color: "white", fontSize: "2rem" }}
            />
            {t('navbarBelt.cart')}
          </div>
        </Link>
      </div>
      <Navbar expand="lg" className="bg-dark  d-md-none p-0 " variant="dark">
        <Container className="d-flex p-0 m-0">
          <div className="d-flex align-items-center p-0 ">
            <Offcanvastool />
            <Navbar.Brand className="d-flex align-items-center">
              <Link to={"/"}>
                <img
                  className="amazonLogoNavbarMoblie mt-3  img-fluid"
                  src={amazonLogo}
                  alt="amazonLogo"
                />
              </Link>
            </Navbar.Brand>
          </div>

          <div className="navbarBeltmb d-flex flex-row justify-content-end align-items-center">
           
           
            {user ? (
              <Link to="/profile" className="mt-1 text-capitalize" style={{ color: "white" }}>
                Hello, {user.name}
                <PersonOutlineIcon style={{ fontSize: "1.6rem" }} />
              </Link>
            ) : (
              <Link to="/signin" className="mt-1" style={{ color: "white" }}>
                {t('navbarBelt.signin')}
                <PersonOutlineIcon style={{ fontSize: "1.6rem" }} />               </Link>
            )}
            <Link id="cart" to="/cart">
              <div className="ShoppingCart">
                <span id="cartItems">{cartItems.length}</span>
                <ShoppingCartOutlinedIcon
                  style={{ color: "white", fontSize: "2rem" }}
                />
               {t('navbarBelt.cart')}
              </div>
            </Link>
          </div>

          <div className="navbarBeltMbSearchBox w-100 p-2 ">
            <form className="d-flex " role="search">
              <input
                className="form-controlMobile "
                type="search"
                placeholder={t("navbarBelt.SearchAmazon")}
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                value=""
                style={{ backgroundColor: "rgb(31 34 36)", border: "none" }}
              >
                <SearchIcon
                  style={{
                    color: "black",
                    backgroundColor: "#c5a95c",
                    borderRadius: "0.375rem",
                    position: "relative",
                    right: "10%",
                    padding: "0.4rem",
                    width: "3rem",
                    height: "3rem",
                  }}
                />
              </button>
            </form>
       
          </div>
        </Container>
      </Navbar>
    </>
  );
}
