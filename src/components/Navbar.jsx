import styles from "../css/Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [cookies, setAuthCookie, removeAuthCookie] = useCookies(["authToken"]);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the JWT (authToken cookie) from the browser
    removeAuthCookie("authToken");
    window.localStorage.clear();
    setShowDropdown(false);
    navigate("/login"); // Redirect the user to the login page after logout
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const closeDropDown = () => {
    setShowDropdown(false);
  };
  return (
    <div className={styles.contain}>
      <div className={styles.logo}>LOGO</div>
      {showDropdown ? (
        <ToggleOnIcon className={styles.toggle} onClick={toggleDropdown} />
      ) : (
        <ToggleOffIcon className={styles.toggle} onClick={toggleDropdown} />
      )}
      <div className={showDropdown ? styles.rNavlinks : styles.navlinks}>
        <Link onClick={closeDropDown} to="/">
          All Products
        </Link>
        <Link onClick={closeDropDown} to="/categories">
          Categories
        </Link>
        {!cookies.authToken ? (
          
          <Link onClick={closeDropDown} to="/login">
            LogIn
          </Link>
        ) : (
          <>
          <Link
            onClick={closeDropDown}
            to={window.localStorage.getItem("userID") ? "/user/profile" : "/store"}
          >
            {window.localStorage.getItem("userID") ?<> {"Profile"}<ShoppingCartIcon/></>: "Your Store"}
          </Link></>
        )}
        {cookies.authToken ? (
          <Link to="/login" onClick={handleLogout}>
            LogOut
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
