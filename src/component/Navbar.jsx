import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../App";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { toast } from "react-toastify";
import logoImg from '../assets/logo-img.png';
import LoginForm from "./LoginForm";

const Navbar = ({ isLoggedin, setisLoggedin, formVisible, setformVisible }) => {
  const { cartcount } = useContext(ProductContext);

  function handleLoginClick() {
    if (isLoggedin) {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (confirmLogout) {
        setisLoggedin(false);
        localStorage.removeItem("currentUser");
        setformVisible(false);
        toast("Logged out successfully!", {
          position: "top-center",
          type: "success",
          theme: "light",
          hideProgressBar: true,
        });
      }
    } else {
      setformVisible(true);
    }
  }

  const [showCart, setshowCart] = useState(false);

  function cartShowFun() {
    if (isLoggedin) {
      setshowCart(true);
    } else {
      toast(`Login required to access cart!`, {
        position: "top-center",
        type: "error",
        theme: "light",
        hideProgressBar: true,
      });
      setshowCart(false);
    }
  }

  return (
    <div className="header">
      <p id="top-nav">
        New Season coming! Discount for all products! Check Now
      </p>
      <div className="navbar container">
        <Link to="/">
          <span className="logo">
            <img src={logoImg} alt="logo-img" id='logo-img'/>Orderly
          </span>
        </Link>
        <div id="login-cart">
          <button className="login-btn" onClick={handleLoginClick}>
            {isLoggedin ? "LogOut" : "Login"}{" "}
          </button>

          <Link to={showCart ? "/cart" : ""} onClick={cartShowFun}>
            <HiMiniShoppingCart className="cart-icon" />

            <span id="cart-count">{cartcount}</span>

            <span id="cart-txt">Cart</span>
          </Link>
        </div>

        {formVisible && (
          <>
            <div className="overlay">
              <LoginForm
                setformVisible={setformVisible}
                isLoggedin={isLoggedin}
                setisLoggedin={setisLoggedin}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
