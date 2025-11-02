import React, { useState, createContext, useEffect } from "react";
import Navbar from "./component/Navbar";
import ProductByCategory from "./component/ProductByCategory";
import Productpage from "./component/Productpage";
import CartPage from "./component/CartPage";
import { Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getData } from "./redux/slice/productApi";
import Footer from "./component/Footer";
import Services from "./component/Services";
import Hero from "./component/Hero";

import { FaShippingFast } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";

export const ProductContext = createContext();

const App = () => {
  const [Data, setData] = useState([]);

  const [isLoggedin, setisLoggedin] = useState(false);

  const [formVisible, setformVisible] = useState(false);

  const [cartcount, setcartcount] = useState(0);

  const [cartItems, setcartItems] = useState([]);

  // const ref = useRef(null)

  // --------------------------------------------------------------------

  const dataApi = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]); // ✅ fetch data once

  useEffect(() => {
    if (dataApi?.data?.products) {
      setData(dataApi.data.products);
    }
  }, [dataApi]); // ✅ update local state when Redux updates

  console.log(Data);

  // login save info ---------------------------

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setisLoggedin(true);

      const userData = JSON.parse(localStorage.getItem(currentUser));
      if (userData) {
        setcartItems(userData.cartItems || []);
        setcartcount(userData.cartCount || 0);
      }
    } else {
      // persist cartcount and cartitem even if user is logged in on not
      const savedCart = JSON.parse(localStorage.getItem("guestCart"));
      if (savedCart) {
        setcartItems(savedCart.cartItems || []);
        setcartcount(savedCart.cartCount || 0);
      }
    }
  }, []);

  // //Save sata   -----------------

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");

    //persist cartcount and cartitem even if user is logged in on not

    localStorage.setItem(
      "guestCart",
      JSON.stringify({ cartItems, cartCount: cartcount })
    );

    if (isLoggedin && currentUser) {
      const existingUser = JSON.parse(localStorage.getItem(currentUser)) || {};
      existingUser.cartItems = cartItems;
      existingUser.cartCount = cartcount;
      localStorage.setItem(currentUser, JSON.stringify(existingUser));
    }
  }, [cartItems, cartcount, isLoggedin]);

  return (
    <>
      <ProductContext.Provider
        value={{ Data, cartcount, setcartcount, cartItems, setcartItems }}
      >
        <Navbar
          isLoggedin={isLoggedin}
          setisLoggedin={setisLoggedin}
          formVisible={formVisible}
          setformVisible={setformVisible}
          cartcount={cartcount}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />

                <section className="features-section container">
                  <div className="features-grid">
                    <Services
                      icon={<FaShippingFast />}
                      head={"Free Shipping"}
                      text={"When you spend $50 or more"}
                    />
                    <Services
                      icon={<MdWorkspacePremium />}
                      head={"Best Quality"}
                      text={"Premium products from trusted brands"}
                    />
                    <Services
                      icon={<MdOutlineLocalOffer />}
                      head={"Best Offers"}
                      text={"Amazing deals and discounts daily"}
                    />
                    <Services
                      icon={<RiSecurePaymentFill />}
                      head={"Secure Payments"}
                      text={"100% secure payment methods"}
                    />
                  </div>
                </section>

                {/* Anchor target for Hero "Shop Now" button -> smooth-scrolls here */}
                <section id="page-products">
                  <div className="main-head container">
                    <h2>Shop Our Featured Collections</h2>
                    <p>
                      Lorem ipsum dolor sit Lorem ipsum dolor sit, amet
                      consectetur adipisicing elit. Dolore, id ea alias quaerat
                      temporibus neque culpa sequi quia voluptatem voluptate!
                      amet consectetur, adipisicing elit. Ipsa dolore quia, non
                      quasi error provident expedita, porro eum maxime facere
                      ipsum? Aliquid, provident veritatis blanditiis cum nobis
                      enim ipsum hic!
                    </p>
                  </div>

                  {getData.isLoading ? (
                    <h1>Loading...</h1>
                  ) : (
                    <>
                      <ProductByCategory
                        category="fragrances"
                        categoryHead="Scents You'll Love"
                      />
                      <ProductByCategory
                        category="beauty"
                        categoryHead="Glow-Up Deals"
                        categoryText=""
                      />

                      <div className="discount-coupen-container container">
                        <h2 className="dicount-bg-text">10% OFF</h2>
                        <div className="discount-coupen">
                          <div className="dicount-head">
                            <h3>10% OFF Discount Coupons</h3>
                            <p>
                              Subscribe us to get 10% OFF on all the purchases
                            </p>
                          </div>
                          <a className="discount-btn">EMAIL ME</a>
                        </div>
                      </div>

                      <ProductByCategory
                        category="furniture"
                        categoryHead="Home Refresh Deals"
                        categoryText=""
                      />
                      <ProductByCategory
                        category="groceries"
                        categoryHead="Everyday Essentials"
                        categoryText=""
                      />
                    </>
                  )}
                </section>
              </>
            }
          />

          <Route path="/product/:id" element={<Productpage />} />
          <Route path="/" element={<Productpage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </ProductContext.Provider>
    </>
  );
};

export default App;
