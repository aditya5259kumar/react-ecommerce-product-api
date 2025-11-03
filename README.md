# 🛒 Orderly — Smart Shopping Simplified

Using **React** and **Redux Toolkit**, Orderly is a contemporary eCommerce web application. 
It fetches live product data from the **DummyJSON API** and provides a clean, functional shopping experience — complete with categories, reviews, login flow, and a working cart system.


## 🌐 Live Demo  
👉 [**View on Netlify**](https://orderlystore.netlify.app/)  


---

## 🚀 Features

- **Live API Data:** Fetches products dynamically using Axios from DummyJSON API  
- **Category Filtering:** Displays grouped products like Perfumes, Makeup, etc.  
- **Product Details:** Dedicated product page with reviews  
- **Cart System:** Add and remove items, calculate totals  
- **Login Modal:** Local login and registration stored in browser localStorage  
- **Protected Routes:** Cart page only accessible for logged-in users  
- **Error & Loading Handling:** Smooth experience even when data fails or loads slowly  
- **Responsive Design:** Optimized layout with Navbar and Footer  

---

## 🧠 Tech Stack

- **React**
- **Redux Toolkit**
- **Axios**
- **React Router DOM**
- **Vite**
- **CSS**

---

## 🔐 Authentication Logic

Orderly uses a simple local authentication model for demo purposes:

- If a new user logs in, a new account is created and saved to localStorage  
- If the email already exists, password validation occurs  
- On logout, the session clears but credentials persist locally  

*(Note: This is not production-grade authentication — built only for learning purposes.)*
