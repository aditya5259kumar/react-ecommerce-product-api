import React, { useState } from "react";
import { MdMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import "./LoginForm.css";
import { toast } from "react-toastify";

const LoginForm = ({
  setformVisible,
  setisLoggedin,
}) => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const [errors, seterrors] = useState({});

  function inputHandler(e) {
    setformData({ ...formData, [e.target.name]: e.target.value });
    seterrors((prev) => ({ ...prev, [name]: "" }));
  }

  function SubmitHandler(e) {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.includes("@gmail.com")) {
      newErrors.email = "Invalid Gmail address";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password is too short";
    }
    if (Object.keys(newErrors).length > 0) {
      seterrors(newErrors);
      return;
    }
    const { email, password } = formData;
    const storedUser = JSON.parse(localStorage.getItem(email));

    if (!storedUser) {
      const newUser = { email, password, cartItems: [], cartCount: 0 };
      localStorage.setItem(email, JSON.stringify(newUser));
      localStorage.setItem("currentUser", email);
      toast(`New account created! 😃`, {
        position: "top-center",
        type: "success",
        theme: "light",
        hideProgressBar: true,
      });
      setformData({ email: "", password: "" });
      setisLoggedin(true);
      setformVisible(false);
      seterrors({});
      return;
    }
    if (storedUser.password === password) {
      localStorage.setItem("currentUser", email);
      toast(`Welcome back ${email}`, {
        position: "top-center",
        type: "success",
        theme: "light",
        hideProgressBar: true,
      });

      setisLoggedin(true);
      setformVisible(false);
      setformData({ email: "", password: "" });
    } else {
      seterrors({ password: "Incorrect password!" });
      return;
    }
  }

  return (
    <div className="login-form">
      <span id="cross-btn" onClick={() => setformVisible(false)}>
        <RxCross2 />
      </span>

      <span id="hey-txt">Hey Welcome back,</span>
      <h2 className="login-heading">Sign in to Orderly</h2>

      <form action="" onSubmit={SubmitHandler}>
        <label htmlFor="">
          <MdMail id="email-icon" />
          Email Address
        </label>
        <div className="inputdiv">
          <input
            type="text"
            onChange={inputHandler}
            name="email"
            value={formData.email}
            required
          />
          {errors.email && <p className="formErrormsg">{errors.email}</p>}
        </div>

        <label htmlFor="">
          <RiLockPasswordFill id="password-icon" />
          Password
        </label>
        <div className="inputdiv">
          <input
            type="password"
            onChange={inputHandler}
            name="password"
            value={formData.password}
            required
          />
          {errors.password && <p className="formErrormsg">{errors.password}</p>}
        </div>

        <div className="remind-forget">
          <span>
            <input
              className="inputdiv"
              id="remind-me"
              type="checkbox"
              name="remind-me"
            />
            <label id="remind-me-label" htmlFor="remind-me">
              Remind me
            </label>
          </span>
          <span>Forget password?</span>
        </div>

        <button type="submit">Sign In</button>
      </form>
      <p id="sign-up">
        Don't have an account? <span>Sign Up</span>
      </p>
    </div>
  );
};

export default LoginForm;
