import React, { useState, useContext } from "react";
import { ProductContext } from "../App";
import "./CartPage.css";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineInventory } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";

const CartPage = () => {
  const { Data, cartcount, setcartcount, cartItems, setcartItems } =
    useContext(ProductContext);
  // console.log(Data);
  // console.log(cartItems);

  const CartListItems = Data.filter((item) =>
    cartItems.includes(Number(item.id))
  );
  console.log("CartListItems", CartListItems);

  function removeCartItem(removeId) {
    const updatedCartItems = cartItems.filter((id) => id !== removeId);
    setcartItems(updatedCartItems);
    setcartcount(cartcount - 1);
    setquantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[removeId];
      return newQuantities;
    });
    toast(`🗑️ Item removed successfully`, {
      position: "top-center",
      type: "success",
      theme: "light",
      hideProgressBar: false,
    });
    console.log("Updated Cartitems", updatedCartItems);
  }

  // -----------------------------------------

  const [quantities, setquantities] = useState(
    CartListItems.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {})
  );

  function HandleIncrement(id) {
    setquantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  }

  function HandleDecrement(id) {
    setquantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 0,
    }));
    if (quantities[id] <= 1) {
      removeCartItem(id);
    }
  }

  const subtotal = CartListItems.reduce(
    (acc, item) => acc + item.price * quantities[item.id],
    0
  );

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

  // -----------------------------------------

  return (
    <>
      <div className="cart-container container">
        <Link to={"/"}>
          <IoArrowBackOutline id="back-arrow-cart" />
        </Link>
        <h1 className="cart-head">Shopping Cart</h1>

        <div className="cart-section">
          <div className="cart-list ">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty</p>
              </div>
            ) : (
              CartListItems.map((product, index) => (
                <div className="cart-list-item" key={index}>
                  <div className="cart-product-list-img">
                    <Link to={`/product/${product.id}`}>
                      <img src={product.thumbnail} alt="" />
                    </Link>
                  </div>

                  <div className="about-cart-item">
                    <div className="about-cart-item-left">
                      <Link to={`/product/${product.id}`}>
                        <h4 className="cart-product-title">{product.title}</h4>
                      </Link>

                      <div id="discount-cart-div">
                        <span className="cartpage-discountPercentage">
                          {" "}
                          {Math.round(product.discountPercentage)}% off
                        </span>
                        <span className="cartpage-price">${product.price}</span>
                      </div>

                      <div className="quantity-box">
                        <button
                          id="decrement-quantity"
                          onClick={() => HandleDecrement(product.id)}
                        >
                          {quantities[product.id] === 1 ? (
                            <RiDeleteBin6Line />
                          ) : (
                            " − "
                          )}
                        </button>
                        <span id="quantity">{quantities[product.id]}</span>
                        <button
                          id="increment-quantity"
                          onClick={() => HandleIncrement(product.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="about-cart-item-right">
                      <div
                        className="ProductPage-stock"
                        style={{
                          color:
                            product.availabilityStatus === "Low Stock"
                              ? "crimson"
                              : "",
                        }}
                      >
                        <MdOutlineInventory />
                        {product.availabilityStatus === "In Stock"
                          ? "In Stock"
                          : "Low Stock"}
                      </div>
                      <span
                        id="remove-btn"
                        onClick={() => removeCartItem(product.id)}
                      >
                        REMOVE
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Billing Section */}
          <div className="cart-list-billing">
            <div className="billing-card">
              <div className="billing-header">
                <h4>Order Summary</h4>
              </div>

              <div className="billing-body">
                <div className="billing-details">
                  <div className="billing-row">
                    <span>Subtotal ( {totalItems} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="billing-row discount-row">
                    <span>Discount</span>
                    <span>-${(subtotal * 0.1).toFixed(2)}</span>
                  </div>

                  <div className="billing-row">
                    <span>Shipping</span>
                    <span>${subtotal > 50 ? "0.00" : "5.00"}</span>
                  </div>

                  <div className="billing-row">
                    <span>Tax (8%)</span>
                    <span>${(subtotal * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="billing-total">
                  <div className="billing-row total-row">
                    <span>Total</span>$
                    {(
                      subtotal * 1.08 -
                      subtotal * 0.1 +
                      (subtotal > 50 ? 0 : 5)
                    ).toFixed(2)}
                  </div>
                </div>

                <button
                  className="checkout-btn"
                  style={{
                    background: cartItems.length === 0 ? "#ccc" : "",
                    cursor: cartItems.length === 0 ? "no-drop" : "",
                  }}
                >
                  Proceed to Checkout
                </button>

                <button className="continue-shopping-btn">
                  Continue Shopping
                </button>

                <p className="free-shipping-box">
                  Free shipping on orders over $50!
                </p>
              </div>
            </div>
          </div>
          {/* end of billing box  */}
        </div>
      </div>
    </>
  );
};
export default CartPage;



