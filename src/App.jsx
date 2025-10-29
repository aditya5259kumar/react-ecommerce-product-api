import React, { useState, createContext, useEffect } from "react";
import Navbar from "./component/Navbar";
import ProductByCategory from "./component/ProductByCategory";
import Productpage from "./component/Productpage";
import CartPage from "./component/CartPage";
import { Route, Routes } from "react-router-dom";

export const ProductContext = createContext();

const App = () => {
  const [Data, setData] = useState([]);

  const [isLoggedin, setisLoggedin] = useState(false);

  const [formVisible, setformVisible] = useState(false);

  const [cartcount, setcartcount] = useState(0);

  const [cartItems, setcartItems] = useState([]);

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
      //persist cartcount and cartitem even if user is logged in on not
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

  // ------- product Api fetch--------------------

  useEffect(() => {
    async function ProductFunction() {
      try {
        const reponseAPI = await fetch("https://dummyjson.com/products");

        if (!reponseAPI.ok) {
          throw new Error("Api did not fetched");
        }

        console.log(reponseAPI);

        const responseData = await reponseAPI.json();

        setData(responseData.products);
      } catch (err) {
        console.error(err);
      } finally {
        setload(false);
      }
    }

    ProductFunction();
  }, []);

  console.log(Data);

  const [load, setload] = useState(true);

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
                <div className="main-head container">
                  <h1>Shop Our Featured Collections</h1>
                  <p>
                    Lorem ipsum dolor sit Lorem ipsum dolor sit, amet
                    consectetur adipisicing elit. Dolore, id ea alias quaerat
                    temporibus neque culpa sequi quia voluptatem voluptate! amet
                    consectetur, adipisicing elit. Ipsa dolore quia, non quasi
                    error provident expedita, porro eum maxime facere ipsum?
                    Aliquid, provident veritatis blanditiis cum nobis enim ipsum
                    hic!
                  </p>
                </div>

                {load ? (
                  <div className="Loading">
                    <h1>Loading...</h1>
                  </div>
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
              </>
            }
          />

          <Route path="/product/:id" element={<Productpage />} />
          <Route path="/" element={<Productpage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </ProductContext.Provider>
    </>
  );
};

export default App;
