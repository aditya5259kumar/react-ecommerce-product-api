import React, { useState, useContext } from "react";
import { ProductContext } from "../App";
import "./ProductPage.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { GoStarFill } from "react-icons/go";
import { MdOutlineInventory } from "react-icons/md";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const Productpage = () => {
  const { id } = useParams();

  const { Data, cartcount, setcartcount, cartItems, setcartItems } =
    useContext(ProductContext);

  const singleProduct = Data.find((item) => item.id === Number(id));

  if (!Data.length) {
    return (
      <div className="laoding">
        <h1>Loading...</h1>
      </div>
    );
  }

  const [mianImage, setmianImage] = useState(singleProduct.thumbnail);

  function ChangeToMainImg(image) {
    setmianImage(image);
  }

  const [cartcheck, setcartcheck] = useState(false);

  function addtocart() {
    if (!cartItems.includes(singleProduct.id)) {
      setcartcheck(true);
      setcartcount(cartcount + 1);
      setcartItems([...cartItems, singleProduct.id]);
      toast(`Product added to your cart 🛒`, {
        position: "top-center",
        type: "success",
        theme: "light",
      });
    } else {
      toast(`This product is already in your cart`, {
        position: "top-center",
        type: "info",
        theme: "light",
      });
    }
  }

  // console.log(cartItems)
  // console.log(...cartItems)

  return (
    <>
      <div className="ProductPage-details">
        <Link to={"/"} style={{ display: "block" }}>
          <IoArrowBackOutline id="back-arrow" />
        </Link>

        <div className="ProductPage-container container">
          <div className="ProductPage-image-section">
            <div className="more-product-images">
              {singleProduct.images.map((item, index) => (
                <img
                  src={item}
                  alt={singleProduct.title}
                  key={index}
                  onMouseEnter={() => ChangeToMainImg(item)}
                />
              ))}
            </div>

            <div className="ProductPage-img-container">
              <img className="main-img" src={mianImage} alt="" />
            </div>
          </div>

          <div className="about-ProductPage">
            <h2 className="ProductPage-title">{singleProduct.title}</h2>

            <div className="ProductPage-rating">
              <div id="discount-div">
                <span className="ProductPage-discountPercentage">
                  {" "}
                  {Math.round(singleProduct.discountPercentage)}% off
                </span>
                <span className="ProductPage-price">
                  ${singleProduct.price}
                </span>
              </div>

              <div id="stock-rating">
                <div
                  className="ProductPage-stock"
                  style={{
                    color:
                      singleProduct.availabilityStatus === "Low Stock"
                        ? "crimson"
                        : "",
                  }}
                >
                  <MdOutlineInventory />
                  {singleProduct.availabilityStatus === "In Stock"
                    ? "In Stock"
                    : "Low Stock"}
                </div>

                <span className="ProductPage-rating-star">
                  {singleProduct.rating.toFixed(1)}
                  <GoStarFill /> / 5<GoStarFill />
                </span>
                <div className="ProductPage-warrenty">
                  <AiOutlineFileProtect />
                  {singleProduct.warrantyInformation}
                </div>
              </div>
            </div>

            <div className="ProductPage-desc">
              <h4>Description:</h4>
              <p className="ProductPage-text">{singleProduct.description}</p>
            </div>

            <div className="ProductPage-buy-or-cart">
              <button id="ProductPage-buy-btn">Check Out Now</button>

              <button id="ProductPage-cart-btn" onClick={addtocart}>
                {cartcheck ? (
                  <>
                    <FaCheckCircle
                      style={{ color: "forestgreen", fontSize: "18px" }}
                    />
                    {"Added to cart"}
                  </>
                ) : (
                  " Add to cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productpage;
