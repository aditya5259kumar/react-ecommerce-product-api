import React from "react";
import hero1 from '../assets/thumbnail1.webp';
import hero2 from '../assets/thumbnail2.webp';
import hero3 from '../assets/thumbnail3.webp';
import hero4 from '../assets/thumbnail4.webp';
import { FaArrowRight } from "react-icons/fa6";


const Hero = () => {
  return (
    <div>
      <section className="hero-section bg-pattern">
        <div className="hero-container container">
          <div className="hero-content">
            <span className="hero-badge">✨ New Season Coming</span>

            <h1 className="hero-title">
              Discover Your Perfect <span className="highlight">Lifestyle</span>
            </h1>

            <p className="hero-description">
              From luxury perfumes to home essentials, explore our curated
              collection of premium products. Quality meets affordability in
              every category.
            </p>

            <div className="hero-buttons">
              <a className="shop-now-btn" href="#page-products">Shop Now</a>
            </div>
          </div>

          <div className="hero-image">
            <a href="#category-fragrances" className="hero-product-card">
              <span className="hero-product-icon">
                <img src={hero2} alt="hero1" className="hero-product-img"/>
              </span>
              <div className="hero-product-name">Perfumes <span className="hero-product-arrow"><FaArrowRight/></span></div>
              <div className="hero-product-desc">Luxury fragrances from top brands</div>
            </a>

            <a href="#category-beauty" className="hero-product-card">
              <span className="hero-product-icon">
                <img src={hero1} alt="hero4" className="hero-product-img"/>
              </span>
              <div className="hero-product-name">Makeup <span className="hero-product-arrow"><FaArrowRight/></span></div>
              <div className="hero-product-desc">Premium beauty products</div>
            </a>

            <a href="#category-furniture" className="hero-product-card">
              <span className="hero-product-icon">
                <img src={hero3} alt="hero2" className="hero-product-img"/>
              </span>
              <div className="hero-product-name">Furniture <span className="hero-product-arrow"><FaArrowRight/></span></div>
              <div className="hero-product-desc">Stylish & comfortable pieces</div>
            </a>

            <a href="#category-groceries" className="hero-product-card">
              <span className="hero-product-icon">
                <img src={hero4} alt="hero3" className="hero-product-img"/>
              </span>
              <div className="hero-product-name">Groceries <span className="hero-product-arrow"><FaArrowRight/></span></div>
              <div className="hero-product-desc">Fresh & organic essentials</div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
