import React from "react";
import { Link } from "react-router-dom";
import iconPay01 from "../assets/icon-pay-01.png";
import iconPay02 from "../assets/icon-pay-02.png";
import iconPay03 from "../assets/icon-pay-03.png";
import iconPay04 from "../assets/icon-pay-04.png";
import logoImgWhite from '../assets/logoImg-white.png'
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>
              We are dedicated to providing the best products and services to
              our customers. Quality and customer satisfaction are our top
              priorities.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon">
                <img src={iconPay01} alt="" />
              </a>
              <a href="#" className="social-icon">
                <img src={iconPay02} alt="" />
              </a>
              <a href="#" className="social-icon">
                <img src={iconPay03} alt="" />
              </a>
              <a href="#" className="social-icon">
                <img src={iconPay04} alt="" />
              </a>
            </div>
            <div>
              <Link to="/">
          <span className="footer-logo">
            <img src={logoImgWhite} alt="logo-img" id='footer-logo-img'/>Orderly
          </span>
        </Link>
            </div>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Track Order</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Shipping Info</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Newsletter</h3>
            <p>
              Subscribe to get updates on new products and exclusive offers!
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2025 Orderly. All rights reserved. | {}
            <a href="#"> Privacy Policy</a> | <a href="#"> Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
